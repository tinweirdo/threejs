import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';

// 目标：灯光与阴影
// 1.材质要满足能够对光照有反应，如 MeshBasicMaterial 就不行
// 2.设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;

// 3.设置物体投射阴影 sphere.castShadow = true
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial();//默认就是白色
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;//设置物体投射阴影
sphere.position.y = 0.5
scene.add(sphere);

// 4.设置光照投射阴影 directionLight.catShadow = true
// 环境光
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
const pointLight = new THREE.PointLight(0xff0000, 100);
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;//模糊阴影的边缘像素值（px），继承 LightShadow
// 设置阴影贴图分辨率
pointLight.shadow.mapSize.set(512, 512);//设置大一些，阴影更加细致，默认 512 x 512
// 设置透视相机属性
pointLight.castShadow = true//设置光照投射阴影

// 将光源绑定在实体小球上
const smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),//不受光照影响
)
smallBall.position.set(2, 2, 2)
smallBall.add(pointLight);
scene.add(smallBall);
gui.add(pointLight.position, "x").min(-5).max(5).step(0.1).name("光源 x 坐标")
gui.add(pointLight, "distance").min(0).max(50).step(0.1).name("光线距离")
gui.add(pointLight, "decay").min(0).max(5).step(0.1).name("光线衰减百分比")//需要在物理模式下


// 5.设置物体接受阴影 plane.receiveShadow = true
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planMaterial);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true//接受阴影
scene.add(plane);


// 小球随带球旋转
const clock = new THREE.Clock();
function animate() {
    const time = clock.getElapsedTime();
    smallBall.position.x = Math.cos(time) * 5;
    smallBall.position.z = Math.sin(time) * 5;
    smallBall.position.y = 2 + Math.sin(time * 5);
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();