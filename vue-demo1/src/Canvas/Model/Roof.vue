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
// 环境贴图，加载 hdr
loader.load(props.url, _gltf => {
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
    ctx.scene.add(model);
})
</script>