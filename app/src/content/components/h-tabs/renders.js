import {createElement} from 'utils'

export default function () {
  function init (dom) {
    var labels = dom.querySelectorAll('.tab label')
    var checkboxG = createElement('<input type="radio" name="' + dom.id + '" class="hide" />')

    for (let i = labels.length - 1; i >= 0; i--) {
      let checkbox = checkboxG()
      let target = labels[i].getAttribute('data-target')
      checkbox.id = target + dom.id
      labels[i].setAttribute('for', target + dom.id)
      labels[i].parentNode.insertBefore(checkbox, labels[i])
    }
    labels[0].click()
  }

  function destroy () {

  }

  return {init, destroy}
}
