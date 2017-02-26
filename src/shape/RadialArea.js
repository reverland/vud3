import _ from 'lodash'
import { radialArea } from 'd3-shape'
import { curveNames, getCurveFunction } from '../utils/curveFactory'

export default {
  name: 'VRadialArea',
  functional: true,
  props: {
    curve: {
      type: String,
      default: 'linear',
      validator (value) {
        return curveNames.indexOf(value) >= 0
      }
    },
    angle: {},
    startAngle: {},
    endAngle: {},
    radius: {},
    innerRadius: {},
    outerRadius: {},
    data: {
      type: Array,
      required: true
    },
    curveArgs: {},
    defined: {}
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
  let lineFunction = radialArea()
  let curveFunction = getCurveFunction(props.curve, props.curveArgs)

  let fNames = ['angle', 'startAngle', 'endAngle', 'radius', 'innerRadius', 'outerRadius', 'defined']
  fNames.filter(fName => _.isFunction(props[fName])).forEach(fName => {
    lineFunction = lineFunction[fName](props[fName])
  })

  lineFunction.curve(curveFunction)

  return lineFunction(props.data)
}
