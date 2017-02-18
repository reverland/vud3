import Vue from 'vue'
import Layer from 'src/container/Layer'

describe('layer', () => {
  let vm

  it('should render correct contents', () => {
    vm = new Vue({
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
    }).$mount()
    expect(vm.$el.innerHTML)
      .to.equal('<svg width="100" height="100"><g><rect width="50" height="80" fill="yellow"></rect></g></svg>')
  })
})
