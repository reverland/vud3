export default {
  name: 'Layer'
  , render (h) {
    const children = this.$slots.default
    const attrs = this.$vnode.data.attrs
    return (
      <g
        {...attrs}
      >
        { children }
      </g>
    )
  }
}
