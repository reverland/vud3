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

import { geoPath } from 'd3-geo'

export default {
  name: 'Earth',
  props: {
    countries: {},
    projection: {}
  },
  data () {
    return {
      loading: true,
      oceanColor: '#6d9bb9'
    }
  },
  methods: {
    getPath (data) {
      let path = geoPath().projection(this.projection).pointRadius(2);
      return path(data)
    }
  },
  render (h) {
    let ocean = <path d={this.getPath({type: 'Sphere'})} fill={'url(#ocean_fill)'}/>
    let coutries = this.countries.map(c => <path fill={'rgb(117, 87, 57)'} d={this.getPath(c)}/>)
    let highlight = <path d={this.getPath({type: 'Sphere'})} fill={'url(#globe_highlight)'}/>
    let shades = <path d={this.getPath({type: 'Sphere'})} fill={'url(#globe_shading)'}/>
    let svg = (
      <svg
      >
        {oceanFill(h, this.oceanColor)}
        {globeHighlight(h)}
        {globeShading(h)}
        <g>
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
        </g>
      </svg>
    )
    return svg
  }
}
