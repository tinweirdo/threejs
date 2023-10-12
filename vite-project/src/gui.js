import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

const evenObj = {
    fullScreen: () => {
        document.body.requestFullscreen();
    },
    exitFullScreen: () => {
        document.exitFullscreen();
    }
}
const gui = new GUI();
gui.add(evenObj, "fullScreen").name("全屏");
gui.add(evenObj, "exitFullScreen").name("退出全屏");

export default gui