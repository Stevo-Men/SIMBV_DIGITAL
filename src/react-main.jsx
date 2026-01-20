import React from 'react'
import ReactDOM from 'react-dom/client'
import Dither from './components/Dither'

const rootElement = document.getElementById('dither-background')
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Dither
                waveColor={[0.8, 0.5, 0]}
                disableAnimation={false}
                enableMouseInteraction={false}
                mouseRadius={0.3}
                colorNum={24}
                waveAmplitude={0.11}
                waveFrequency={8.7}
                waveSpeed={0.02}
            />
        </React.StrictMode>
    )
}
