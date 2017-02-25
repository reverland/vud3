import { arcPropNames, getArcFunction } from '../utils/getArcFunction'

export default {
  name: 'VArc',
  functional: true,
  props: ['args', 'data', ...arcPropNames],
  render (h, context) {
    const props = context.props
    const data = context.data
    const path = getArcFunction(props)(props.data)
    return (
      <path
        {...data}
        d={path}
      />
    )
  }
}
