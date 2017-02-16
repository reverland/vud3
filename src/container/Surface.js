import optimizedResize from '../utils/optimizedResize'

export default {
  name: 'Surface',
  props: ['width', 'height'],
  data () {
    return {
      optId: null,
      width: 0,
      realWidth: 0
    }
  },
  methods: {
    updateSize () {
      if (this.width === 'auto') {
        const computedWidth = window.getComputedStyle(this.$refs.wrapper).width
        let width = parseInt(computedWidth)
        this.realWidth = width
      } else {
        this.realWidth = this.width
      }
    }
  },
  mounted () {
    this.updateSize()
    this.$emit('resize', this.realWidth)
  },
  created () {
    this.optId = optimizedResize.add(() => {
      this.updateSize()
    }, () => {
      this.$emit('resize', this.realWidth)
    })
  },
  destroyed () {
    optimizedResize.remove(this.optId)
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
