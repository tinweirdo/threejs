<script setup>
import { onUnmounted, ref, onMounted } from 'vue';
import CanvasContext from './Canvas/CanvasContext.vue';
import directionLight from './Canvas/Light/directionLight.vue';
import pointLight from './Canvas/Light/pointLight.vue';
import RGBE from './Canvas/texture/RGBE.vue';


onUnmounted(() => {

})

const container = ref()
onMounted(() => {

})

</script>
<template>
  <div ref="container" id="container"></div>
  <CanvasContext :position="{ z: -70 }">
    <!-- <RGBE url="/textures/Zbyg-Skies_0008_4k.hdr" />
    <directionLight :position="{ x: 0, y: 50, z: 0 }" />
    <pointLight :position="{ x: 1, y: 1.5, z: -48 }" /> -->
  </CanvasContext>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#container {
  width: 100vw;
  height: 100vh;
}

#container canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
