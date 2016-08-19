function toggleActiveSection (dom, active) {
  let boxes = dom.children
  console.log(active)
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].getAttribute('data-id') === active) {
      boxes[i].className = (boxes[i].getAttribute('data-enter'))
        ? boxes[i].getAttribute('data-enter') + ' active'
        : ' active'
    } else {
      boxes[i].className = ''
    }
  }
}

export {toggleActiveSection}
