import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [nePos, setNePos] = useState({ top: 0, left: 0 })
  const [taipScale, setTaipScale] = useState(1)
  const containerRef = useRef(null)
  const neBtnRef = useRef(null)

  useEffect(() => {
    // Center the initial position of the "Ne" button below the "Taip" button
    centerNeButton()
    // Recalculate on resize to keep button within bounds
    const onResize = () => keepNeInBounds()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const centerNeButton = () => {
    const wrap = containerRef.current
    const ne = neBtnRef.current
    if (!wrap || !ne) return
    const wrapRect = wrap.getBoundingClientRect()
    const neRect = ne.getBoundingClientRect()
    const top = (wrapRect.height / 2) + 80 // a bit below center
    const left = (wrapRect.width - neRect.width) / 2
    setNePos({ top, left })
  }

  const keepNeInBounds = () => {
    const wrap = containerRef.current
    const ne = neBtnRef.current
    if (!wrap || !ne) return
    const wrapRect = wrap.getBoundingClientRect()
    const neRect = ne.getBoundingClientRect()
    const top = Math.min(Math.max(nePos.top, 0), wrapRect.height - neRect.height)
    const left = Math.min(Math.max(nePos.left, 0), wrapRect.width - neRect.width)
    setNePos({ top, left })
  }

  const onYes = () => {
    setAccepted(true)
  }

  const onNo = () => {
    // Move "Ne" to a random position within container bounds
    const wrap = containerRef.current
    const ne = neBtnRef.current
    if (wrap && ne) {
      const wrapRect = wrap.getBoundingClientRect()
      const neRect = ne.getBoundingClientRect()
      const maxTop = Math.max(0, wrapRect.height - neRect.height)
      const maxLeft = Math.max(0, wrapRect.width - neRect.width)
      const top = Math.random() * maxTop
      const left = Math.random() * maxLeft
      setNePos({ top, left })
    }
    // Make "Taip" a little bigger
    setTaipScale((s) => Math.min(s * 1.12, 3))
  }

  return (
    <div className="valentines-wrap" ref={containerRef}>
      {!accepted ? (
        <>
          <img
            className="bear-gif"
            src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
            alt="Meškutis su širdute"
          />
          <h1 className="question">Ar būsi mano valentinas?</h1>
          <div className="buttons-area">
            <button
              className="btn yes"
              style={{ transform: `scale(${taipScale})` }}
              onClick={onYes}
            >
              Taip
            </button>
            <button
              ref={neBtnRef}
              className="btn no"
              style={{ top: nePos.top, left: nePos.left }}
              onClick={onNo}
            >
              Ne
            </button>
          </div>
        </>
      ) : (
        <div className="celebrate">
          <h1>Yippeee 💖</h1>
        </div>
      )}
    </div>
  )
}

export default App
