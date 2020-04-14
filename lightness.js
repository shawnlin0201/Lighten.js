function Lightness(obj) {
	// Initialize
	let _self = this;
	this.data = obj.data;
	this._targetDOM = this._targetDOM || document.body.getElementsByTagName("*");

	// Private Methods
	this._setTargetDOM = function () {
		for (let i = 0; i < this._targetDOM.length; i++) {
			let node = this._targetDOM[i];

			for (let j = 0; j < node.attributes.length; j++) {
				let nodeName = node.attributes[j].nodeName;
				let pattern = /^lightness\-app/;

				if (nodeName.match(pattern)) {
					_self._targetDOM = node;
				}
			}
		}
	}
	
	this._replaceCurlyQuoteText = function (rawText) {
		let pattern = /{{(.+?)}}/g;
		let curlyQuoteText = rawText.split(' ').join('').match(pattern);
		let compiledText = '';
		if (curlyQuoteText) {
			compiledText = rawText.replace(pattern, (_, i) => {
				return eval('_self.data.' + i.split(' ').join('')) // todo 找更好的方法取代 eval
			})
		} else {
			compiledText = rawText
		}
		return compiledText
	}
	
	
	
	this.traverseChildNodes = function (parent) {
		if (parent.nodeType === 1) {
			for (let j = 0; j < parent.attributes.length; j++) {
				let lightnessPattern = /^l-/;
				if(parent.attributes[j].nodeName.match(lightnessPattern)){
						let attrType = parent.attributes[j].nodeName.split('l-')[1]

						if (attrType === 'alert') {
							parent.addEventListener('click', function () {
										alert(parent.attributes[j].nodeValue)
								})
						}
				}
			}
		}

		// replaceCurly
		for (let child of parent.childNodes) {
			const ELEMENT = 1;
			const TEXT = 3;
			
			if (child.nodeType === ELEMENT) {
				_self.traverseChildNodes(child)
			}

			if (child.nodeType === TEXT) {
				child.nodeValue = _self._replaceCurlyQuoteText(child.nodeValue)
			}
		}
	}
	
	this.init = function () {
		_self._setTargetDOM()

		for (let root of this._targetDOM.childNodes) {
			_self.traverseChildNodes(root)
		}
	}

	// Start up Lightness.js when DOM content loaded.
	document.addEventListener('DOMContentLoaded', function () {
		_self.init()
	})
	return this
}
