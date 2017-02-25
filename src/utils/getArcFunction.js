import _ from 'lodash'
import { arc as shapeArc } from 'd3-shape'

export const arcPropNames = [
  'innerRadius',
  'outerRadius',
  'cornerRadius',
  'padAngle',
  'padRadius'
]

export function getArcFunction (props) {
  let arcFunction = shapeArc()
  arcPropNames.forEach(p => {
    if (!_.isUndefined(props[p]) && arcFunction[p]) {
      arcFunction = arcFunction[p](props[p])
    }
  })
  return arcFunction
}
