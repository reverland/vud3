import Layer from 'src/container/Layer'
import { destroyVM, createVue } from '../utils'

describe('layer', () => {
  let vm

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('should render correct contents', () => {
    vm = createVue({
      components: {
        Layer
      },
      render (h) {
        return (
          <div>
            <svg ref="svg" width={100} height={100}>
              <layer>
                <rect width={50} height={80} fill={'yellow'}/>
              </layer>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.innerHTML)
      .to.equal('<svg width="100" height="100"><g><rect width="50" height="80" fill="yellow"></rect></g></svg>')
  })
})
