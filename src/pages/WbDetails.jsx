import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { wbService } from '../services/wb';
import { useParams } from 'react-router';
import WbToolbar from '../cmps/wb/WbToolbar';
import WbLeftFooter from '../cmps/wb/WbLeftFooter';
import WbRightFooter from '../cmps/wb/WbRightFooter';
import '/src/assets/styles/wb.css'
import { useResizeCanvas } from '../hooks/wb/useResizeCanvas';


const WbDetails = () => {
    const canvasContainerRef = useRef(null);
    const lowerCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const lowerCtxRef = useRef(null);
    const upperCtxRef = useRef(null);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const isDrawing = useRef(false);
    // const zoom = useRef(1);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    // const [elementToEdit, setElementToEdit] = useState(null)
    const elementToEdit = useRef(null)
    const [selectedTool, setSelectedTool] = useState(null)

    useResizeCanvas(
        canvasContainerRef,
        lowerCanvasRef,
        upperCanvasRef)

    const wb = useRef(null)
    const { wbId } = useParams()
    console.log('canvas renders');

    const getCanvasCoordinates = (ev) => {
        // const rect = lowerCanvasRef.current.getBoundingClientRect();
        // const x = (ev.clientX - rect.left - offset.x) / zoom;
        // const y = (ev.clientY - rect.top - offset.y) / zoom;
        const rect = upperCanvasRef.current.getBoundingClientRect();

        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        return { x, y };
    };

    useEffect(() => {
        if (wb.current) {

            requestAnimationFrame(() => {
                renderLowerCanvas();
            });
        }
        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        }
    }, [zoom, offset])

    useEffect(() => {
        function drawGrid(ctx) {
            ctx.save();
            ctx.strokeStyle = "#ddd";
            for (let x = -5000; x < 5000; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, -5000);
                ctx.lineTo(x, 5000);
                ctx.stroke();
            }
            for (let y = -5000; y < 5000; y += 50) {
                ctx.beginPath();
                ctx.moveTo(-5000, y);
                ctx.lineTo(5000, y);
                ctx.stroke();
            }
            ctx.restore();
        }

        initCanvas();
        resizeCanvas()
        // drawGrid(lowerCtxRef.current);
        selectTool('select')

        // window.addEventListener('resize', resizeCanvas)

        loadWb()
        // return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    function handleScroll(ev) {
        const zoomFactor = ev.deltaY < 0 ? 1.15 : 1 / 1.15;
        const maxZoom = 10
        const minZoom = 0.02
        const mousePos = getCanvasCoordinates(ev);
        const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom * zoomFactor))
        setZoom(newZoom)
        // Adjust offset to zoom toward the mouse position
        const scaleRatio = newZoom / zoom;
        // const zoomFactorAdjustment = Math.log(zoom + 1) * 2
        // const zoomFactorAdjustment = Math.pow(zoom, 1.8); // Exponentially adjusts based on zoom
        setOffset(prevOffset=>({
            x: prevOffset.x - (mousePos.x * scaleRatio - mousePos.x)*zoom*2,
            y: prevOffset.y - (mousePos.y * scaleRatio - mousePos.y)*zoom*2,
        }));
        // zoomCanvas(zoomFactor);
    }

    // useEffect(() => {
    //     if (!wb.current) return
    //     requestAnimationFrame(() => {
    //         renderLowerCanvas();
    //     });
    // }, [zoom]);

    async function loadWb() {
        wb.current = await wbService.getById(wbId)
        renderLowerCanvas()
    }


    function resizeCanvas() {
        lowerCanvasRef.current.width = canvasContainerRef.current.offsetWidth
        lowerCanvasRef.current.height = canvasContainerRef.current.offsetHeight
        upperCanvasRef.current.width = canvasContainerRef.current.offsetWidth
        upperCanvasRef.current.height = canvasContainerRef.current.offsetHeight
    }

    function initCanvas() {
        lowerCtxRef.current = lowerCanvasRef.current.getContext('2d');
        upperCtxRef.current = upperCanvasRef.current.getContext('2d');
    }

    function renderLowerCanvas() {
        const lowerCtx = lowerCtxRef.current

        lowerCtx.clearRect(0, 0, lowerCanvasRef.current.width, lowerCanvasRef.current.height)
        lowerCtx.save();
        lowerCtx.scale(zoom, zoom);

        // lowerCtxRef.current.setTransform(1, 0, 0, 1, 0, 0);
        // lowerCtx.translate(offset.x, offset.y);
        lowerCtx.translate(offset.x / zoom, offset.y / zoom);


        wb.current.elements.forEach(renderElement)
        lowerCtxRef.current.restore();

    }

    function renderElement(el) {
        console.log("🚀 ~ renderElement ~ el:", el)
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

    }



    function renderPen(el) {
        // console.log("🚀 ~ renderPen ~ el:", el)
        // const startingPos = el.points[0]

        el.points.forEach((p, idx) => {
            if (idx === 0) {
                lowerCtxRef.current.beginPath();
                lowerCtxRef.current.moveTo(p.x, p.y);

            } else {

                lowerCtxRef.current.lineTo(p.x, p.y)
                lowerCtxRef.current.stroke()
            }
        })
        lowerCtxRef.current.closePath();
    }

    function clearUpperCanvas() {
        upperCtxRef.current.clearRect(0, 0, upperCanvasRef.current.width, upperCanvasRef.current.height)
    }



    function startPen({ x, y }) {
        // isDrawing.current = true

        upperCtxRef.current.beginPath();
        upperCtxRef.current.moveTo(x, y);
        elementToEdit.current.points = [{ x, y }]
        // elementToEdit.current.points.push({ x, y })
    }



    function movePen({ x, y }) {
        // upperCtxRef.current.lineTo(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY)
        upperCtxRef.current.lineTo(x, y)
        upperCtxRef.current.stroke()
        elementToEdit.current.points.push({ x, y })

        // setElementToEdit(prevEl => {
        //     return { ...prevEl, points: [...prevEl.points, { x, y }] }
        // })
        // elementToEdit.current.points.push({ x, y })

    }
    function endPen() {

        upperCtxRef.current.closePath();
        console.log('zoom', zoom);
        console.log('offset', offset);
        console.log(elementToEdit.current.points[0].x)
        console.log(elementToEdit.current.points[0].y)
        console.log(elementToEdit.current.points[0].x * zoom + offset.x)
        console.log(elementToEdit.current.points[0].y * zoom + offset.y)

        // const transformedEl = {
        //     ...currentShape,
        //     points: transformPoints(currentShape.points),
        // };
        // const transformedPoints = elementToEdit.current.points.map((point) => ({
        //     x: point.x * zoom + offset.x,
        //     y: point.y * zoom + offset.y,
        // }));
        elementToEdit.current.points = transformPoints(elementToEdit.current.points)
        wb.current.elements.push(elementToEdit.current)
        elementToEdit.current = wbService.getEmptyElement('pen')
        clearUpperCanvas()
        renderLowerCanvas()

    }
    const transformPoints = (points) => {
        return points.map((point) => ({
            x: (point.x - offset.x) / zoom,
            y: (point.y - offset.y) / zoom,
        }));
    };

    function selectTool(toolName) {
        elementToEdit.current = wbService.getEmptyElement(toolName)
        setSelectedTool(toolName)
    }



    function handleMouseDown(ev) {
        setIsMouseDown(true)
        const coords = getCanvasCoordinates(ev)
        switch (selectedTool) {
            case 'pen':
                startPen(coords)
                break

            default:
                break
        }
        wbService.save(wb.current)


    }
    function handleMouseMove(ev) {
        if (!isMouseDown) return;
        const coords = getCanvasCoordinates(ev)
        switch (selectedTool) {
            case 'pen':
                movePen(coords)
                break

            default:
                break
        }

    }
    function handleMouseUp() {
        setIsMouseDown(false)
        switch (selectedTool) {
            case 'pen':
                endPen()
                break

            default:
                break
        }

    }
    // if (!wb) return <h1>Loadingggg</h1>
    return (
        <main className='wb-details'>
            <section ref={canvasContainerRef} className='canvas-container'>

                <canvas
                    // style={{ transform: `scale( ${zoom})` }}
                    className='lower-canvas'
                    ref={lowerCanvasRef}
                    width={800}
                    height={600}

                />
                <canvas
                    className='upper-canvas'

                    ref={upperCanvasRef}
                    // style={{ transform: `scale( ${zoom})` }}
                    width={800}
                    height={600}
                    // style={{ border: '1px solid black' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                // onMouseDown={startDrawing}
                // onMouseMove={draw}
                // onMouseUp={stopDrawing}
                // onMouseLeave={stopDrawing}
                />
            </section>
            <WbToolbar onSelectTool={selectTool} />
            <WbLeftFooter />
            <WbRightFooter onSelectTool={selectTool} zoom={zoom} />
        </main>
    );
};

export default WbDetails;