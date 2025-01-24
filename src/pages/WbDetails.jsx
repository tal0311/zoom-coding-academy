import React, { useState, useRef, useEffect } from 'react';
import { wbService } from '../services/wb';
import { useParams } from 'react-router';
import WbToolbar from '../cmps/wb/WbToolbar';

const WbDetails = () => {
    const canvasContainerRef = useRef(null);
    const lowerCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const lowerCtxRef = useRef(null);
    const upperCtxRef = useRef(null);

    const isDrawing = useRef(false);
    const elementToEdit = useRef(null)
    const [selectedTool, setSelectedTool] = useState(null)

    const wb = useRef(null)
    const { wbId } = useParams()

    useEffect(() => {
        initCanvas();
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        loadWb()
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    async function loadWb() {
        const returndWb = await wbService.getById(wbId)
        wb.current = returndWb
        console.log("🚀 ~ loadWb ~ wb:", wb)

    }

    function renderLowerCanvas() {
        wb.current.elements.forEach(el => {
            switch (el.type) {
                case 'pen':
                    renderPen(el)
                    break
                // case 'rectangle':
                //     drawRectangle(x, y, clrStroke, clrFill, brush)
                //     break
                // case 'circle':
                //     drawCircle(x, y, clrStroke, clrFill, brush)
                //     break
                // case 'img':
                //     drawImage(x, y, clrStroke, clrFill, brush)
                //     break
                // case 'line':
                //     drawLine(x, y, clrStroke, brush)
                //     break
                default:
                    break
            }

        })
    }



    function renderPen(el) {
        const startingPos = el.points[0]
        upperCtxRef.current.beginPath();
        upperCtxRef.current.moveTo(startingPos.x, startingPos.y);

        el.points.forEach(p => {
            upperCtxRef.current.beginPath();
            upperCtxRef.current.moveTo(p.x, p.y);
        })
        upperCtxRef.current.closePath();
    }

    function onClearCanvas(ctx) {
        ctx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    }

    function resizeCanvas() {
        // console.log(canvasContainerRef);

        lowerCanvasRef.current.width = canvasContainerRef.current.offsetWidth
        lowerCanvasRef.current.height = canvasContainerRef.current.offsetHeight
        upperCanvasRef.current.width = canvasContainerRef.current.offsetWidth
        upperCanvasRef.current.height = canvasContainerRef.current.offsetHeight
    }

    function initCanvas() {


        lowerCtxRef.current = lowerCanvasRef.current.getContext('2d');
        upperCtxRef.current = upperCanvasRef.current.getContext('2d');
    }

    function startDrawing(ev) {
        isDrawing.current = true
        let pos = {
            x: ev.nativeEvent.offsetX,
            y: ev.nativeEvent.offsetY,
        }
        upperCtxRef.current.beginPath();
        upperCtxRef.current.moveTo(pos.x, pos.y);
        // elementToEdit.current.points.push(pos)
        console.log("🚀 ~ startDrawing ~ elementToEdit:", elementToEdit)
    }

    function draw(ev) {
        if (!isDrawing.current) return;
        // upperCtxRef.current.lineTo(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY)
        // upperCtxRef.current.stroke()
        let pos = {
            x: ev.nativeEvent.offsetX,
            y: ev.nativeEvent.offsetY,
        }
        switch (selectedTool) {
            case 'pen':
                drawPen(pos)
                break
            // case 'rectangle':
            //     drawRectangle(x, y, clrStroke, clrFill, brush)
            //     break
            // case 'circle':
            //     drawCircle(x, y, clrStroke, clrFill, brush)
            //     break
            // case 'img':
            //     drawImage(x, y, clrStroke, clrFill, brush)
            //     break
            // case 'line':
            //     drawLine(x, y, clrStroke, brush)
            //     break
            default:
                break
        }
    }

    function drawPen({ x, y }) {
        // upperCtxRef.current.lineTo(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY)
        upperCtxRef.current.lineTo(x, y)
        upperCtxRef.current.stroke()
        elementToEdit.current.points.push({ x, y })

    }

    function selectTool(toolName) {
        console.log("🚀 ~ selectTool ~ toolName:", toolName)
        if (toolName === 'select') elementToEdit.current = null
        const emptyEl = wbService.getEmptyElement(toolName)
        elementToEdit.current = emptyEl
        console.log("🚀 ~ selectTool ~ elementToEdit.current:", elementToEdit.current)
        setSelectedTool(toolName)
    }

    function stopDrawing() {
        if (!isDrawing.current) return;
        console.log('stop drawing');

        isDrawing.current = false
        upperCtxRef.current.closePath();
        wb.current.elements.push(elementToEdit.current)
        if (selectedTool !== 'pen') selectTool('select')
        console.log(wb.current)
        wbService.save(wb.current)
    }
    // if (!wb) return <h1>Loadingggg</h1>
    return (
        <main className='wb-details'>
            <section ref={canvasContainerRef} className='canvas-container'>

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
                // onMouseLeave={stopDrawing}
                />
            </section>
            <WbToolbar onSelectTool={selectTool} />
        </main>
    );
};

export default WbDetails;