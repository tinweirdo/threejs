
// import * as Cube from './cube.js';
// import * as Triangle from './triangle.js';
// import * as Texture from './texture.js';
// import * as Fog from './fog.js';
import * as Fog from './gltf.js';
// 全屏
document.getElementById("fullscreen-btn").onclick = () => {
    // renderer.domElement.requestFullscreen();//画布全屏
    document.body.requestFullscreen();//document 全屏
}
// 退出全屏
document.getElementById("exit-fullscreen-btn").onclick = () => {
    document.exitFullscreen();//画布全屏
}




