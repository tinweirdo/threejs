<script setup>
import { onUnmounted, ref, onMounted } from 'vue';
import CanvasContext from './Canvas/CanvasContext.vue';
import DirectionLight from './Canvas/Light/DirectionLight.vue';
import PointLight from './Canvas/Light/PointLight.vue';
import PointsAroudPalm from './Canvas/Light/PointsAroudPalm.vue';

import RGBE from './Canvas/texture/RGBE.vue';
import Water from './Canvas/Geometry/Water.vue';
import GLTF from './Canvas/Model/GLTF.vue';


onUnmounted(() => {

})

const container = ref()
onMounted(() => {

})

function processorHouse(gltf) {
  const model = gltf.scene;
  // 隐藏模型的水面
  model.traverse((child) => {
    if (child.name === "Plane" || child.name.startsWith('tree')) {
      child.visible = false;
    }
    // 允许物体接收
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    };
  })
}

function processorPalm(gltf) {
  const model = gltf.scene;
  model.traverse((child) => {
    // 允许物体接收阴影
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    };
  })
}

</script>
<template>
  <CanvasContext :position="{ z: -70 }">
    <RGBE url="/textures/Zbyg-Skies_0008_4k.hdr" />
    <DirectionLight :position="{ x: 0, y: 50, z: 0 }" />
    <PointLight :position="{ x: 1, y: 1.5, z: -48 }" />
    <GLTF url="model/冬季湖边小屋.glb" :processor="processorHouse" />
    <GLTF url="model/Palm.glb" :processor="processorPalm" :position="{ x: 5, y: -3, z: -46 }" />
    <PointsAroudPalm />
    <Water />
  </CanvasContext>
</template>

