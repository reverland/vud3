import { line as shapeLine, area as shapeArea, curveBasisClosed, curveBasisOpen,
  curveBasis, curveLinearClosed, curveLinear, curveMonotoneX, curveMonotoneY,
  curveNatural, curveStep, curveStepAfter, curveStepBefore,
  curveBundle, curveCatmullRom, curveCatmullRomOpen, curveCatmullRomClosed,
  curveCardinal, curveCardinalOpen, curveCardinalClosed } from 'd3-shape'

let curveFactory = function (type) {
  // adapt from rechart
  const CURVE_FACTORIES = {
    curveBasisClosed, curveBasisOpen, curveBasis, curveLinearClosed, curveLinear,
    curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter,
    curveStepBefore,
    curveBundle, curveCatmullRom, curveCatmullRomOpen, curveCatmullRomClosed,
    curveCardinal, curveCardinalOpen, curveCardinalClosed
  }

  // uppercase first letter
  const name = `curve${type.slice(0, 1).toUpperCase()}${type.slice(1)}`

  return CURVE_FACTORIES[name]
}

export default {
  name: 'Curve',
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
    data: {
      type: Object
    },
    getX: {
      type: Function,
      default: p => p.x
    },
    getY: {
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
      let curveFunction
      if (this.curveArgs) {
        let key = Object.keys(this.curveArgs)
        key && key.length >= 1 && (key = key[0])
        curveFunction = curveFactory(this.curve)[key](this.curveArgs[key])
      } else {
        curveFunction = curveFactory(this.curve)
      }
      let lineFunction = shapeLine().x(this.getX).y(this.getY).curve(curveFunction)
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
