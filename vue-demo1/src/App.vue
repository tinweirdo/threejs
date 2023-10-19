<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 加载 glb
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// 加载 hdr
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { Water } from 'three/examples/jsm/objects/Water2.js';
import { onUnmounted } from 'vue';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,//长宽比
  0.1,
  1000
);
camera.position.z = - 70

// camera.position.set(-3.23, 200, 4.06);
camera.updateProjectionMatrix();

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  // 设置抗锯齿
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 设置色调映射，环境滤镜
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 0.15//默认是 1，亮度曝光程度
renderer.outputEncoding = THREE.sRGBEncoding;//设置非线性色彩
renderer.shadowMap.enabled = true;//允许接收阴影
// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true

renderer.physicallyCorrectLights = true;

// 实例化 loader
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig("./draco");
gltfLoader.setDRACOLoader(dracoLoader);

// 加载环境纹理
// 环境贴图，加载 hdr
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/Zbyg-Skies_0008_4k.hdr", (envMap) => {
  // 设置球形映射，否则图片无法跟随视角变化
  envMap.mapping = THREE.EquirectangularRefractionMapping;
  // 背景贴图
  scene.background = envMap;
  // 场景贴图
  scene.environment = envMap;
})

// 加载模型
gltfLoader.load("./model/冬季湖边小屋.glb", (gltf) => {
  const model = gltf.scene;
  console.log('model :>> ', model);
  // 隐藏模型的水面
  model.traverse((child) => {
    if (child.name === "Plane" || child.name.startsWith('tree')) {
      child.visible = false;
    }


    // 允许物体接收
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    };
  })
  scene.add(model);

})


// 棕榈树
gltfLoader.load("./model/Palm.glb", (gltf) => {
  const model = gltf.scene;
  model.position.set(-5, -3, -46)
  model.traverse((child) => {
    // 允许物体接收
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    };
  })
  scene.add(model);
})
// 创建点光源组，围绕棕榈树
const pointLightGroup = new THREE.Group();
pointLightGroup.position.set(-5, -3, -46);
let radius = 3;
const pointLightArr = [];
for (let i = 0; i < 3; i++) {
  // 创建球体当作灯泡
  const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 10,
  })

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(
    radius * Math.cos((i * 2 * Math.PI) / 3),
    3,
    radius * Math.sin((i * 2 * Math.PI) / 3),
  )

  let pointLight = new THREE.PointLight(0xffffff, 50)
  sphere.add(pointLight);
  pointLightGroup.add(sphere)
}
scene.add(pointLightGroup)


// 创建水面
const waterGeometry = new THREE.CircleGeometry(300, 32);
const water = new Water(waterGeometry, {
  textureWidth: 500,
  textureHeight: 500,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1),//水流方向
  scale: 100,
})
water.rotation.x = - Math.PI / 2;
water.position.y = - 2.8;
scene.add(water);


// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);


// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(1, -1.5, -48);
pointLight.castShadow = true;//允许投射阴影
scene.add(pointLight);

// 使用补间函数
function animate() {
  stopRAF = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


onUnmounted(() => {

})

</script>

<template></template>

<style>
* {
  margin: 0;
  padding: 0;
}


body,
#app {
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
