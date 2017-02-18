import VArc from 'src/shape/Arc'
import { destroyVM, createVue } from '../utils'
import { arc } from 'd3-shape'

describe('arc', () => {
  let vm
  let data = {
    innerRadius: 0,
    outerRadius: 40,
    startAngle: 0,
    endAngle: Math.PI / 2
  }

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can generate a arc', () => {
    vm = createVue({
      components: {
        VArc
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-arc ref="arc" data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$refs.arc.$el.getAttribute('d'))
      .to.equal(arc()(data))
  })

  it('can accept a arc args', () => {
    vm = createVue({
      components: {
        VArc
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-arc
                ref="arc"
                innerRadius={30}
                outerRadius={p => p.outerRadius * 2}
                cornerRadius={6}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$refs.arc.$el.getAttribute('d'))
      .to.equal(arc().outerRadius(p => p.outerRadius * 2).innerRadius(30).cornerRadius(6)(data))
  })
})
