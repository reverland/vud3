import _ from 'lodash'
import { area as shapeArea } from 'd3-shape'
import getCurveFunction from '../utils/curveFactory'

export default {
  name: 'VArea',
  props: {
    curve: {
      type: String,
      default: 'linear',
      validator (value) {
        return [
          'basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural',
          'monotoneX', 'monotoneY', 'step', 'stepBefore', 'stepAfter',
          'bundle', 'catmullRom', 'catmullRomOpen', 'catmullRomClosed',
          'cardinal', 'cardinalOpen', 'cardinalClosed'
        ].indexOf(value) >= 0
      }
    },
    x: {
      type: Function
    },
    x0: {
      type: Function
    },
    x1: {
      type: Function
    },
    y: {
      type: Function
    },
    y0: {
      type: Function
    },
    y1: {
      type: Function
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
      let lineFunction = shapeArea()
      let curveFunction = getCurveFunction(this.curve, this.curveArgs)

      let fNames = ['x', 'x0', 'x1', 'y', 'y0', 'y1']
      fNames.filter(fName => _.isFunction(this[fName])).forEach(fName => {
        lineFunction = lineFunction[fName](this[fName])
      })

      lineFunction.curve(curveFunction)

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
