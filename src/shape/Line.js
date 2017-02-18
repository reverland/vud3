import { line as shapeLine } from 'd3-shape'
import { curveNames, getCurveFunction } from '../utils/curveFactory'

export default {
  name: 'VLine',
  props: {
    curve: {
      type: String,
      default: 'linear',
      validator (value) {
        return curveNames.indexOf(value) >= 0
      }
    },
    x: {
      type: Function,
      default: p => p.x
    },
    y: {
      type: Function,
      default: p => p.y
    },
    data: {
      type: Array,
      required: true
    },
    curveArgs: {
      required: false
    }
  },
  methods: {
    getPath () {
      let curveFunction = getCurveFunction(this.curve, this.curveArgs)
      let lineFunction = shapeLine().x(this.x).y(this.y).curve(curveFunction)
      return lineFunction(this.data)
    }
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
