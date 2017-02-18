import _ from 'lodash'
import {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  curveBundle,
  curveCatmullRom,
  curveCatmullRomOpen,
  curveCatmullRomClosed,
  curveCardinal,
  curveCardinalOpen,
  curveCardinalClosed
} from 'd3-shape'

let curveFactory = function (type) {
  // adapt from rechart
  const CURVE_FACTORIES = {
    curveBasisClosed,
    curveBasisOpen,
    curveBasis,
    curveLinearClosed,
    curveLinear,
    curveMonotoneX,
    curveMonotoneY,
    curveNatural,
    curveStep,
    curveStepAfter,
    curveStepBefore,
    curveBundle,
    curveCatmullRom,
    curveCatmullRomOpen,
    curveCatmullRomClosed,
    curveCardinal,
    curveCardinalOpen,
    curveCardinalClosed
  }

  // uppercase first letter
  const name = `curve${type.slice(0, 1).toUpperCase()}${type.slice(1)}`

  return CURVE_FACTORIES[name]
}

let getCurveFunction = function (curve, args) {
  let curveFunction
  if (_.isObject(args)) {
    let key = Object.keys(args)
    key && key.length >= 1 && (key = key[0])
    curveFunction = curveFactory(curve)[key](args[key])
  } else {
    curveFunction = curveFactory(curve)
  }
  return curveFunction
}

const curveNames = [
  'basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural',
  'monotoneX', 'monotoneY', 'step', 'stepBefore', 'stepAfter',
  'bundle', 'catmullRom', 'catmullRomOpen', 'catmullRomClosed',
  'cardinal', 'cardinalOpen', 'cardinalClosed'
]

export {
  getCurveFunction,
  curveNames
}
