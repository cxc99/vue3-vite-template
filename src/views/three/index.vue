<template>
  <div class="flex items-center">
    <div ref="cubeDom" class="w-200px h-200px"></div>
    <div ref="lineDom" class="w-200px h-100px bg-[rgb(123,123,123)]"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const cubeDom = ref<HTMLElement>()

const lineDom = ref<HTMLElement>()
function initCube() {
  const dom = cubeDom.value!

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    20,
    dom.offsetHeight / dom.offsetWidth,
    0.1,
    1000,
  ) as any

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(dom.offsetHeight, dom.offsetWidth)

  dom.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 'pink' })
  const cube = new THREE.Mesh(geometry, material) as any
  scene.add(cube)

  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
  }

  animate()
}

function initLine() {
  const dom = lineDom.value!

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    20,
    dom.offsetHeight / dom.offsetWidth,
    0.1,
    1000,
  ) as any
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(dom.offsetHeight, dom.offsetWidth)
  dom.appendChild(renderer.domElement)

  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  //create a blue LineBasicMaterial
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const points = []
  points.push(new THREE.Vector3(-5, 0, 0))
  points.push(new THREE.Vector3(0, 5, 0))
  points.push(new THREE.Vector3(5, 0, 0))
  points.push(new THREE.Vector3(0, -5, 0))
  points.push(new THREE.Vector3(-5, 0, 0))

  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  const line = new THREE.Line(geometry, material)

  scene.add(line)

  const loader = new GLTFLoader()
  const Path = new URL('./config/dome.glft', import.meta.url)
  console.log(Path)

  // loader.setPath(Path)
  // loader.load('/config/dome.glft', function (gltf) {
  //   gltf.scene.traverse(function (child) {})
  //   scene.add(gltf.scene)
  // })
  renderer.render(scene, camera)
}

onMounted(() => {
  initCube()
  initLine()
})
// renderer.render(scene, camera)
// animate()
</script>

<style lang="scss" scoped>
.d {
  color: orange;
}
</style>
