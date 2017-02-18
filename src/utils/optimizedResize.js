// adapt from http://devdocs.io/dom_events/resize
var optimizedResize = (function () {
  const callbacks = []
  let running = false

  // fired on resize event
  function resize () {
    // hold the update callback until resize end
    if (!running) {
      running = true

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks)
      } else {
        setTimeout(runCallbacks, 66)
      }
    }
  }

  // run the actual callbacks
  function runCallbacks () {
    callbacks.forEach(function (callback) {
      callback()
    })

    running = false
  }

  // adds callback to loop
  function addCallback (callback) {
    if (callback) {
      callbacks.push(callback)
    }
  }

  return {
    // public method to add additional callback and update callback
    add: function (callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize)
      }
      return addCallback(callback)
    }
  }
}())

export default optimizedResize
