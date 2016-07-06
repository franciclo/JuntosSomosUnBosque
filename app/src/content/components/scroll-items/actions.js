import St from 'state'
import Rx from 'rxjs'

export default function () {
  function init (dom) {
    var id = dom.id
    St(id).value = {}

    St(id + '.scroll').value = 0
    St(id + '.right').value = true
    St(id + '.left').value = false

    var rightClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('[type="chevron.right"]'),
      'click'
    )

    rightClicks
      .map(function () {
        var scrollBounds = dom.getBoundingClientRect()
        var allItems = dom.querySelectorAll('.arbol-data')
        var scrollRight = scrollBounds.right
        var lastItemRight = allItems[allItems.length - 1].getBoundingClientRect().right
        if (scrollRight < lastItemRight) return 20
        return 0
      })
      .do(function (val) {
        St(id + '.left').value = true
        if (val === 0) St(id + '.right').value = false
      })
      .subscribe(function (val) {
        var initial = St(id + '.scroll').value || 0
        St(id + '.scroll').value = initial - 100
      })

    var leftClicks = Rx.Observable.fromEvent(
      dom.querySelectorAll('[type="chevron.left"]'),
      'click'
    )

    leftClicks
      .map(function () {
        var scrollBounds = dom.getBoundingClientRect()
        var allItems = dom.querySelectorAll('.arbol-data')
        var scrollLeft = scrollBounds.left
        var firstItemLeft = allItems[0].getBoundingClientRect().left
        // if (firstItemLeft + scrollLeft) return
        if (firstItemLeft < scrollLeft) return 20
        return 0
      })
      .do(function (val) {
        St(id + '.right').value = true
        if (val === 0) St(id + '.left').value = false
      })
      .subscribe(function (val) {
        var initial = St(id + '.scroll').value || 0
        St(id + '.scroll').value = initial + 100
      })
  }

  return {init}
}
