
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
camera.position.x = 6
camera.position.y = 6
camera.position.z = 6

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
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
export const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xffc71b });//黄色
const childMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });//绿色

// 创建网格
export const parentCube = new THREE.Mesh(geometry, parentMaterial);

const childCube = new THREE.Mesh(geometry, childMaterial);
childCube.scale.set(0.5, 0.5, 0.5);//局部，相对于父元素

parentCube.add(childCube);
// cube.position.x = 2;
childCube.position.set(3, 0, 0);//局部，相对于父元素
// 绕着 x 轴旋转
childCube.rotation.x = Math.PI / 4;

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

// 全屏
document.getElementById("fullscreen-btn").onclick = () => {
    // renderer.domElement.requestFullscreen();//画布全屏
    document.body.requestFullscreen();//document 全屏
}
// 退出全屏
document.getElementById("exit-fullscreen-btn").onclick = () => {
    document.exitFullscreen();//画布全屏
}
