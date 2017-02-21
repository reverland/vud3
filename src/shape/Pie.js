import VArc from 'src/shape/Arc'
import { pie } from 'd3-shape'
import _ from 'lodash'

// why I not implement this component as functional component ?
// for user have to register both pie and arc in the parent component for this compo to work.

const propNames = [
  'value',
  'sort',
  'sortValues',
  'startAngle',
  'endAngle',
  'padAngle'
]

export default {
  name: 'vPie',
  components: {
    VArc
  },
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
    colors: {},
    args: {}
  },
  render (h) {
    let props = this  // black magic here
    const arcs = getData(props)
    const colors = props.colors
    const {
      innerRadius,
      outerRadius,
      cornerRadius,
      args
    } = props
    const newProps = {
      innerRadius,
      outerRadius,
      cornerRadius,
      args
    }

    return (
      <layer>
        {
          arcs.map((d, i) => {
            return (
              <v-arc
                {...{props: newProps}}
                data={d}
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
  propNames.forEach(p => {
    if (!_.isUndefined(props[p]) && pieFunction[p]) {
      pieFunction = pieFunction[p](props[p])
    }
  })
  return pieFunction(props.data)
}
