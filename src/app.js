import './stylesheets/style.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// --- Camera
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(13)

// --- Scene
const scene = new THREE.Scene()

// --- Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('container3D').appendChild(renderer.domElement)

// --- Lights (inutile avec MeshMatcapMaterial, tu peux les retirer)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const topLight = new THREE.DirectionalLight(0xffffff, 0.5)
topLight.position.set(500, 500, 500)
scene.add(ambientLight, topLight)

// --- Loaders
const loader = new GLTFLoader()
const texLoader = new THREE.TextureLoader()

// ⚠️ Utilise un vrai fichier MatCap (ex: /textures/matcap_silver.png)
const matcap = texLoader.load('/images/scratched_metal_bg.jpg', (t) => {
    // recommandé pour les textures couleur
    t.colorSpace = THREE.SRGBColorSpace
})
matcap.flipY = false // bon réflexe avec du contenu glTF

let skull
let mixer

loader.load(
    '/3d_models/exploding_skull.glb',
    (gltf) => {
        skull = gltf.scene
        skull.scale.set(0.05, 0.05, 0.05)
        skull.rotateY(0.5)
        skull.rotateX(0.1)

        // Remplace les matériaux par un Matcap
        skull.traverse((obj) => {
            if (obj.isMesh) {
                obj.material = new THREE.MeshMatcapMaterial({ matcap })
                obj.material.needsUpdate = true
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })

        scene.add(skull)

        // Animations glTF
        mixer = new THREE.AnimationMixer(skull)
        if (gltf.animations && gltf.animations.length) {
            mixer.clipAction(gltf.animations[0]).play()
            mixer.update(0.02)
        }
    },
    undefined,
    (err) => {
        console.error('GLB load error:', err)
    }
)

// --- Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// --- Loop
const tick = () => {
    requestAnimationFrame(tick)
    if (mixer) mixer.update(0.008)
    renderer.render(scene, camera)
}
tick()


