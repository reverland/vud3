import { line as shapeLine } from 'd3-shape'
import { curveNames, getCurveFunction } from '../utils/curveFactory'

export default {
  name: 'VLine',
  functional: true,
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
  render (h, context) {
    let props = context.props
    let curveFunction = getCurveFunction(props.curve, props.curveArgs)
    let lineFunction = shapeLine().x(props.x).y(props.y).curve(curveFunction)
    const path = lineFunction(props.data)
    const data = context.data
    return (
      <path
        {...data}
        d={ path }
      />
    )
  }
}
