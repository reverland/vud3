// adapt from http://devdocs.io/dom_events/resize
var optimizedResize = (function () {
  const callbacks = []
  let running = false
  let timer = 0
  let id = 0

  // fired on resize event
  function resize () {
    // hold the update callback until resize end
    if (timer) {
      window.clearTimeout(timer)
      timer = 0
    }

    timer = window.setTimeout(() => {
      runUpdateCallbacks()
    }, 300)

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
    callbacks.forEach(function (item) {
      item && item.callback && item.callback()
    })

    running = false
  }

  // run the actual update callbacks
  function runUpdateCallbacks () {
    callbacks.forEach(function (item) {
      item && item.updateCallback && item.updateCallback()
    })
  }

  // adds callback to loop
  function addCallback (callback, updateCallback) {
    const optId = ++id
    callbacks.push({
      callback,
      updateCallback,
      id: optId
    })
    return optId
  }

  return {
    // public method to add additional callback and update callback
    add: function (callback, updateCallback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize)
      }
      return addCallback(callback, updateCallback)
    },
    remove (id) {
      const idx = callbacks.findIndex(x => x.id === id)
      if (idx > -1) {
        callbacks.splice(idx, 1)
      }
    }
  }
}())

export default optimizedResize
