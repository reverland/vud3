import Vue from 'vue'
import Earth from './src/Earth'

/* eslint-disable */
new Vue({
  el: '#app',
  components: {
    TEarth,
    Earth
  },
  data () {
    return {
      width: 400,
      height: 400
    }
  },
  render (h) {
    return (
      <div>
        <earth width={this.width} height={this.height} style="position: absolute;"/>
      </div>
    )
  },
  created () {
    window.onresize = () => {
      this.width = window.innerWidth
    }
  }
})
/* eslint-enable */
