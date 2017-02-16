import { arc as shapeArc } from 'd3-shape'

let props = [
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
  props: ['args', 'data', ...props],
  data () {
    return {
      arc: {}
    }
  },
  methods: {
    getPath () {
      let arcFunction = this.arc
      props.forEach(p => {
        if (this[p]) {
          arcFunction = arcFunction[p](this[p])
        }
      })
      this.arc = arcFunction
      return this.arc(this.data)
    }
  },
  created () {
    this.arc = shapeArc(this.args)
  },
  render (h) {
    const attrs = this.$vnode.data.attrs || {}
    const props = this.$vnode.data.props || {}
    const path = this.getPath()
    return (
      <path
        {...attrs}
        {...props}
        d={ path }
      />
    )
  }
}
