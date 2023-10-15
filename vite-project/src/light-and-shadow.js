import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';

// 目标：灯光与阴影
// 1.材质要满足能够对光照有反应，如 MeshBasicMaterial 就不行
// 2.设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;

// 3.设置光照投射阴影 directionLight.catShadow = true
// 灯光
// 环境观
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
// 从上方照射的白色平行光，强度为 0.5。
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10)
directionalLight.castShadow = true//设置光照投射阴影
scene.add(directionalLight);

// 4.设置物体投射阴影 sphere.castShadow = true
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial();//默认就是白色
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;//设置物体投射阴影
sphere.position.y = 0.5
scene.add(sphere);

// 5.设置物体接受阴影 plane.receiveShadow = true
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});
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