<script setup>
import { watch } from 'vue';
import * as THREE from 'three';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

const props = defineProps({ position: Object })

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.castShadow = true;//允许投射阴影

watch(() => props.position, newPosition => {
    Object.assign(pointLight.position, newPosition)
})

ctx.scene.add(pointLight);
</script>