<script setup>
import * as THREE from 'three';
import { ref, onMounted, watch } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { provideContext } from './hooks/useContext';

const props = defineProps({ position: Object })

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,//长宽比
    0.1,
    1000
);
Object.assign(camera.position, props.position)
// camera.position.set(-3.23, 200, 4.06);
camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true
});
// 设置色调映射，环境滤镜
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 0.15//默认是 1，亮度曝光程度
renderer.outputEncoding = THREE.sRGBEncoding;//设置非线性色彩
renderer.shadowMap.enabled = true;//允许接收阴影
renderer.physicallyCorrectLights = true;


// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true

watch(() => props.position, newPosition => {
    Object.assign(camera.position, newPosition)
})

provideContext({ scene, camera, renderer, controls })

const ready = ref(false)

/**
 * @type {Ref<HTMLDivElement>}
 */
const container = ref()

onMounted(() => {
    const el = container.value
    const rect = el.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    el.appendChild(renderer.domElement)
    ready.value = true
})

// 使用补间函数
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

</script>

<template>
    <div ref="container">
        <slot v-if="ready" />
    </div>
</template>

<style></style>