import React, { useState, useRef, useEffect } from 'react';

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useEffect(() => {
        initCanvas();
    }, []);

    function initCanvas() {
        console.log(canvasRef);
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setContext(ctx);
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
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
};

export default Whiteboard;