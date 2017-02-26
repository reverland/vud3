import VRadialLine from 'src/shape/RadialLine'
import { destroyVM, createVue } from '../utils'
import { radialLine, curveCatmullRom } from 'd3-shape'

describe('radialLine', () => {
  let vm
  let data = [{x: 0, y: 30}, {x: 20, y: 10}, {x: 50, y: 40}]

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can generate a radial line', () => {
    vm = createVue({
      components: {
        VRadialLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-line
                angle={p => p.x}
                radius={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialLine().angle(p => p.x).radius(p => p.y)(data))
  })

  it('can accept defined', () => {
    vm = createVue({
      components: {
        VRadialLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-line
                angle={p => p.x}
                radius={p => p.y}
                data={data}
                defined={p => p.y > 10}/>
            </svg>
          </div>
        )
      }
    })

    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialLine().angle(p => p.x).radius(p => p.y).defined(p => p.y > 10)(data))
  })

  it('can accept curve name and optional curve args', () => {
    let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]
    vm = createVue({
      components: {
        VRadialLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-line
                angle={p => p.x}
                radius={p => p.y}
                curve={'catmullRom'}
                curveArgs={{alpha: 3}}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialLine().angle(p => p.x).radius(p => p.y).curve(curveCatmullRom.alpha(3))(data))
  })

  it('can accept other attribute', () => {
    let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]
    vm = createVue({
      components: {
        VRadialLine
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-line
                angle={p => p.x}
                radius={p => p.y}
                fill="none"
                stroke={'blue'}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialLine().angle(p => p.x).radius(p => p.y)(data))
    expect(vm.$el.querySelector('path').getAttribute('stroke'))
      .to.equal('blue')
  })
})
