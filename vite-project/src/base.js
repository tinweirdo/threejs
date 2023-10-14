import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
export const scene = new THREE.Scene();
//创建相机
export const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight,//长宽比
    0.1,//近平面
    1000//远平面
);
camera.position.x = 6
camera.position.y = 6
camera.position.z = 6

// 创建渲染器
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
export const controls = new OrbitControls(camera, renderer.domElement);
// 以下需在 animate 中调用 update 才能更新设置
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.1
// 自动旋转
// controls.autoRotate = true;
controls.autoRotateSpeed = 5;
// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 监听窗口变化
window.addEventListener("resize", () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    // 改变属性后需调用 updateProjectionMatrix 使得效果生效
    camera.updateProjectionMatrix();
});

