export default {
  name: 'Layer',
  functional: true,
  render (h, context) {
    const children = context.children
    const data = context.data
    return h('g', data, children)
  }
}
