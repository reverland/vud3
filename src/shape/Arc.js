import { arc as shapeArc } from 'd3-shape'
import _ from 'lodash'

let propNames = [
  'innerRadius',
  'outerRadius',
  'cornerRadius',
  'startAngle',
  'endAngle',
  'padAngle',
  'padRadius'
]

export default {
  name: 'VArc',
  functional: true,
  props: ['args', 'data', ...propNames],
  render (h, context) {
    const props = context.props
    const data = context.data
    const path = getPath(props)
    return (
      <path
        {...data}
        d={path}
      />
    )
  }
}

function getPath (props) {
  let arcFunction = shapeArc()
  propNames.forEach(p => {
    if (!_.isUndefined(props[p]) && arcFunction[p]) {
      arcFunction = arcFunction[p](props[p])
    }
  })
  return arcFunction(props.data)
}
