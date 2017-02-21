import VPie from 'src/shape/Pie'
import VArc from 'src/shape/Arc'
import { destroyVM, createVue } from '../utils'
import { arc, pie } from 'd3-shape'

describe('pie', () => {
  let vm
  let data = [1, 2, 3, 4]

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can generate pie properly', () => {
    vm = createVue({
      components: {
        VPie,
        VArc
      },
      render (h) {
        return (
          <svg>
            <g transform="translate(50,50)">
              <v-pie
                padAngle={0.06}
                data={[1, 2, 3, 4]}
                outerRadius={p => 10 + p.value * 10}
                innerRadius={8}
                colors={['red', 'yellow', 'blue', 'green']}/>
            </g>
          </svg>
        )
      }
    })

    let pieNodes = vm.$el.querySelectorAll('path')

    expect(pieNodes[0].getAttribute('d'))
    .to.equal(arc().innerRadius(8).outerRadius(p => 10 + p.value * 10)(pie().padAngle(0.06)(data)[0]))
    expect(pieNodes[1].getAttribute('fill')).to.equal('yellow')
  })

  it('colors can be functions', () => {
    vm = createVue({
      components: {
        VPie,
        VArc
      },
      render (h) {
        return (
          <svg>
            <g transform="translate(50,50)">
              <v-pie
                padAngle={0.06}
                data={data}
                outerRadius={p => 10 + p.value * 10}
                innerRadius={8}
                colors={(d, i) => ['red', 'yellow', 'blue', 'green'][i]}/>
            </g>
          </svg>
        )
      }
    })

    let pieNodes = vm.$el.querySelectorAll('path')

    expect(pieNodes[0].getAttribute('d'))
      .to.equal(arc().innerRadius(8).outerRadius(p => 10 + p.value * 10)(pie().padAngle(0.06)(data)[0]))
    expect(pieNodes[1].getAttribute('fill')).to.equal('yellow')
  })
})
