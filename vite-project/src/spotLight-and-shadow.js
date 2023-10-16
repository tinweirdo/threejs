import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';

// 目标：灯光与阴影
// 1.材质要满足能够对光照有反应，如 MeshBasicMaterial 就不行
// 2.设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;

// 3.设置物体投射阴影 sphere.castShadow = true
// FIXME-t 为什么阴影很小
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial();//默认就是白色
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;//设置物体投射阴影
sphere.position.y = 0.5
scene.add(sphere);

// 4.设置光照投射阴影 directionLight.catShadow = true
// 灯光
// 环境观
const light = new THREE.AmbientLight(0xffffff,1)
scene.add(light)
// 从上方照射的白色平行光，强度为 0.5。
const spotLight = new THREE.SpotLight(0xffffff,1);
spotLight.position.set(5, 5, 5);
// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;//模糊阴影的边缘像素值（px），继承 LightShadow
// 设置阴影贴图分辨率
spotLight.shadow.mapSize.set(2048, 2048);//设置大一些，阴影更加细致，默认 512 x 512
// 设置透视相机属性
spotLight.castShadow = true//设置光照投射阴影

// 聚光灯跟踪物体
spotLight.target = sphere;
scene.add(spotLight);

// 5.设置物体接受阴影 plane.receiveShadow = true
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planMaterial);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true//接受阴影
scene.add(plane);


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();