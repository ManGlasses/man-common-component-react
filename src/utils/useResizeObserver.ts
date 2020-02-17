import { useLayoutEffect, useState, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = (ref: React.RefObject<HTMLDivElement>, callback?: (contentRect: object) => void) => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [realWidth, setRealWidth] = useState()
    const [realHeight, setRealHeight] = useState()

    const [isVisibleScrollbarY, setIsVisibleScrollbarY] = useState(false)
    const [isVisibleScrollbarX, setIsVisibleScrollbarX] = useState(false)

    const handleResize = useCallback(
        entries => {
            if (!Array.isArray(entries)) {
                return
            }

            const entry = entries[0]

            setWidth(entry.contentRect.width)
            setHeight(entry.contentRect.height)
            setRealWidth(entry.contentRect.width + (entry.target.offsetWidth - entry.target.clientWidth))
            setRealHeight(entry.contentRect.height + (entry.target.offsetHeight - entry.target.clientHeight))

            setIsVisibleScrollbarY(entry.target.scrollHeight > entry.target.clientHeight)
            setIsVisibleScrollbarX(entry.target.scrollWidth > entry.target.clientWidth)

            if (callback) {
                callback(entry.contentRect)
            }
        },
        [callback],
    )

    useLayoutEffect(() => {
        if (!ref.current) {
            return
        }

        let RO = new ResizeObserver(entries => handleResize(entries))
        RO.observe(ref.current)

        return () => {
            if (ref.current) {
                RO.unobserve(ref.current)
            }
            RO.disconnect()
        }
    }, [ref])

    return { width, height, realWidth, realHeight, isVisibleScrollbarY, isVisibleScrollbarX }
}

export default useResizeObserver
