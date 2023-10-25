<script setup>
import { watch } from 'vue';
import * as loader from '../libs/loader';
import { useContext } from '../hooks/useContext';
const ctx = useContext()

const props = defineProps(
    {
        url: { type: String, required: true },
        position: { type: Object, required: false },
        processor: { type: Function, required: false }
    }
)

let gltf;

let latestInit = Number.MIN_SAFE_INTEGER;
const init = () => {
    if (gltf) {
        ctx.scene.remove(gltf);
    }
    const currentInit = ++latestInit;
    loader.gltf.load(props.url, _gltf => {
        if (currentInit !== latestInit) {
            return
        } 
        if (props.processor) {
            props.processor(_gltf)
        }
        gltf = _gltf
        ctx.scene.add(gltf.scene)
        update()
    })
}
const update = () => {
    Object.assign(gltf.scene.position, props.position)
}

watch(props, (newValue, oldValue) => {
    if (newValue.url !== oldValue?.url || !gltf) {
        init()
        return
    }
    update()
}, { immediate: true})

</script>