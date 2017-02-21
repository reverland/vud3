import * as THREE from 'three'

export default {
  name: 'Earth',
  props: ['width', 'height', 'a', 'b'],
  data () {
    return {
      renderer: {},
      cube: {},
      scene: {},
      camera: {},
      group: {}
    }
  },
  methods: {
    prepareRenderer (width, height) {
      let wrapper = this.$refs.renderer
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.renderer.setClearColor(0xffffff)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      wrapper.appendChild(this.renderer.domElement)
    },
    prepareMesh (texture) {
      let geometry = new THREE.SphereGeometry(200, 20, 20)
      let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 })
      return new THREE.Mesh(geometry, material)
    },
    prepareCamera (width, height) {
      this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000)
      this.camera.position.z = 500
    },
    prepareTexture () {
      let loader = new THREE.TextureLoader()
      loader.load('/assets/textures/2_no_clouds_8k.jpg', (texture) => {
        this.group.add(this.prepareMesh(texture))
        this.update()
      })
    },
    update () {
      window.requestAnimationFrame(this.update)

      this.group.rotation.y -= 0.005;

      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    let { width, height } = this
    this.prepareRenderer(width, height)
    this.prepareCamera(width, height)
    this.scene = new THREE.Scene();
    this.group = new THREE.Group()
    this.scene.add(this.group)
    this.prepareTexture()
  },
  render (h) {
    return <div ref="renderer" class="vud3-three-js-demo"></div>
  },
  watch: {
    width () {
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    }
  }
}
