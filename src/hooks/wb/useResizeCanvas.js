import { useEffect } from 'react'
import { debounce } from '../../services/util.service'

export function useResizeCanvas(containerRef, lowerCanvasRef, upperCanvasRef) {
  function resizeCanvas() {
    if (
      !containerRef?.current ||
      !lowerCanvasRef?.current ||
      !upperCanvasRef?.current
    ) {
      return
    }

    const container = containerRef.current
    const lowerCtx = lowerCanvasRef.current
    const upperCtx = upperCanvasRef.current
    lowerCtx.width = container.offsetWidth
    lowerCtx.height = container.offsetHeight
    upperCtx.width = container.offsetWidth
    upperCtx.height = container.offsetHeight
  }
  const debouncedResize = debounce(resizeCanvas, 200)

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', debouncedResize)

    return () => window.removeEventListener('resize', debouncedResize)
  }, [containerRef, lowerCanvasRef, upperCanvasRef])
}
