import _ from 'lodash'
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
    x: {},
    y: {},
    data: {
      type: Array,
      required: true
    },
    curveArgs: {},
    defined: {}
  },
  render (h, context) {
    let props = context.props
    let lineFunction = getLineFunction(props)
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

function getLineFunction (props) {
  let lineFunction = shapeLine()
  let curveFunction = getCurveFunction(props.curve, props.curveArgs)
  let linePropNames = ['x', 'y', 'defined']
  linePropNames.forEach(p => {
    if (!_.isUndefined(props[p]) && lineFunction[p]) {
      lineFunction = lineFunction[p](props[p])
    }
  })
  lineFunction = lineFunction.curve(curveFunction)
  return lineFunction
}
