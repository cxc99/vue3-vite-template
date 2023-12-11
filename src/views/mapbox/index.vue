<template>
  <div id="map" ref="map">
    <div id="webgl" ref="webgl" class="webgl"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import mapboxgl from 'mapbox-gl'
import mapJson from '@/assets/map/map.json'
import zhejiang from '@/assets/map/zhejiang.json'

const map = ref(null) as any
const webgl = ref(null) as any
const mapBox = ref(null) as any

const img =
  'https://model.3dmomoda.com/models/da5e99c0be934db7a42208d5d466fd33/0/gltf/F3E2E977BDB335778301D9A1FA4A4415.png'

function mapInit() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieGlueGlhbmciLCJhIjoiY2w0ZTNnMGs3MDBkdzNscDBjb3pjaWQ5YiJ9.d2Zjk81sQFYpiQ_BxiCHYA'

  const Map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [120.721941, 30.286334],
    zoom: 8,
    maxZoom: 17,
    style: mapJson,
    pitch: 45,
    bearing: 90,
  })

  mapBox.value = Map

  Map.on('load', () => {
    Map.addSource('maine', {
      type: 'geojson',
      data: zhejiang,
    })

    Map.addLayer({
      id: 'outline',
      type: 'line',
      source: 'maine',
      layout: {},
      paint: {
        'line-color': 'pink',
        'line-width': 3,
      },
    })

    setLine()
  })
}

function threeInit() {
  // 定义相机输出画布的尺寸(单位:像素px)

  const fov = 75
  const aspect = 1 // the canvas default
  const near = 0.1
  const far = 1000
  // 创建3D场景对象Scene
  const scene = new THREE.Scene()
  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  //创建一个长方体几何对象Geometry

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(200, 100)
  renderer.setClearColor(0xb9d3ff, 0.01) //设置背景颜色

  webgl.value.appendChild(renderer.domElement)

  const texture = new THREE.TextureLoader().load(
    'https://cosstatic.weixiaotong.com.cn/static/icon/mini-program/icon-visited.svg',
    // texture => {},
  )
  // DodecahedronGeometry 球体
  const geometry = new THREE.BoxGeometry()

  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    // color: 0xffffff, //0xff0000设置材质颜色为红色
  })

  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  //设置网格模型在三维空间中的位置坐标，默认是坐标原点

  scene.add(mesh)

  camera.position.z = 2 // 相机高度

  renderer.render(scene, camera)

  // 定义渲染的动画函数
  function animate() {
    //将animate函数添加到requestAnimationFrame，进行循环调用
    requestAnimationFrame(animate)

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    //执行渲染器的渲染函数
    renderer.render(scene, camera)
  }
  //执行渲染函数
  animate()
}

/**
 * 创建流体墙体材质
 * option =>
 * params bgUrl flowUrl
 * **/
const createFlowWallMat = ({
  bgUrl,
  flowUrl,
}: {
  bgUrl: string
  flowUrl: string
}) => {
  // 顶点着色器
  const vertexShader = `
            varying vec2 vUv;
            varying vec3 fNormal;
            varying vec3 vPosition;
            void main(){
                    vUv = uv;
                    vPosition = position;
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_Position = projectionMatrix * mvPosition;
            }
        `
  // 片元着色器
  const fragmentShader = `
            uniform float time;
            varying vec2 vUv;
            uniform sampler2D flowTexture;
            uniform sampler2D bgTexture;
            void main( void ) {
                vec2 position = vUv;
                vec4 colora = texture2D( flowTexture, vec2( vUv.x, fract(vUv.y - time )));
                vec4 colorb = texture2D( bgTexture , position.xy);
                gl_FragColor = colorb + colorb * colora;
            }
        `
  const bgTexture = new THREE.TextureLoader().load(
    bgUrl || './img/opacityWall.png',
  )
  const flowTexture = new THREE.TextureLoader().load(
    flowUrl ||
      'https://model.3dmomoda.com/models/da5e99c0be934db7a42208d5d466fd33/0/gltf/F3E2E977BDB335778301D9A1FA4A4415.png',
    // "https://model.3dmomoda.com/models/47007127aaf1489fb54fa816a15551cd/0/gltf/116802027AC38C3EFC940622BC1632BA.jpg"
  )
  // 允许平铺
  flowTexture.wrapS = THREE.RepeatWrapping
  return new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0,
      },
      flowTexture: {
        value: flowTexture,
      },
      bgTexture: {
        value: bgTexture,
      },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  })
}

function setLine() {
  //传入参数
  let points = [
    [114.58, 28.61],
    [114.58, 28.58],
    [114.64, 28.6],
    [114.58, 28.61],
  ]
  let positions = []
  let uvs = []
  for (
    let i = 0, j = positions.length, t = uvs.length;
    i < points.length - 1;
    i++
  ) {
    let vUvyMax = 1
    let left = points[i]
    let right = points[i + 1]
    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = 0
    uvs[t++] = 0
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = height
    uvs[t++] = 1
    uvs[t++] = vUvyMax
  }
  let geometry = new THREE.BufferGeometry()
  geometry.addAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), 3),
  )
  geometry.addAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), 2),
  )

  let WallLayer = {
    id: 'WallLayer01', //图层ID
    type: 'custom', //必须写详情看api
    renderingMode: '2d', //同上
    onAdd: function (map: any, gl: any) {
      let fov = 75
      let aspect = 1 // the canvas default
      let near = 0.1
      let far = 1000
      //创建相机
      let camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      //创建场景
      let scene = new THREE.Scene()
      //使用地图的gl上下文
      let renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      })

      camera.position.z = 2
      //创建灯光
      let light = new THREE.PointLight(0xfca4c5)
      light.position.set(0, 250, 0)
      scene.add(light)
      // 创建材质 图自取  在下面
      var texture = new THREE.TextureLoader().load(
        'https://model.3dmomoda.com/models/da5e99c0be934db7a42208d5d466fd33/0/gltf/F3E2E977BDB335778301D9A1FA4A4415.png',
      )

      // 设置阵列
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      // uv两个方向纹理重复数量
      texture.repeat.set(1, 3)
      this.texture = texture
      //设置材质
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      })
      //创建
      let mesh = new THREE.Mesh(geometry, material)
      //添加到场景
      scene.add(mesh)
      //设置不清楚canvas上其他内容
      renderer.autoClear = false
      //下面还会用到，我就直接用this了，你们也可以直接创建全局变量
      this.camera = camera
      this.scene = scene
      this.renderer = renderer
      this.matrtial = material
      this.mesh = mesh
      this.map = map
    },
    render: function (gl: any, matrix: any) {
      //设置相机矩阵
      var m = new THREE.Matrix4().fromArray(matrix)
      this.camera.projectionMatrix = m
      this.renderer.state.reset()
      this.renderer.render(this.scene, this.camera)
      this.map.triggerRepaint()
      //设置纹理动画向上偏移
      requestAnimationFrame(() => {
        this.texture.offset.y -= 0.03
      })
    },
  }

  mapBox.value.addLayer(WallLayer)
}

onMounted(() => {
  mapInit()
  threeInit()
  setLine()
})
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 10;
  // background: pink;

  .webgl {
    position: absolute;
    top: 0px;
  }
}
</style>
