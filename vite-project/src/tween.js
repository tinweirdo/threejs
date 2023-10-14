import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';

// #region 简单直线循环往复
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
        color: 0xf5b61f
    })
)
sphere1.position.x = -4;
scene.add(sphere1);

const tween1 = new TWEEN.Tween(sphere1.position) // 创建一个修改“坐标”的新 tween。
    .to({ x: 4 }, 5000) // 在 1 秒内移动到 (300, 200)。
    .repeat(Infinity)//播放无限次动画
    .yoyo(true)//循环往复
    .easing(TWEEN.Easing.Quadratic.InOut) // 使用缓动函数使动画流畅。
    .delay(500) // 延迟 0.5s 再运行
    .onUpdate(() => {

    })

// gui
const envent = {
    stop: function () {
        console.log("@");
        tween1.stop();
    },
    start: function () {
        tween1.start();
    }
}
// FIXME-t 为什么点击停止后，小球停止一段时间后自动启动，冰球小球的循环范围发生变化
gui.add(envent, "stop").name("停止小黄球动画");
gui.add(envent, "start").name("开始小黄球动画");
// #endregion

// #region 链式动画
const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
        color: 0x0fa6d8
    })
)
sphere2.position.x = 4;
sphere2.position.z = 3;
scene.add(sphere2);

const tween2 = new TWEEN.Tween(sphere2.position)
    .to({ x: -4, y: 0 }, 1000)
    .delay(500) // 延迟 0.5s 再运行
    .easing(TWEEN.Easing.Quadratic.InOut)
const tween3 = new TWEEN.Tween(sphere2.position)
    .to({ y: -4 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)

tween2.chain(tween3);//将两个动画链接到一起
tween3.chain(tween2);
tween2.start();
// #endregion

// #tween 回调函数
// 动画开始
tween1.onStart(() => {
    // console.log('动画开始');
})
// 动画结束
tween1.onComplete(() => {
    // console.log('动画结束');
})
// 动画停止
tween1.onStop(() => {
    // console.log('动画停止');
})
// 动画更新
tween1.onUpdate(() => {
    // console.log('动画更新');
})
// #endregion



function animate() {
    tween1.update();//更新动画
    tween2.update();//更新动画
    tween3.update();//更新动画

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();