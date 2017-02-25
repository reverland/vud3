import optimizedResize from '../utils/optimizedResize'

export default {
  name: 'Surface',
  props: {
    width: {
      default: 0
    },
    height: {
      default: 0
    }
  },
  data () {
    return {
      optId: null,
      realWidth: 0
    }
  },
  methods: {
    updateSize () {
      let width = parseFloat(this.width) > 0 ? parseFloat(this.width) : undefined
      this.realWidth = width || parseFloat(window.getComputedStyle(this.$refs.wrapper).width) || 300
      let height = parseFloat(this.height) > 0 ? parseFloat(this.height) : undefined
      this.realHeight = height || parseFloat(window.getComputedStyle(this.$refs.wrapper).height) || 150
      this.$emit('resize', this.realWidth, this.realHeight)
    }
  },
  mounted () {
    this.updateSize()
  },
  created () {
    optimizedResize.add(this.updateSize)
  },
  render (h) {
    const children = this.$slots.default
    return h(
      'div',
      {ref: 'wrapper'},
      [(<svg
        width={this.realWidth}
        height={this.realHeight}
        viewBox={`0 0 ${this.realWidth} ${this.realHeight}`}
        version="1.1"
        >
        { children }
      </svg>)]
    )
  }
}
