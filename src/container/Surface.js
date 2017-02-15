import _ from 'lodash'

export default {
  name: 'Surface',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    viewBox: {
      type: Object,
      default () {
        return { width: this.width, height: this.height, x: 0, y: 0 }
      },
      validator (v) {
        return (
          _.isFinite(v.x) &&
          _.isFinite(v.y) &&
          _.isFinite(v.width) &&
          _.isFinite(v.height)
        )
      }
    },
    style: {
      type: Object
    }
  },
  render (h) {
    const children = this.$slots.default
    const attrs = this.$vnode.data.attrs || {}
    const props = this.$vnode.data.props || {}
    const viewBox = this.viewBox
    return (
      <svg
        {...attrs}
        {...props}
        width={this.width}
        height={this.height}
        style={this.style}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        version="1.1"
      >
        { children }
      </svg>
    )
  }
}
