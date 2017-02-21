import _ from 'lodash'
import { area as shapeArea } from 'd3-shape'
import { curveNames, getCurveFunction } from '../utils/curveFactory'

export default {
  name: 'VArea',
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
  render (h, context) {
    let props = context.props || {}
    const data = context.data
    const path = getPath(props)
    return (
      <path
        {...data}
        d={ path }
      />
    )
  }
}

function getPath (props) {
  let lineFunction = shapeArea()
  let curveFunction = getCurveFunction(props.curve, props.curveArgs)

  let fNames = ['x', 'x0', 'x1', 'y', 'y0', 'y1']
  fNames.filter(fName => _.isFunction(props[fName])).forEach(fName => {
    lineFunction = lineFunction[fName](props[fName])
  })

  lineFunction.curve(curveFunction)

  return lineFunction(props.data)
}
