import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { parentCube, parentMaterial0 } from './base-render.js';
import { triangle } from './triangle.js';

export const evenObj = {
    fullScreen: () => {
        document.body.requestFullscreen();
    },
    exitFullScreen: () => {
        document.exitFullscreen();
    }
}
export const gui = new GUI();
gui.add(evenObj, "fullScreen").name("全屏");
gui.add(evenObj, "exitFullScreen").name("退出全屏");

const folder1 = gui.addFolder("立方体位置");
// gui.add(cube.position, "x", -3, 2).name("立方体 x 轴位置");
folder1.add(parentCube.position, "x").min(0).max(5).step(1).name("立方体 x 轴位置")
    .onChange(val => {
        console.log('val x :>> ', val);
    });
folder1.add(parentCube.position, "y").min(0).max(5).step(1).name("立方体 y 轴位置")
    .onFinishChange(val => {
        console.log('val y end :>> ', val);
    });
folder1.add(parentCube.position, "z").min(0).max(5).step(1).name("立方体 z 轴位置");

// 设置父元素材质为线框模式
gui.add(parentMaterial0, "wireframe").name("父级立方体线框模式");

// 改变 cube 颜色
const cubeParams = { cubeColor: "#ffc71b" }
gui.addColor(cubeParams, "cubeColor")
    .name("父级立方体颜色")
    .onChange(val => {
        parentCube.material.color.set(val);
    })

// #region 以下是测试数据

const folder2 = gui.addFolder("示例测试");

const myObject = {
    myBoolean: true,
    myFunction: function () { },
    myString: 'lil-gui',
    myNumber: 1,
    myProperty: "test"
};

folder2.add(myObject, 'myBoolean');  // Checkbox
folder2.add(myObject, 'myFunction'); // Button
folder2.add(myObject, 'myString');   // Text Field
folder2.add(myObject, 'myNumber');   // Number Field

// // Add sliders to number fields by passing min and max
folder2.add(myObject, 'myNumber', 0, 1);
folder2.add(myObject, 'myNumber', 0, 100, 2); // snap to even numbers

// // Create dropdowns by passing an array or object of named values
folder2.add(myObject, 'myNumber', [0, 1, 2]);
folder2.add(myObject, 'myNumber', { Label1: 0, Label2: 1, Label3: 2 });

// // Chainable methods
folder2.add(myObject, 'myProperty')
    .name('Custom Name')
    .onChange(value => {
        console.log(value);
    });

// Create color pickers for multiple color formats
const colorFormats = {
    string: '#ffffff',
    int: 0xffffff,
    object: { r: 1, g: 1, b: 1 },
    array: [1, 1, 1]
};

folder2.addColor(colorFormats, 'string');
// #endregion