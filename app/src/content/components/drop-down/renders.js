import {createElement} from 'utils'

export default function () {
  function init (dom) {
    var checkboxG = createElement('<input type="checkbox" id="' + dom.id + '-chkbx" class="hide" />')
    var label = dom.querySelector('label')
    label.setAttribute('for', dom.id + '-chkbx')
    dom.insertBefore(checkboxG(), dom.querySelector('aside'))
  }

  function destroy () {

  }

  return {init, destroy}
}
