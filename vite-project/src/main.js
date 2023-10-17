
// import * as Cube from './cube.js'; //简单立方体
// import * as Triangle from './triangle.js';//绘制原理
// import * as Texture from './texture.js';//材质
// import * as Fog from './fog.js';//线性雾和指数雾
// import * as Gltf from './gltf.js';//加载外部模型
// import * as RayCaster from './raycaster.js';//光线投射，改变点击球体颜色
// import * as Tween from './tween.js';//补间动画
// import * as DirectionalLight from './directionalLight.js';//基本的平行光
// import * as SpotLight from './spotLight.js';//聚光灯
import * as PointLight from './pointLight.js';//点光源


const root = document.getElementById("app");
const newDiv = document.createElement("div");
newDiv.classList.add("top-menu")
root.appendChild(newDiv);

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");
btn1.id = "fullscreen-btn";
btn1.innerText = "全屏";
btn2.id = "exit-fullscreen-btn";
btn2.innerText = "退出全屏";
newDiv.appendChild(btn1);
newDiv.appendChild(btn2);
// 全屏
document.getElementById("fullscreen-btn").onclick = () => {
    // renderer.domElement.requestFullscreen();//画布全屏
    document.body.requestFullscreen();//document 全屏
}
// 退出全屏
document.getElementById("exit-fullscreen-btn").onclick = () => {
    document.exitFullscreen();//画布全屏
}




