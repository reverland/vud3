import Vue from 'vue'
import Drag from './src/Drag'

/* eslint-disable */
new Vue({
  el: '#app',
  components: {
    Drag
  },
  render (h) {
    return <drag width={400} height={400}/>
  }
})
/* eslint-enable */
