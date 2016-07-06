import St from 'state'

export default function () {
  function scrollArboles (dom, scrollVal) {
    for (var i = dom.querySelectorAll('.arbol-data').length - 1; i >= 0; i--) {
      dom.querySelectorAll('.arbol-data')[i]
        .style
        .transform = 'translateX(' + scrollVal + 'px)'
    }
  }

  function createChevronIcons (dom) {
    var leftIcon = document.createElement('svg-icon')
    leftIcon.className = 'chevron-scroller'
    leftIcon.setAttribute('type', 'chevron.left')
    var rightIcon = document.createElement('svg-icon')
    rightIcon.className = 'chevron-scroller'
    rightIcon.setAttribute('type', 'chevron.right')
    dom.appendChild(leftIcon)
    dom.appendChild(rightIcon)
  }

  function init (dom) {
    var id = dom.id
    createChevronIcons(dom)
    St(id + '.scroll')
      .on('E')
      .subscribe(function (scrollVal) {
        scrollArboles(dom, scrollVal)
      })
    St(id + '.left')
      .on(['N', 'E'])
      .subscribe(function (bool) {
        dom.querySelector('[type="chevron.left"]').style.display = bool ? 'block' : 'none'
      })
    St(id + '.right')
      .on(['N', 'E'])
      .subscribe(function (bool) {
        dom.querySelector('[type="chevron.right"]').style.display = bool ? 'block' : 'none'
      })
  }

  return {init}
}
