<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,//长宽比
  0.1,
  1000
);
camera.position.set(-3.23, 2.98, 4.06);
camera.updateProjectionMatrix();

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  // 设置抗锯齿
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true

// 实例化 loader
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig("./draco");
gltfLoader.setDRACOLoader(dracoLoader);

// 加载模型
gltfLoader.load("./model/Emoticon_27.glb", (gltf) => {
  const model = gltf.scene;
  scene.add(model);
})

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
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
