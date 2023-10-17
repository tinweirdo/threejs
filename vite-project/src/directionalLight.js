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
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
// 从上方照射的白色平行光，强度为 0.5。
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20;//模糊阴影的边缘像素值（px），继承 LightShadow
// 设置阴影贴图分辨率
directionalLight.shadow.mapSize.set(2048, 2048);//设置大一些，阴影更加细致，默认 512 x 512
// 设置平行光投射相机属性，超出范围的物体不受光线影响
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;


directionalLight.castShadow = true//设置光照投射阴影
scene.add(directionalLight);
// 调整相机近端
gui.add(directionalLight.shadow.camera, "near")
    .min(0)
    .max(20)
    .step(0.1)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();//每次更新相机需调用
    })
// 4.设置物体投射阴影 sphere.castShadow = true
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshPhysicalMaterial();//默认就是白色
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;//设置物体投射阴影
sphere.position.y = 0.5
scene.add(sphere);

// 5.设置物体接受阴影 plane.receiveShadow = true
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planMaterial = new THREE.MeshPhysicalMaterial({ side: THREE.DoubleSide });
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