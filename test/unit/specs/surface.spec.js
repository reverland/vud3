import Vue from 'vue'
import Surface from 'src/container/Surface'

describe('surface', () => {
  let vm

  afterEach(() => {
    vm.$destroy()
    vm && vm.$el && (vm.$el.innerHTML = '')
  })

  it('should render correct contents', (done) => {
    vm = new Vue({
      components: {
        Surface
      },
      render (h) {
        return (
          <surface width={200} height={100}>
            <rect width={50} height={80} fill={'yellow'}/>
          </surface>
        )
      }
    }).$mount('body')

    vm.$nextTick(_ => {
      expect(vm.$el.innerHTML)
        .to.equal('<svg width="200" height="100" viewBox="0 0 200 100" version="1.1"><rect width="50" height="80" fill="yellow"></rect></svg>')
      done()
    })
  })

  it('should listen to resize event when no width', (done) => {
    // TODO: test for window.resize
    vm = new Vue({
      components: {
        Surface
      },
      data () {
        return {
          width: 0
        }
      },
      methods: {
        resize (width) {
          this.width = width
        }
      },
      render (h) {
        return (
          <surface ref="svg" height={100} onResize={this.resize}>
            <rect width={50} height={80} fill={'yellow'}/>
          </surface>
        )
      }
    }).$mount('body')

    // window.resizeTo(400, 400) // can not mock resize event?
    vm.$nextTick(_ => {
      expect(vm.$el.innerHTML)
        .to.equal('<svg width="150" height="100" viewBox="0 0 150 100" version="1.1"><rect width="50" height="80" fill="yellow"></rect></svg>')
      done()
    })
  })
})
