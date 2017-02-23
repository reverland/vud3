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

    let svg = vm.$el.querySelector('svg')
    vm.$nextTick(_ => {
      expect(svg.getAttribute('width'))
        .to.equal('200')
      expect(svg.getAttribute('height'))
        .to.equal('100')
      expect(svg.getAttribute('viewBox'))
        .to.equal('0 0 200 100')
      done()
    })
  })

  it('should listen to resize event when no width or height', (done) => {
    vm = createVue({
      components: {
        Surface
      },
      data () {
        return {
          width: 0,
          height: 0
        }
      },
      methods: {
        resize (width, height) {
          this.width = width
          this.height = height
        }
      },
      render (h) {
        return (
          <surface ref="wrapper" onResize={this.resize}>
            <rect width={50} height={80} fill={'yellow'}/>
          </surface>
        )
      }
    })

    let wrapper = vm.$refs.wrapper
    wrapper.$el.style.width = '600px'
    wrapper.$el.style.height = '500px'
    triggerEvent(window, 'resize') // window.dispatchEvent(new window.Event('resize'));
    setTimeout(_ => {
      let svg = vm.$el.querySelector('svg')
      expect(svg.getAttribute('width'))
        .to.equal('600')
      expect(svg.getAttribute('height'))
        .to.equal('500')
      expect(svg.getAttribute('viewBox'))
        .to.equal('0 0 600 500')
      done()
    }, 300) // trigger some time later
  })
})
