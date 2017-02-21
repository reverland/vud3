export default {
  name: 'Layer',
  functional: true,
  render (h, context) {
    const children = context.children
    const data = context.data
    return (
      <g
        {...data}
      >
        {children}
      </g>
    )
  }
}
