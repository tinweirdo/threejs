<script setup>
import { watch } from 'vue';

import * as THREE from 'three';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

const props = defineProps({ position: Object })

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
watch(() => props.position, newPosition => {
    Object.assign(directionalLight.position, newPosition)
})

ctx.scene.add(directionalLight);
</script>