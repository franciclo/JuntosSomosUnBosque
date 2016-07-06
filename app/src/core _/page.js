import $t from 'state'
var pageData = {}
var container = document.body

function register (ID, html, creator) {
  var s = document.createElement('section')
  s.setAttribute('data-id', ID)
  s.innerHTML = html

  pageData[ID] = {
    create: creator || {},
    dom: s,
    instance: null
  }
}

function start (ID) {
  var page = pageData[ID]
  if (!page) {
    console.warn('Page start error - ID: ' + ID)
    return
  }

  var pageDomClone = page.dom.cloneNode(true)
  var pageDom = container.appendChild(pageDomClone)

  page.instance = {}
  if (typeof page.create.renders === 'function') {
    page.instance.renders = page.create.renders(pageDom)
    page.instance.renders.init()
  }
  if (typeof page.create.actions === 'function') {
    page.instance.actions = page.create.actions(pageDom)
    page.instance.actions.init()
  }
}

function stop (ID) {
  var page = pageData[ID]
  var pageDom = document.querySelector('body>section[data-id="' + ID + '"]')
  if (!page || !pageDom) console.warn('Page stop error - ID: ' + ID)

  if (typeof page.instance.renders === 'object' &&
    page.instance.renders.destroy === 'function') {
    page.instance.renders.destroy()
  }

  if (typeof page.instance.actions === 'object' &&
    page.instance.actions.destroy === 'function') {
    page.instance.actions.destroy()
  }

  page.instance = null
  container.removeChild(pageDom)
}

$t('page')
  .on(['N', 'E'])
  .scan(function (previousId, currentId) {
    if (previousId) stop(previousId)
    start(currentId)
    return currentId
  }, null)
  .subscribe()

export default register
