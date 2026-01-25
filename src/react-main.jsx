import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import VideoBackground from './components/VideoBackground'
import Experience from './components/Experience'
import SmoothScroll from './components/SmoothScroll'

const rootElement = document.getElementById('dither-background')

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <SmoothScroll>
                {/* 
                  Note: We might want the video fixed in background OUTSIDE scroll wrapper 
                  if we want it to stay static, OR keep it inside if current behavior is preferred.
                  Typically background is fixed. 
                  
                  Current VideoBackground has position: fixed, so it can live anywhere 
                  but better to be outside smooth-scroll content flow if possible, 
                  or just let CSS handle it.
                */}
                <VideoBackground />

                {/* 3D Overlay */}
                <Canvas
                    camera={{ position: [0, 0, 13], fov: 10 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // Allow clicks to pass through to underlying HTML
                        zIndex: 1
                    }}
                    gl={{
                        alpha: true,
                        antialias: false,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: true
                    }}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>

                {/* 
                   We need to move the existing static HTML content INTO React OR 
                   just let Lenis control the body scroll which affects them naturally.
                   Lenis usually works on <body> unless checkWrapper is used.
                   My SmoothScroll component wraps children. 
                   
                   However, `rootElement` is `#dither-background` which is empty.
                   The rest of the site content (nav, main text via HTML) is OUTSIDE this React root.
                   
                   If we want Smooth Scroll on the HTML content, we need to initialize Lenis on <body> (which my component effectively does via window scroll, but the wrapper div approach changes things).
                   
                   Actually, most simpler Lenis setups just run on <body>. 
                   To keep it simple and preserve existing HTML structure without porting ALL HTML to React:
                   I will just mount the 3D + Video here. 
                   AND I will instantiate Lenis purely for the window/body scrolling side-effect, 
                   rendering `null` or just the effects.
                   
                   BUT the user asked to "Integrate Smooth Scrolling".
                   If I wrap ONLY the background in SmoothScroll, it won't scroll the page content.
                   
                   CORRECTION: The React app is mounting into a specific DIV `#dither-background`. 
                   The rest of the HTML is outside. 
                   React cannot wrap the existing HTML unless we move that HTML into React or portal it.
                   
                   BETTER STRATEGY:
                   Use a `SmoothScrollManager` component that just uses `useEffect` to hook Lenis to the window 
                   and doesn't render a DOM wrapper, so it affects the whole page's native scroll.
                */}
            </SmoothScroll>
        </React.StrictMode>
    )
}

