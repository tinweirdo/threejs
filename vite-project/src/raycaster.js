
import * as THREE from 'three';
import { scene, camera, renderer, controls } from './base.js';
import gui from './gui.js';

const group = new THREE.Group();


const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)
group.add(sphere1);

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
)
sphere2.position.x = -4
group.add(sphere2);

const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
        color: 0xffff00
    })
)
sphere3.position.x = 4
group.add(sphere3);

scene.add(group);

// 更改相机位置，能够观察到全部球体
camera.position.x = 0
camera.position.y = 0
camera.position.z = 15

// 创建射线
const raycaster = new THREE.Raycaster();
// 创建鼠标向量
export const mouse = new THREE.Vector2();

let clickSphere;
function onPointerClick(event) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // console.log(event);
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(group.children);

    // 最近穿透的物体
    if (intersects.length > 0) {
        console.log('intersects :>> ', intersects[0]);
        // 不能直接设置，对象是浅拷贝
        // 移开鼠标，恢复颜色
        if (intersects[0].object._isSelect) {
            intersects[0].object.material.color.set(intersects[0].object._originColor);
            intersects[0].object._isSelect = false;
            return;
        }
        intersects[0].object._originColor = intersects[0].object.material.color.getHex();
        intersects[0].object._isSelect = true;
        intersects[0].object.material.color.set(0xffb005);
        clickSphere = intersects[0];
    }
    else if (clickSphere) {
        clickSphere.object.material.color.set(clickSphere.object._originColor);
        clickSphere.object._isSelect = false;
    }
}

window.addEventListener('click', onPointerClick);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();


