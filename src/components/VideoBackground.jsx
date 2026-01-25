import React from 'react';

const VideoBackground = () => {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        >
            <source src="/animatesd/GT4/V8.mov" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;
