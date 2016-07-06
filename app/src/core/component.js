import 'document-register-element'

function register (ID, creator) {
  var customElement = Object.create(window.HTMLElement.prototype)
  var componentData = []
  customElement.attachedCallback = function () {
    var cId = componentData.push({
      renders: (typeof creator.renders === 'function') ? creator.renders() : null,
      actions: (typeof creator.actions === 'function') ? creator.actions() : null
    }) - 1
    this.setAttribute('data-component-id', cId)
    Object.keys(componentData[cId])
      .filter(compProcess => componentData[cId][compProcess])
      .forEach(compProcess => componentData[cId][compProcess].init(this))
  }
  customElement.detachedCallback = function () {
    var cId = this.getAttribute('data-component-id')
    Object.keys(componentData[cId])
      .filter(compProcess => componentData[cId][compProcess])
      .filter(compProcess => typeof componentData[cId][compProcess].destroy === 'function')
      .forEach(compProcess => componentData[cId][compProcess].destroy(this))
  }
  document.registerElement(ID, { prototype: customElement })
}

export default register
