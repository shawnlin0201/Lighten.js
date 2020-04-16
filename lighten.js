/**
 * Ligherness.js
 * Version: 0.1.0
 * Contach: shawnlin0201@gmail.com
 * License: MIT
 */

function Lighten(obj) {
  // Initialize
  let _this = this;
  this._data = obj.data;
  this._targetDOM = this._targetDOM || document.body.getElementsByTagName("*");

  // Methods
  this._setTargetDOM = function () { // todo 實作能直接比對如 jQuery selector
    for (let i = 0; i < this._targetDOM.length; i++) {
      let node = this._targetDOM[i];

      for (let j = 0; j < node.attributes.length; j++) {
        let nodeName = node.attributes[j].nodeName;
        let pattern = /^lighten\-app/;

        if (nodeName.match(pattern)) {
          _this._targetDOM = node;
        }
      }
    }
  }
  
  this._replaceCurlyQuoteText = function (rawText) {
    let curlyQuotePattern = /{{(.+?)}}/g;
    let matchCurlyQuoteText = rawText.split(' ').join('').match(curlyQuotePattern);
    let compiledText = rawText;

    if (matchCurlyQuoteText) {
      compiledText = rawText.replace(curlyQuotePattern, (_, i) => {
        return _this.getInstanceData(i)
      })
    }

    return compiledText
  }

  this.traverseChildNodes = function (parent) {
    const NODETYPE_ELEMENT = 1;
    const NODETYPE_TEXT = 3;
    if (parent.nodeType === NODETYPE_TEXT) { return void 0; }
    if ((parent.nodeType === NODETYPE_ELEMENT)) {
      // directive Factory
      for (let j = 0; j < parent.attributes.length; j++) {
        let anyDirectiveParttern = /^:?l-/;
        if(parent.attributes[j].nodeName.match(anyDirectiveParttern)){
          let bindingDirectiveParttern = /^:l-/;
          let isGetterMode = Boolean(parent.attributes[j].nodeName.match(bindingDirectiveParttern));
          let attrType = parent.attributes[j].nodeName.split('l-')[1]

          if (attrType === 'alert') {
            let attrValue = isGetterMode ? _this.getInstanceData(parent.attributes[':l-alert'].nodeValue) : parent.attributes['l-alert'].nodeValue;

            parent.addEventListener('click', function () {
                alert(attrValue);
              })
          }

          if (attrType === 'show') {
            let attrValue = isGetterMode ? _this.getInstanceData(parent.attributes[':l-show'].nodeValue) : parent.attributes['l-show'].nodeValue;

            if (!attrValue) {
              parent.style.display = 'none';
            }
          }
        }
      }

      // check children nodes
      for (let child of parent.childNodes) {
        // traverse more deep
        if (child.nodeType === NODETYPE_ELEMENT) {
          _this.traverseChildNodes(child)
        }

        // replace curly quote text
        if (child.nodeType === NODETYPE_TEXT) {
          child.nodeValue = _this._replaceCurlyQuoteText(child.nodeValue)
        }
      }
    }
  }

  this.getInstanceData = function (target) {
    try {
      let result = eval('_this._data.' + target.split(' ').join(''));

      return result;
    } catch (error) {
      console.error('Can not find data "'+target+'" in Ligthness instance.')
    }
  }

  this.init = function () {
    _this._setTargetDOM()

    for (let root of this._targetDOM.childNodes) {
      _this.traverseChildNodes(root)
    }
  }

  // Start up lighten.js when DOM content loaded.
  document.addEventListener('DOMContentLoaded', function () {
    _this.init()
  })
  return this
}
