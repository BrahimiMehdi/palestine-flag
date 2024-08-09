import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import flagVertexShader from './shaders/flag/vertex.glsl'
import flagFragmentShader from './shaders/flag/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()
let wireFrame = false;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.BoxGeometry(0.1, 1, 0.6, 1,20,20,20)
let uTime;
// Material
const material = new THREE.ShaderMaterial({
    vertexShader: flagVertexShader,
    fragmentShader: flagFragmentShader,
    wireframe:wireFrame,  
    uniforms:{
        uTime:{
            value:0
        },
        uElevation: { value: 0.05 },
        uFrequency: { value: new THREE.Vector2(2.5, 1.5) },
        uWavesSpeed:{value:3}
    }  
})
gui.add({wireFrame:wireFrame},"wireFrame").onChange((v)=>{
    material.wireframe=v;
})
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(10).step(0.001).name('uFrequencyX')
gui.add(material.uniforms.uWavesSpeed, 'value').min(0.2).max(10).step(0.001).name('Wave speed')
gui.add(material.uniforms.uElevation, 'value').min(0.001).max(1).step(0.001).name('Elevation')
// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateY(30)
mesh.rotateZ(20)
mesh.rotateX(30)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25,  0.25, 1)
scene.background = new THREE.Color("#3b3b3b")
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true,
    
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Update controls
    controls.update()
    const elapsedTime = clock.getElapsedTime()

    // Water
    material.uniforms.uTime.value = elapsedTime
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()