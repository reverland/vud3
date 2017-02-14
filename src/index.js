// Container
import Surface from './container/Surface'
import Layer from './container/Layer'

// Container
import Curve from './shape/Curve'

let components = [
  Surface,
  Layer,
  Curve
]

let install = function (Vue) {
  components.forEach(c => {
    Vue.component(c.name, c)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Surface,
  Layer,
  Curve
}
