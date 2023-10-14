import * as THREE from 'three';
import { scene, camera, renderer,controls } from './base.js';

import gui from './gui.js';

const geometry = new THREE.BufferGeometry();
// 创建顶点数据
// 顶点是有顺序的，逆时针为正面
const vertices = new Float32Array([
    -0.5, -0.5, 1.5,
    0.5, -0.5, 1.5,
    0.5, 0.5, 1.5,
    -0.5, 0.5, 1.5,
])
// 创建顶点属性
// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// 创建索引
const indexs = new Uint16Array([0, 1, 2, 2, 3, 0]);
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indexs, 1));

const material1 = new THREE.MeshBasicMaterial({
    color: 0x74baa8,
    side: THREE.DoubleSide,//定义将要渲染两面
    // wireframe: true
});

const material2 = new THREE.MeshBasicMaterial({
    color: 0xd0121b,
    side: THREE.DoubleSide,//定义将要渲染两面
    // wireframe: true
});

// 不同三角设置不同材质
// 设置2个顶点组，形成2个材质
geometry.addGroup(0, 3, 0);//第 0 个点后 3 个点形成的面，使用第 0 个材质
geometry.addGroup(3, 3, 1);

export const triangle = new THREE.Mesh(geometry, [material1, material2]);
scene.add(triangle);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
