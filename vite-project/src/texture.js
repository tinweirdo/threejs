import * as THREE from 'three';
import { scene, camera, renderer,controls } from './base.js';

import gui from './gui.js';
// 导入 hdr 加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


export const planeGeo = new THREE.PlaneGeometry(1, 1);
// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();
// 加载纹理
const texture = textureLoader.load("/texture/well.png");
// 加载 AO 贴图
const aoMap = textureLoader.load("/texture/well.png");
// 透明度贴图
const alphaMap = textureLoader.load("/texture/well.png");
// 光照贴图
const lightMap = textureLoader.load("/texture/light.png");

// 高光贴图，控制反射率，黑色不反射，白色反射
const specularMap = textureLoader.load("/texture/light.png");

// 设置纹理彩色空间，设置成 rgb 格式，符合真实视觉
texture.colorSpace = THREE.SRGBColorSpace;
// texture.colorSpace = THREE.LinearSRGBColorSpace;//默认就是线性空间
// texture.colorSpace = THREE.NoColorSpace;//默认就是线性空间

// 环境贴图，加载 hdr
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/texture/christmas_photo_studio_01_4k.hdr", (envMap) => {
    // 设置球形映射，否则图片无法跟随视角变化
    envMap.mapping = THREE.EquirectangularRefractionMapping;
    // 背景贴图
    scene.background = envMap;
    // 场景贴图
    scene.environment = envMap;
    // 设置平面贴图
    planeMaterial.envMap = envMap;
})

const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    // 允许透明
    transparent: true,
    // aoMap,
    // alphaMap,
    // lightMap,
    // 反射强度
    reflectivity: 0.1,//默认为 1
    // specularMap
})

const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.position.z = 5;

scene.add(plane);

// gui
const folder = gui.addFolder("贴图");
folder.add(planeMaterial, "aoMapIntensity").min(0).max(1).name("AO强度");
folder.add(texture, "colorSpace", {
    sRGB: THREE.SRGBColorSpace,
    Linear: THREE.LinearSRGBColorSpace
}).name("更改色彩显示").onChange(() => {
    // 需要更新
    texture.needsUpdate = true
})

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
