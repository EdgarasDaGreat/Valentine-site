import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [nePos, setNePos] = useState({ top: 0, left: 0 })
  const [taipScale, setTaipScale] = useState(1)
  const [noClicks, setNoClicks] = useState(0)
  const [noMessage, setNoMessage] = useState('')
  const containerRef = useRef(null)
  const buttonsAreaRef = useRef(null)
  const neBtnRef = useRef(null)

  useEffect(() => {
    // Center the initial position of the "Ne" button within the buttons area
    centerNeButton()
    // Recalculate on resize to keep button within bounds
    const onResize = () => {
      centerNeButton()
      keepNeInBounds()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const centerNeButton = () => {
    const area = buttonsAreaRef.current
    const ne = neBtnRef.current
    if (!area || !ne) return
    const areaRect = area.getBoundingClientRect()
    const neRect = ne.getBoundingClientRect()
    // Place a bit below vertical center, horizontally centered
    const top = Math.min((areaRect.height / 2) + 40, areaRect.height - neRect.height)
    const left = Math.max(0, (areaRect.width - neRect.width) / 2)
    setNePos({ top, left })
  }

  const keepNeInBounds = () => {
    const area = buttonsAreaRef.current
    const ne = neBtnRef.current
    if (!area || !ne) return
    const areaRect = area.getBoundingClientRect()
    const neRect = ne.getBoundingClientRect()
    const top = Math.min(Math.max(nePos.top, 0), areaRect.height - neRect.height)
    const left = Math.min(Math.max(nePos.left, 0), areaRect.width - neRect.width)
    setNePos({ top, left })
  }

  const onYes = () => {
    setAccepted(true)
  }

  const onNo = () => {
    // Increment click counter and set messages at thresholds
    setNoClicks((prev) => {
      const next = prev + 1
      if (next === 1) setNoMessage('Rimtai?')
      else if (next === 3) setNoMessage('Nu duodi')
      else if (next === 5) setNoMessage('Ne tai gerai skiriames tiesiog')
      else if (next >= 10) setNoMessage('Čia net nebuvo iš tiesų tau pasirinkimo tu ir taip mano žmona haha')
      return next
    })

    // Move "Ne" to a random position within buttons-area bounds (while visible)
    const area = buttonsAreaRef.current
    const ne = neBtnRef.current
    if (area && ne) {
      const areaRect = area.getBoundingClientRect()
      const neRect = ne.getBoundingClientRect()
      const maxTop = Math.max(0, areaRect.height - neRect.height)
      const maxLeft = Math.max(0, areaRect.width - neRect.width)
      const top = Math.random() * maxTop
      const left = Math.random() * maxLeft
      setNePos({ top, left })
    }
    // Make "Taip" a little bigger
    setTaipScale((s) => Math.min(s * 1.12, 3))
  }

  const hideNo = noClicks >= 10

  return (
    <div className="valentines-wrap" ref={containerRef}>
      {/* decorative hearts */}
      <span className="heart h1">❤️</span>
      <span className="heart h2">💖</span>
      <span className="heart h3">💘</span>
      <span className="heart h4">💕</span>
      <span className="heart h5">💝</span>
      <span className="heart h6">❤️</span>
      {!accepted ? (
        <>
          <img
            className="bear-gif"
            src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
            alt="Mielas meškiukas (cute gif)"
          />
          <h1 className="question">Sooooo... Būsi mano Valentinu?</h1>
          <div className="buttons-area" ref={buttonsAreaRef}>
            <button
              className="btn yes"
              style={{ transform: `scale(${taipScale})` }}
              onClick={onYes}
            >
              Taip
            </button>
            {!hideNo && (
              <button
                ref={neBtnRef}
                className="btn no"
                style={{ top: nePos.top, left: nePos.left }}
                onClick={onNo}
              >
                Ne
              </button>
            )}
          </div>
          {noMessage && (
            <p className="no-hint">{noMessage}</p>
          )}
        </>
      ) : (
        <div className="celebrate">
          <h1>Yippeeee 💖</h1>
          <img
            className="bear-gif"
            src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
            alt="Meškutis su širdute (po Taip)"
          />
        </div>
      )}
    </div>
  )
}

export default App
