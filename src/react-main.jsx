import React from 'react'
import ReactDOM from 'react-dom/client'
import VideoBackground from './components/VideoBackground'

const rootElement = document.getElementById('dither-background')
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <VideoBackground />
        </React.StrictMode>
    )
}
