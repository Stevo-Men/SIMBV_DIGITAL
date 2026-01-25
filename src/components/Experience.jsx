import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Skull from './Skull'

export default function Experience() {
    return (
        <>
            {/* Camera and Controls */}
            <OrbitControls makeDefault enableZoom={false} />

            {/* Lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[500, 500, 500]} intensity={0.5} />

            {/* 3D Content */}
            <Skull />

            {/* Post-processing Effects */}
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.2}
                    mipmapBlur
                    intensity={0.5}
                />
                <Noise opacity={0.1} />
                <Vignette offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    )
}
