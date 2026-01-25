import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Skull(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/3d_models/exploding_skull.glb')
    const { actions } = useAnimations(animations, group)

    // Load the matcap texture used in the original app.js
    const matcap = useTexture('/images/scratched_metal_bg.jpg')
    matcap.colorSpace = THREE.SRGBColorSpace

    useEffect(() => {
        // Play the first animation clip if available
        if (actions && Object.keys(actions).length > 0) {
            const firstAction = Object.values(actions)[0]
            firstAction.play()
        }
    }, [actions])

    return (
        <group ref={group} {...props} dispose={null}>
            {/* 
        Original transformation from app.js:
        skull.scale.set(0.05, 0.05, 0.05)
        skull.rotateY(0.5)
        skull.rotateX(0.1)
      */}
            <group
                rotation={[0.1, 0.5, 0]}
                scale={0.05}
            >
                {Object.values(nodes).map((node) => {
                    if (node.isMesh) {
                        return (
                            <mesh
                                key={node.uuid}
                                geometry={node.geometry}
                                castShadow
                                receiveShadow
                            >
                                <meshMatcapMaterial matcap={matcap} />
                            </mesh>
                        )
                    }
                    return null
                })}
            </group>
        </group>
    )
}

useGLTF.preload('/3d_models/exploding_skull.glb')
