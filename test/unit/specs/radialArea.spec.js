import VRadialArea from 'src/shape/RadialArea'
import { destroyVM, createVue } from '../utils'
import { radialArea, curveCatmullRom, curveBasis } from 'd3-shape'

describe('radialArea', () => {
  let vm
  let data = [{x: 0, y: 20}, {x: 20, y: 10}, {x: 50, y: 40}]

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can accept angle, outerRadius', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                angle={p => p.x}
                outerRadius={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialArea().angle(p => p.x).outerRadius(p => p.y)(data))
  })

  it('can accept angle, innerRadius, outerRadius', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                angle={p => p.x}
                innerRadius={p => p.y}
                outerRadius={p => p.y * 2}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialArea().angle(p => p.x).outerRadius(p => p.y * 2).innerRadius(p => p.y)(data))
  })

  it('can accept radius, startAngle, endAngle', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                startAngle={p => 0}
                endAngle={p => p.x}
                radius={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialArea().startAngle(p => 0).endAngle(p => p.x).radius(p => p.y)(data))
  })

  it('can accept defined', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                startAngle={p => 0}
                endAngle={p => p.x}
                radius={p => p.y}
                defined={p => p.y > 10}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(radialArea().startAngle(p => 0).endAngle(p => p.x).radius(p => p.y).defined(p => p.y > 10)(data))
  })

  it('can accept other attribute', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                startAngle={p => 0}
                endAngle={p => p.x}
                radius={p => p.y}
                fill="yellow"
                stroke="blue"
                data={data}/>
            </svg>
          </div>
        )
      }
    })

    let path = vm.$el.querySelector('path')
    expect(path.getAttribute('d'))
      .to.equal(radialArea().startAngle(p => 0).endAngle(p => p.x).radius(p => p.y)(data))
    expect(path.getAttribute('fill'))
      .to.equal('yellow')
    expect(path.getAttribute('stroke'))
      .to.equal('blue')
  })

  it('can curve name and optional curveArgs', () => {
    vm = createVue({
      components: {
        VRadialArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-radial-area
                curve="catmullRom"
                curveArgs={{alpha: 3}}
                startAngle={p => 0}
                endAngle={p => p.x}
                radius={p => p.y}
                data={data}/>
              <v-radial-area
                curve="basis"
                startAngle={p => 0}
                endAngle={p => p.x}
                radius={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })

    expect(vm.$el.querySelectorAll('path')[0].getAttribute('d'))
      .to.equal(radialArea().curve(curveCatmullRom.alpha(3)).radius(p => p.y).endAngle(p => p.x).startAngle(p => 0)(data))
    expect(vm.$el.querySelectorAll('path')[1].getAttribute('d'))
      .to.equal(radialArea().curve(curveBasis).radius(p => p.y).endAngle(p => p.x).startAngle(p => 0)(data))
  })
})
