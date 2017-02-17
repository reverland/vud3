// Container
import Surface from './container/Surface'
import Layer from './container/Layer'

// shape
import Line from './shape/Line'
import Area from './shape/Area'
import Arc from './shape/Arc'

// test
import Earth from '../demo/Earth'

let components = [
  Surface,
  Layer,
  Line,
  Area,
  Arc,
  Earth
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

let version = '0.0.6'

export {
  version,
  Surface,
  Layer,
  Line,
  Area,
  Arc
}
