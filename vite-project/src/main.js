
// import * as Cube from './cube.js'; //简单立方体
// import * as Triangle from './triangle.js';//绘制原理
// import * as Texture from './texture.js';//材质
// import * as Fog from './fog.js';//线性雾和指数雾
// import * as Gltf from './gltf.js';//加载外部模型
// import * as RayCaster from './raycaster.js';//光线投射，改变点击球体颜色
import * as Tween from './tween.js';//补间动画

// 全屏
document.getElementById("fullscreen-btn").onclick = () => {
    // renderer.domElement.requestFullscreen();//画布全屏
    document.body.requestFullscreen();//document 全屏
}
// 退出全屏
document.getElementById("exit-fullscreen-btn").onclick = () => {
    document.exitFullscreen();//画布全屏
}




