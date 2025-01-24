import React, { useState, useRef, useEffect } from 'react';

const WbDetails = () => {
    const lowerCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useEffect(() => {
        initCanvases();
    }, []);

    function initCanvases() {
        const lowerCanvas = lowerCanvasRef.current;
        const upperCanvas = upperCanvasRef.current;
        const lowerCtx = lowerCanvas.getContext('2d');
        const upperCtx = upperCanvas.getContext('2d');
        setContext(upperCtx);
    }

    function startDrawing(e) {
        setIsDrawing(true);
        context.beginPath();
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }

    function draw(e) {
        if (!isDrawing) return;
        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.stroke();
    }

    function stopDrawing() {
        setIsDrawing(false);
        context.closePath();
    }

    return (
        <div>
            <h1>WbDetailssss</h1>
            <canvas
                className='lower-canvas'
                ref={lowerCanvasRef}
                width={800}
                height={600}
             
            />
            <canvas
                className='upper-canvas'

                ref={upperCanvasRef}
                width={800}
                height={600}
                // style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
};

export default WbDetails;