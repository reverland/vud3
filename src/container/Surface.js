import optimizedResize from '../utils/optimizedResize'

export default {
  name: 'Surface',
  props: {
    width: {
      default: 0
    },
    height: {
      default: 100
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
      if (parseInt(this.width) <= 0) {
        const computedWidth = window.getComputedStyle(this.$refs.wrapper).width || 150
        let width = parseInt(computedWidth)
        this.realWidth = width
      } else {
        this.realWidth = this.width
      }
      this.$emit('resize', this.realWidth)
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
        height={this.height}
        viewBox={`0 0 ${this.realWidth} ${this.height}`}
        version="1.1"
        >
        { children }
      </svg>)]
    )
  }
}
