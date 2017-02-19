import VArc from 'src/shape/Arc'
import { pie } from 'd3-shape'
import _ from 'lodash'

const props = [
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
  methods: {
    getData (data) {
      let pieFunction = pie()
      props.forEach(p => {
        if (!_.isUndefined(this[p]) && pieFunction[p]) {
          pieFunction = pieFunction[p](this[p])
        }
      })
      return pieFunction(data)
    }
  },
  render (h) {
    const data = this.getData(this.data)
    const innerRadius = this.innerRadius
    const outerRadius = this.outerRadius
    const cornerRadius = this.cornerRadius
    const colors = this.colors
    const args = this.args
    return (
      <layer>
        {
          data.map((d, i) => {
            return (
              <v-arc
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cornerRadius={cornerRadius}
                data={d}
                fill={_.isFunction(colors) ? colors(d, i) : colors[i]}
                args={args}
              />
            )
          })
        }
      </layer>
    )
  }
}
