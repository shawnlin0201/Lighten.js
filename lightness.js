/**
 * Ligherness.js
 * Version: 0.1.0
 * Contach: shawnlin0201@gmail.com
 * License: MIT
 */

function Lightness(obj) {
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
        let pattern = /^lightness\-app/;

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
        return eval('_this._data.' + i.split(' ').join('')) // todo 找更好的方法取代 eval
      })
    }

    return compiledText
  }

  this.traverseChildNodes = function (parent) {
    if (parent.nodeType === 1) {
      for (let j = 0; j < parent.attributes.length; j++) {
        let anyDirectiveParttern = /^:?l-/;
        if(parent.attributes[j].nodeName.match(anyDirectiveParttern)){
          let bindingDirectiveParttern = /^:l-/;
          let isGetterMode = Boolean(parent.attributes[j].nodeName.match(bindingDirectiveParttern));
          let attrType = parent.attributes[j].nodeName.split('l-')[1]

          if (attrType === 'alert') {
            let attrValue = isGetterMode ? _this.getter(parent.attributes[':l-alert'].nodeValue) : parent.attributes['l-alert'].nodeValue;

            parent.addEventListener('click', function () {
                alert(attrValue);
              })
          }

          if (attrType === 'show') {
            let attrValue = isGetterMode ? _this.getter(parent.attributes[':l-show'].nodeValue) : parent.attributes['l-show'].nodeValue;

            if (!attrValue) {
              parent.style.display = 'none';
            }
          }
        }
      }
    }

    // replaceCurly
    for (let child of parent.childNodes) {
      const ELEMENT = 1;
      const TEXT = 3;
      
      if (child.nodeType === ELEMENT) {
        _this.traverseChildNodes(child)
      }

      if (child.nodeType === TEXT) {
        child.nodeValue = _this._replaceCurlyQuoteText(child.nodeValue)
      }
    }
  }

  this.getter = function (target) {
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

  // Start up Lightness.js when DOM content loaded.
  document.addEventListener('DOMContentLoaded', function () {
    _this.init()
  })
  return this
}
