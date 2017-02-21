import versor from './versor'
import point from './point'
import Earth from './Earth'
import { geoOrthographic } from 'd3-geo'
import { json as getJson } from 'd3-request'
import * as topojson from 'topojson'

export default {
  name: 'DragWrapper',
  components: {
    Earth
  },
  props: ['width', 'height'],
  data () {
    return {
      r: [0, 0, 0],
      countries: [],
      _dragging: false, // judge if is dragging
      _r0: [0, 0, 0], // when drag start the angle
      _v0: [0, 0] // when drag start the point
    }
  },
  computed: {
    projection () {
      return geoOrthographic().translate([this.width / 2, this.height / 2]).scale(this.width / 2).rotate(this.r);
    }
  },
  methods: {
    onMousedown (e) {
      this._dragging = true
      this._v0 = versor.cartesian(this.projection.invert(point(this.$refs.svg.$el, e)))
      this._r0 = this.r
      window.addEventListener('mousemove', this.onMousemove)
      window.addEventListener('mouseup', this.onMouseup)
    },
    onMousemove (e) {
      e.preventDefault()
      if (this._dragging) {
        let v1 = versor.cartesian(this.projection.rotate(this._r0).invert(point(this.$refs.svg.$el, e)))
        let quad = versor.multiply(versor(this._r0), versor.delta(this._v0, v1))
        this.r = versor.rotation(quad)
      }
    },
    onMouseup (e) {
      e.preventDefault()
      this._dragging = false
    }
  },
  created () {
    this.loading = true
    getJson('https://raw.githubusercontent.com/vega/datalib/master/test/data/world-110m.json', (err, world) => {
      if (err) {
        return
      }
      this.loading = false
      this.countries = topojson.feature(world, world.objects.countries).features
    })
  },
  destroyed () {
    console.log('destroyed')
    window.removeEventListener('mousemove', this.onMousemove)
    window.removeEventListener('mouseup', this.onMouseup)
  },
  render (h) {
    return (
      <div>
        <earth
          id="svg"
          ref="svg"
          nativeOnMousedown={this.onMousedown}
          nativeOnMousemove={this.onMousemove}
          nativeOnMouseup={this.onMouseup}
          projection={this.projection}
          countries={this.countries}
          width={this.width}
          height={this.height}/>
      </div>
    )
  }
}
