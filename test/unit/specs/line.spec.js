import VLine from 'src/shape/Line'
import { destroyVM, createVue } from '../utils'

describe('line', () => {
  let vm

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can generate a line', () => {
    let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]
    vm = createVue({
      components: {
        VLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-line data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.innerHTML)
      .to.equal('<svg><path d="M0,2L20,10L50,40"></path></svg>')
  })

  it('can accept curve name and optional curve args', () => {
    let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]
    vm = createVue({
      components: {
        VLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-line ref="line" curve={'catmullRom'} curveArgs={{alpha: 3}} data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$refs.line.$el.getAttribute('d'))
      .to.equal('M0,2C0,2,13.953410040771484,7.49048330022003,20,10C66.20003508581078,29.1744041451515,50,40,50,40')
  })

  it('can accept other attribute', () => {
    let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]
    vm = createVue({
      components: {
        VLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-line fill="none" stroke={'blue'} data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.innerHTML)
      .to.equal('<svg><path d="M0,2L20,10L50,40" fill="none" stroke="blue"></path></svg>')
  })
})
