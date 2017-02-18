import Surface from 'src/container/Surface'
import { triggerEvent, destroyVM, createVue } from '../utils'

describe('surface', () => {
  let vm

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('should render correct contents', (done) => {
    vm = createVue({
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
    })

    vm.$nextTick(_ => {
      expect(vm.$el.innerHTML)
        .to.equal('<svg width="200" height="100" viewBox="0 0 200 100" version="1.1"><rect width="50" height="80" fill="yellow"></rect></svg>')
      done()
    })
  })

  it('should listen to resize event when no width', (done) => {
    // TODO: test for window.resize
    vm = createVue({
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
          <surface ref="wrapper" height={100} onResize={this.resize}>
            <rect width={50} height={80} fill={'yellow'}/>
          </surface>
        )
      }
    })

    let wrapper = vm.$refs.wrapper
    wrapper.$el.style.width = '600px'
    triggerEvent(window, 'resize') // window.dispatchEvent(new window.Event('resize'));
    setTimeout(_ => {
      expect(wrapper.$el.innerHTML)
        .to.equal('<svg width="600" height="100" viewBox="0 0 600 100" version="1.1"><rect width="50" height="80" fill="yellow"></rect></svg>')
      done()
    }, 300) // trigger some time later
  })
})
