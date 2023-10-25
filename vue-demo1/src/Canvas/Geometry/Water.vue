<script setup>
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2.js';

import { useContext } from '../hooks/useContext';
const ctx = useContext()

// 创建水面
const waterGeometry = new THREE.CircleGeometry(300, 32);
const water = new Water(waterGeometry, {
  textureWidth: 500,
  textureHeight: 500,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1),//水流方向
  scale: 100,
})
water.rotation.x = - Math.PI / 2;
water.position.y = - 2.8;
ctx.scene.add(water);

</script>