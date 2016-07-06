import 'document-register-element'

function register (ID, creator) {
  var instance
  var customElement = Object.create(window.HTMLElement.prototype)
  customElement.attachedCallback = function () {
    instance = {}
    if (typeof creator.renders === 'function') {
      instance.renders = creator.renders(this)
      instance.renders.init()
    }
    if (typeof creator.actions === 'function') {
      instance.actions = creator.actions(this)
      instance.actions.init()
    }
  }
  customElement.detachedCallback = function () {
    if (typeof instance.renders === 'object' &&
      instance.renders.destroy === 'function') {
      instance.renders.destroy()
    }

    if (typeof instance.actions === 'object' &&
      instance.actions.destroy === 'function') {
      instance.actions.destroy()
    }
  }
  document.registerElement(ID, { prototype: customElement })
}

export default register
