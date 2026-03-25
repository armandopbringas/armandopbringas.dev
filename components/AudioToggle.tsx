import { useEffect, useRef, useState } from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { FaPause } from 'react-icons/fa'

const STREAM_URL = 'https://stream.zeno.fm/0r0xa792kwzuv'

const AudioToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const color = useColorModeValue('ink.700', 'sand.400')
  const activeColor = useColorModeValue('accent.600', 'accent.500')
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(STREAM_URL)
      audio.preload = 'none'
      audioRef.current = audio
    }
    return audioRef.current
  }

  const handleToggle = async () => {
    const audio = getAudio()

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <IconButton
      aria-label={isPlaying ? 'Pause radio stream' : 'Play radio stream'}
      size="sm"
      variant="ghost"
      bg="transparent"
      color={isPlaying ? activeColor : color}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="8px"
      _hover={{ bg: hoverBg }}
      _active={{ bg: hoverBg }}
      icon={isPlaying ? <FaPause /> : <TriangleUpIcon transform="rotate(90deg)" />}
      onClick={handleToggle}
    />
  )
}

export default AudioToggle
