// Container
import Surface from './container/Surface'
import Layer from './container/Layer'

// shape
import Line from './shape/Line'
import Area from './shape/Area'
import Arc from './shape/Arc'
import Pie from './shape/Pie'
import RadialLine from './shape/RadialLine'
import RadialArea from './shape/RadialArea'

let components = [
  Surface,
  Layer,
  Line,
  Area,
  Arc,
  Pie,
  RadialLine,
  RadialArea
]

let install = function (Vue) {
  components.forEach(c => {
    Vue.component(c.name, c)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  console.log('vud3 installed succesfully!')
}

let version = '0.0.11'

export {
  version,
  Surface,
  Layer,
  Line,
  Area,
  Arc,
  Pie,
  RadialLine,
  RadialArea
}
