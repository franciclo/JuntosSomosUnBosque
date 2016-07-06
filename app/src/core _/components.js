require('document-register-element')

module.exports.register = function (ID, creator) {
  var instance = creator()
  var customElement = Object.create(window.HTMLElement.prototype)
  customElement.attachedCallback = instance.init
  customElement.detachedCallback = instance.destroy
  customElement.attributeChangedCallback = instance.attrChange
  document.registerElement(ID, { prototype: customElement })
}
