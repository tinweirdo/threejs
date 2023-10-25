<script setup>
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

const props = defineProps({ url: { type: String, required: true } })

// 实例化 loader
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig("./draco");
gltfLoader.setDRACOLoader(dracoLoader);

let gltf;
loader.load(props.url, _gltf => {
    gltf = _gltf;
    const model = gltf.scene;
    model.position.set(-5, -3, -46)
    model.traverse((child) => {
        // 允许物体接收阴影
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        };
    })
    ctx.scene.add(model);
})
</script>