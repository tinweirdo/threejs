<script setup>
import * as THREE from 'three';
import gsap from 'gsap';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

// 创建点光源组，围绕棕榈树
const pointLightGroup = new THREE.Group();
const pointLightArr = [];
pointLightGroup.position.set(-5, -3, -46);
let radius = 3;
for (let i = 0; i < 3; i++) {
    // 创建球体当作灯泡
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 10,
    })

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(
        radius * Math.cos((i * 2 * Math.PI) / 3),
        4 * Math.cos((i * 2 * Math.PI) / 3),
        radius * Math.sin((i * 2 * Math.PI) / 3),
    );

    let pointLight = new THREE.PointLight(0xffffff, 50)
    sphere.add(pointLight);
    pointLightGroup.add(sphere)
    pointLightArr.push(sphere);
}
ctx.scene.add(pointLightGroup);

// 使用补间函数，从 0 到 2PI ，使灯泡旋转
let option = { angle: 0 };
gsap.to(option, {
    angle: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
        pointLightGroup.rotation.y = option.angle;
        for (const [index, sphere] of Object.entries(pointLightArr)) {
            sphere.position.y = Math.cos((index * 2 * Math.PI) + option.angle * 8) + 4
        }
    }
})

</script>