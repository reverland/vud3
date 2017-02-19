// Container
import Surface from './container/Surface'
import Layer from './container/Layer'

// shape
import Line from './shape/Line'
import Area from './shape/Area'
import Arc from './shape/Arc'
import Pie from './shape/Pie'

let components = [
  Surface,
  Layer,
  Line,
  Area,
  Arc,
  Pie
]

let install = function (Vue) {
  components.forEach(c => {
    Vue.component(c.name, c)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  console.log('vud3 installed succesfully!')
} else {
  console.warn('you must use vue')
}

let version = '0.0.7'

export {
  version,
  Surface,
  Layer,
  Line,
  Area,
  Arc,
  Pie
}
