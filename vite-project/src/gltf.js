import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入 draco 解析器，用于加载被压缩的模型
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';


// 实例化加载器
const gltfLoader = new GLTFLoader();

// 实例化加载解析器 draco
const dracoLoader = new DRACOLoader();
// 设置 draco 路径
dracoLoader.setDecoderConfig("./draco");
// 设置 gltf 加载器 draco 解码器
gltfLoader.setDRACOLoader(dracoLoader);

const POSITION = {
    tiger: { x: 0, y: 0, z: 0 },
    horse001: { x: 1, y: 0, z: 0 },
    dog001: { x: 2, y: 0, z: 0 },
    deer: { x: 3, y: 0, z: 0 },
    kitty001: { x: 4, y: 0, z: 0 },
    pinguin001: { x: 5, y: 0, z: 0 },
    chicken001: { x: 6, y: 0, z: 0 },
}
// 加载模型
gltfLoader.load("/module/Animals.glb", (gltf) => {
    console.log('gltf :>> ', gltf);
    // 添加模型场景
    scene.add(gltf.scene);

    for (const child of gltf.scene.children) {
        child.position.x = POSITION[child.name].x;
        child.position.y = POSITION[child.name].y;
        child.position.z = POSITION[child.name].z;
    }
    gltf.asset;
})



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

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
