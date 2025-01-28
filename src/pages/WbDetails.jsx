import { useState, useRef, useEffect } from 'react';
import { wbService } from '../services/wb';
import { useParams } from 'react-router';

import { useResizeCanvas } from '../hooks/wb/useResizeCanvas.js';
import { useZoomCanvas } from '../hooks/wb/useZoomCanvas.js';

import WbToolbar from '../cmps/wb/WbToolbar';
import WbLeftFooter from '../cmps/wb/WbLeftFooter';
import WbRightFooter from '../cmps/wb/WbRightFooter';

import '/src/assets/styles/wb.css'

const WbDetails = () => {

    // Canvas refs
    const canvasContainerRef = useRef(null);
    const lowerCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const lowerCtxRef = useRef(null);
    const upperCtxRef = useRef(null);

    // Editing states
    const [isMouseDown, setIsMouseDown] = useState(false);
    const elementToEdit = useRef(null)
    const [selectedTool, setSelectedTool] = useState(null)

    // Hook to handle resizing canvas when viewport changes
    useResizeCanvas(
        canvasContainerRef,
        lowerCanvasRef,
        upperCanvasRef)

    // Get mouse position
    const getCanvasCoordinates = (ev) => {
        const rect = upperCanvasRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        // const rect = lowerCanvasRef.current.getBoundingClientRect();
        // const x = (ev.clientX - rect.left - offset.x) / zoom;
        // const y = (ev.clientY - rect.top - offset.y) / zoom;
        return { x, y };
    };

    // Hook to handle zooming in and out while following cursor
    const { zoom, offset } = useZoomCanvas(getCanvasCoordinates);

    const wb = useRef(null)
    const { wbId } = useParams()
    console.log('canvas renders');

    // Render canvas after zooming or panning
    useEffect(() => {
        if (wb.current) {
            requestAnimationFrame(() => {
                renderLowerCanvas();
            })
        }
    }, [zoom, offset])

    // Initiation
    useEffect(() => {
        initCanvas();
        selectTool('select')
        loadWb()
    }, []);

    async function loadWb() {
        wb.current = await wbService.getById(wbId)
        renderLowerCanvas()
    }

    function initCanvas() {
        lowerCtxRef.current = lowerCanvasRef.current.getContext('2d');
        upperCtxRef.current = upperCanvasRef.current.getContext('2d');
    }



    // ~~~~~~~~~~~~~~~~~ RENDER FUNCTIONS ~~~~~~~~~~~~~~~~~~

    // Render all static elements on the lower canvas
    function renderLowerCanvas() {
        const lowerCtx = lowerCtxRef.current

        lowerCtx.clearRect(0, 0, lowerCanvasRef.current.width, lowerCanvasRef.current.height)
        lowerCtx.save();
        lowerCtx.scale(zoom, zoom);

        // lowerCtx.translate(offset.x, offset.y);
        lowerCtx.translate(offset.x / zoom, offset.y / zoom);

        wb.current.elements.forEach(renderElement)
        lowerCtxRef.current.restore();

    }

    function renderElement(el) {
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

    // ~~~~~~~~~~~~~~~~~ MOUSE HANDLERS ~~~~~~~~~~~~~~~~~~~~~~

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

    // Explanation - each tool has 3 functions - start | move | end

    function startPen({ x, y }) {

        upperCtxRef.current.beginPath();
        upperCtxRef.current.moveTo(x, y);
        elementToEdit.current.points = [{ x, y }]
    }

    function movePen({ x, y }) {
        upperCtxRef.current.lineTo(x, y)
        upperCtxRef.current.stroke()
        elementToEdit.current.points.push({ x, y })
    }

    function endPen() {

        upperCtxRef.current.closePath();
        elementToEdit.current.points = transformPoints(elementToEdit.current.points)
        wb.current.elements.push(elementToEdit.current)
        elementToEdit.current = wbService.getEmptyElement('pen')
        clearUpperCanvas()
        renderLowerCanvas()
    }

    // Extra function to organize later..........

    const transformPoints = (points) => {
        return points.map((point) => ({
            x: (point.x - offset.x) / zoom,
            y: (point.y - offset.y) / zoom,
        }));
    }

    function selectTool(toolName) {
        elementToEdit.current = wbService.getEmptyElement(toolName)
        setSelectedTool(toolName)
    }




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
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                />
            </section>

            <WbToolbar onSelectTool={selectTool} selectedTool={selectedTool} />
            <WbLeftFooter />
            <WbRightFooter
                onSelectTool={selectTool}
                zoom={zoom}
                selectedTool={selectedTool}
            />
        </main>
    );
};

export default WbDetails;