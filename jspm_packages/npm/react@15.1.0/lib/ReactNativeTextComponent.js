/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var ReactInstrumentation = require('./ReactInstrumentation');
  var ReactNativeComponentTree = require('./ReactNativeComponentTree');
  var ReactNativeTagHandles = require('./ReactNativeTagHandles');
  var UIManager = require('UIManager');
  var invariant = require('fbjs/lib/invariant');
  var ReactNativeTextComponent = function(text) {
    this._currentElement = text;
    this._stringText = '' + text;
    this._nativeParent = null;
    this._rootNodeID = null;
  };
  _assign(ReactNativeTextComponent.prototype, {
    mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onSetText(this._debugID, this._stringText);
      }
      !context.isInAParentText ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RawText "%s" must be wrapped in an explicit <Text> component.', this._stringText) : invariant(false) : void 0;
      this._nativeParent = nativeParent;
      var tag = ReactNativeTagHandles.allocateTag();
      this._rootNodeID = tag;
      var nativeTopRootTag = nativeContainerInfo._tag;
      UIManager.createView(tag, 'RCTRawText', nativeTopRootTag, {text: this._stringText});
      ReactNativeComponentTree.precacheNode(this, tag);
      return tag;
    },
    getNativeNode: function() {
      return this._rootNodeID;
    },
    receiveComponent: function(nextText, transaction, context) {
      if (nextText !== this._currentElement) {
        this._currentElement = nextText;
        var nextStringText = '' + nextText;
        if (nextStringText !== this._stringText) {
          this._stringText = nextStringText;
          UIManager.updateView(this._rootNodeID, 'RCTRawText', {text: this._stringText});
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onSetText(this._debugID, nextStringText);
          }
        }
      }
    },
    unmountComponent: function() {
      ReactNativeComponentTree.uncacheNode(this);
      this._currentElement = null;
      this._stringText = null;
      this._rootNodeID = null;
    }
  });
  module.exports = ReactNativeTextComponent;
})(require('process'));
