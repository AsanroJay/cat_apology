import { useState, useRef, useEffect } from 'react'
import { story, endingAudioCue, startingAudioCue } from './assets/story/storyData'
import honeybee from './assets/music/honeybee.mp3'
import weAreElectric from './assets/music/we-are-electric.mp3'
import './App.css'

const tracks = { honeybee, weAreElectric }
const defaultPlaylist = ['honeybee', 'weAreElectric']

function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(defaultPlaylist[0])
  const audioRef = useRef(null)
  const playlistPosRef = useRef(0)
  const pendingSeekRef = useRef(null)

  const applyCue = (cue) => {
    if (!cue) return
    const audio = audioRef.current
    if (!audio) return

    const isSameTrack = tracks[currentTrack] === tracks[cue.track]

    pendingSeekRef.current = cue.seekTo
    setCurrentTrack(cue.track)

    if (isSameTrack && audio.readyState >= 1) {
      audio.currentTime = cue.seekTo
      audio.play().catch(() => {})
      pendingSeekRef.current = null
    }
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (pendingSeekRef.current !== null && audio) {
      audio.currentTime = pendingSeekRef.current
      audio.play().catch(() => {})
      pendingSeekRef.current = null
    }
  }

  const handleStart = () => {
    applyCue(startingAudioCue)
    setStarted(true)
  }

  const handleAdvance = () => {
    if (fading) return

    if (index >= story.length - 1) {
      setFinished(true)
      return
    }

    setFading(true)
    setTimeout(() => {
      setIndex((i) => i + 1)
      setFading(false)
    }, 500)
  }

  const handleTrackEnded = () => {
    playlistPosRef.current = (playlistPosRef.current + 1) % defaultPlaylist.length
    setCurrentTrack(defaultPlaylist[playlistPosRef.current])
  }

  useEffect(() => {
    if (!started) return
    const cue = finished ? endingAudioCue : story[index]?.audioCue
    if (cue) applyCue(cue)
  }, [index, finished, started])

  const current = started && !finished ? story[index] : null

  return (
    <div className="story-container" onClick={started ? handleAdvance : handleStart}>
      {!started ? (
        <div className="scene">
          <p className="scene-text">tap to begin</p>
        </div>
      ) : finished ? (
        <div className="scene">
          <p className="ending-text">I love you sweetheart!! Wombutt will do his best to be better. MWAAA ❤️❤️
</p>
        </div>
      ) : (
        <div className={`scene ${fading ? 'fade-out' : 'fade-in'}`}>
          <div className={`image-row ${current.images.length > 1 ? 'multi' : ''}`}>
            {current.images.map((img, i) => (
              <img key={i} src={img} alt="" className="scene-image" />
            ))}
          </div>
          <p className="scene-text">{current.text}</p>
        </div>
      )}
      {started && !finished && <div className="click-hint">click to continue</div>}
      <audio
        ref={audioRef}
        src={tracks[currentTrack]}
        onEnded={handleTrackEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
}

export default App