import { useEffect, useState } from 'react'

export function useZoomCanvas(getCanvasCoordinates) {

  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  function handleScroll(ev) {
    const zoomFactor = ev.deltaY < 0 ? 1.15 : 1 / 1.15
    const maxZoom = 10
    const minZoom = 0.02
    const mousePos = getCanvasCoordinates(ev)
    const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom * zoomFactor))
    setZoom(newZoom)
    // Adjust offset to zoom toward the mouse position
    const scaleRatio = newZoom / zoom
    // const zoomFactorAdjustment = Math.log(zoom + 1) * 2
    // const zoomFactorAdjustment = Math.pow(zoom, 1.8); // Exponentially adjusts based on zoom
    setOffset((prevOffset) => ({
      x: prevOffset.x - (mousePos.x * scaleRatio - mousePos.x) * zoom * 2,
      y: prevOffset.y - (mousePos.y * scaleRatio - mousePos.y) * zoom * 2,
    }))
    // zoomCanvas(zoomFactor);
  }

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [zoom, offset, getCanvasCoordinates])
  return { zoom, offset, setZoom, setOffset }
}
