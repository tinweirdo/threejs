import { provide, inject } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const KEY = Symbol()

/**
 * @typedef {Object} CanvasContext
 * @property {THREE.Scene} scene
 * @property {THREE.Renderer} renderer
 * @property {THREE.Camera} camera
 * @property {OrbitControls} contorl
 */

/**
 * 
 * @param {CanvasContext} v 
 * @returns 
 */
export const provideContext = (v) => provide(KEY, v)
/**
 * 
 * @returns {CanvasContext}
 */
export const useContext = () => inject(KEY)
