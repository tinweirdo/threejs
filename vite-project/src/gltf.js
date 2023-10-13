import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入 draco 解析器，用于加载被压缩的模型
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { scene, camera } from './base.js';
import gui from './gui.js';


// 实例化加载器
const gltfLoader = new GLTFLoader();
// 加载模型
gltfLoader.load("/module/Animals.glb", (gltf) => {
    console.log('gltf :>> ', gltf);
    // 添加模型场景
    scene.add(gltf.scene);
})

// 实例化加载解析器 draco
const dracoLoader = new DRACOLoader();
// 设置 draco 路径
dracoLoader.setDecoderConfig("./draco");
// 设置 gltf 加载器 draco 解码器
gltfLoader.setDRACOLoader(dracoLoader);


// 环境贴图，加载 hdr
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/texture/christmas_photo_studio_01_4k.hdr", (envMap) => {
    // 设置球形映射，否则图片无法跟随视角变化
    envMap.mapping = THREE.EquirectangularRefractionMapping;
    // 背景贴图
    scene.background = envMap;
    // 场景贴图
    scene.environment = envMap;
})