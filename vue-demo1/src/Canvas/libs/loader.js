import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export const gltf = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig("./draco");
gltf.setDRACOLoader(dracoLoader);