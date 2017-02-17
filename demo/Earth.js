/* eslint-disable */
import {
  // places,
  // links,
  // arcLines
} from './places'

import {
  oceanFill,
  globeHighlight,
  globeShading
} from './defs'

import { geoOrthographic, geoPath } from 'd3-geo'
import { json as getJson } from 'd3-request'
import { timer } from 'd3-timer'
import * as topojson from 'topojson'

export default {
  name: 'Earth',
  props: ['width', 'height'],
  data () {
    return {
      loading: true,
      countries: [],
      oceanColor: '#6d9bb9',
      r: [0, 0, 0]
    }
  },
  methods: {
    getPath (data) {
      // projection
      let projection = geoOrthographic().translate([this.width / 2, this.height / 2]).scale(150).rotate(this.r);
      // let sky = geoOrthographic().translate([this.width / 2, this.height / 2]).scale(280);
      let path = geoPath().projection(projection).pointRadius(2);
      return path(data)
    }
  },
  mounted () {
    let svg = this.$refs.svg
    let { width, height } = svg.getBoundingClientRect()
    this.width = this.width || width
    this.height = this.height || height
    let alpha = this.r[0]
    timer((elasped) => {
      alpha = 0.12 * (elasped - alpha)
      this.r = [alpha, 0, 0]
    }, 300)
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
  render (h) {
    let ocean = <path d={this.getPath({type: 'Sphere'})} fill={'url(#ocean_fill)'}/>
    let coutries = this.countries.map(c => <path fill={'rgb(117, 87, 57)'} d={this.getPath(c)}/>)
    let highlight = <path d={this.getPath({type: 'Sphere'})} fill={'url(#globe_highlight)'}/>
    let shades = <path d={this.getPath({type: 'Sphere'})} fill={'url(#globe_shading)'}/>
    let svg = (
      <svg id="svg" ref="svg" width={this.width} height={this.height}>
        {oceanFill(h, this.oceanColor)}
        {globeHighlight(h)}
        {globeShading(h)}
        <g>
          {ocean}
        </g>
        <g>
          {coutries}
        </g>
        <g>
          {highlight}
        </g>
        <g>
          {shades}
        </g>
      </svg>
    )
    return svg
  }
}
    /* eslint-enabled */
