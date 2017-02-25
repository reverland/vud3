import { pie } from 'd3-shape'
import _ from 'lodash'
import { getArcFunction } from '../utils/getArcFunction'

const piePropNames = [
  'value',
  'sort',
  'sortValues',
  'startAngle',
  'endAngle',
  'padAngle'
]

export default {
  name: 'vPie',
  props: {
    data: {
      required: true
    },
    value: {},
    sort: {},
    sortValues: {},
    startAngle: {},
    endAngle: {},
    padAngle: {},
    innerRadius: {},
    outerRadius: {},
    cornerRadius: {},
    padRadius: {},
    colors: {},
    args: {}
  },
  render (h) {
    let props = this  // black magic here
    const arcs = getData(props)
    const colors = props.colors
    const arcFunction = getArcFunction(props)
    return (
      <layer>
        {
          arcs.map((d, i) => {
            const path = arcFunction(d)
            return (
              <path
                d={path}
                fill={_.isFunction(colors) ? colors(d, i) : colors[i]}
              />
            )
          })
        }
      </layer>
    )
  }
}

function getData (props) {
  let pieFunction = pie()
  piePropNames.forEach(p => {
    if (!_.isUndefined(props[p]) && pieFunction[p]) {
      pieFunction = pieFunction[p](props[p])
    }
  })
  return pieFunction(props.data)
}
