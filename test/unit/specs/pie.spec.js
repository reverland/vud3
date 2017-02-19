import VPie from 'src/shape/Pie'
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
        VPie
      },
      render (h) {
        return (
          <svg width={100} height={100}>
            <g transform="translate(50,50)">
              <v-pie
                ref="pie"
                padAngle={0.06}
                data={data}
                outerRadius={p => 10 + p.value * 10}
                innerRadius={8}
                colors={['red', 'yellow', 'blue', 'green']}/>
            </g>
          </svg>
        )
      }
    })

    let pieNode = vm.$refs.pie.$el

    expect(pieNode.children[0].getAttribute('d'))
      .to.equal(arc().innerRadius(8).outerRadius(p => 10 + p.value * 10)(pie().padAngle(0.06)(data)[0]))
    expect(pieNode.children[1].getAttribute('fill')).to.equal('yellow')
  })

  it('colors can be functions', () => {
    vm = createVue({
      components: {
        VPie
      },
      render (h) {
        return (
          <svg width={100} height={100}>
            <g transform="translate(50,50)">
              <v-pie
                ref="pie"
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

    let pieNode = vm.$refs.pie.$el

    expect(pieNode.children[0].getAttribute('d'))
      .to.equal(arc().innerRadius(8).outerRadius(p => 10 + p.value * 10)(pie().padAngle(0.06)(data)[0]))
    expect(pieNode.children[1].getAttribute('fill')).to.equal('yellow')
  })
})
