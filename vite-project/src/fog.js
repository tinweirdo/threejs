import * as THREE from 'three';
import { scene, camera } from './base.js';
import gui from './gui.js';

// 创建长方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x009a61,
});

const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

// 创建场景 fog
// scene.fog = new THREE.Fog(0x999999, 0.1, 50);//线性雾
scene.fog = new THREE.FogExp2(0x999999, 0.01);// 指数雾
scene.background = new THREE.Color(0x999999);//背景和雾颜色一致，视觉上效果好些
