
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight,//长宽比
    0.1,//近平面
    1000//远平面
);
camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 2;
// 改变属性后需调用 updateProjectionMatrix 使得效果生效
// camera.updateProjectionMatrix();

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, document.body);
// 以下需在 animate 中调用 update 才能更新设置
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.1
// 自动旋转
// controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });//绿色
const material2 = new THREE.MeshBasicMaterial({ color: 0xffc71b });//黄色
// 创建网格
const parentCube = new THREE.Mesh(geometry, material1);
const cube = new THREE.Mesh(geometry, material2);
parentCube.add(cube);
// cube.position.x = 2;
parentCube.position.set(3, 0, 0);
cube.position.set(-3, 0, 0);
// 将网格添加到场景
scene.add(parentCube);

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();