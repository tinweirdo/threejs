
import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';

import gui from './gui.js';
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log('geometry :>> ', geometry);
// 创建材质
export const parentMaterial0 = new THREE.MeshBasicMaterial({ color: 0xffc71b });//黄色
export const parentMaterial1 = new THREE.MeshBasicMaterial({ color: 0x4efeff });//黄色
export const parentMaterial2 = new THREE.MeshBasicMaterial({ color: 0x262eff });//黄色
export const parentMaterial3 = new THREE.MeshBasicMaterial({ color: 0xf82f00 });//黄色
export const parentMaterial4 = new THREE.MeshBasicMaterial({ color: 0x6988ff });//黄色
export const parentMaterial5 = new THREE.MeshBasicMaterial({ color: 0x00aeec });//黄色

const childMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 },);//绿色
// 创建网格
export const parentCube = new THREE.Mesh(geometry, [
    parentMaterial0,
    parentMaterial1,
    parentMaterial2,
    parentMaterial3,
    parentMaterial4,
    parentMaterial5,
]);

const childCube = new THREE.Mesh(geometry, childMaterial);
childCube.scale.set(0.5, 0.5, 0.5);//局部，相对于父元素

parentCube.add(childCube);
// cube.position.x = 2;
childCube.position.set(3, 0, 0);//局部，相对于父元素
// 绕着 x 轴旋转
childCube.rotation.x = Math.PI / 4;

// 将网格添加到场景
scene.add(parentCube);

// gui
const folder = gui.addFolder("立方体位置");
// gui.add(cube.position, "x", -3, 2).name("立方体 x 轴位置");
folder.add(parentCube.position, "x").min(0).max(5).step(1).name("立方体 x 轴位置")
    .onChange(val => {
        console.log('val x :>> ', val);
    });
folder.add(parentCube.position, "y").min(0).max(5).step(1).name("立方体 y 轴位置")
    .onFinishChange(val => {
        console.log('val y end :>> ', val);
    });
folder.add(parentCube.position, "z").min(0).max(5).step(1).name("立方体 z 轴位置");

// 设置父元素材质为线框模式
gui.add(parentMaterial0, "wireframe").name("父级立方体线框模式");

// 改变 cube 颜色
const cubeParams = { cubeColor: "#ffc71b" }
gui.addColor(cubeParams, "cubeColor")
    .name("父级立方体颜色")
    .onChange(val => {
        parentCube.material.color.set(val);
    })


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();



