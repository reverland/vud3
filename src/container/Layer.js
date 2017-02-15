export default {
  name: 'Layer',
  render (h) {
    const children = this.$slots.default
    const attrs = this.$vnode.data.attrs || {}
    const props = this.$vnode.data.props || {}
    return (
      <g
        {...attrs}
        {...props}
      >
        { children }
      </g>
    )
  }
}
