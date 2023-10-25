<script setup>
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as THREE from 'three';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

const props = defineProps({ url: { type: String, required: true } })

const loader = new RGBELoader()


let map;
// 环境贴图，加载 hdr
loader.load(props.url, _map => {
    map = _map;
    // 设置球形映射，否则图片无法跟随视角变化
    map.mapping = THREE.EquirectangularReflectionMapping
    // 背景贴图
    ctx.scene.background = map
    // 场景贴图
    ctx.scene.environment = map
})
</script>