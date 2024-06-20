import React, { useEffect, useRef, useState } from 'react'
import * as PIXI from 'pixi.js'
import { useSpring, animated } from '@react-spring/web'

import back from '../assets/back.png'
import front from '../assets/front.png'

const CARD_WIDTH = 100
const CARD_HEIGHT = 150

interface CardProps {
  id: number
  image: string
  position: { x: number; y: number }
  scale: number
  rotate: number
  isPlayer: boolean
  draggable?: boolean
  onRest?: () => void
}

interface AnimatedCardProps extends CardProps {
  onDragStart: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void
  onDragMove: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void
  onDragEnd: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  image,
  position,
  scale,
  rotate,
  onRest,
  draggable,
  onDragStart,
  onDragMove,
  onDragEnd,
  id,
}) => {
  const styles = useSpring({
    to: {
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg)`,
    },
    from: { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
    config: { tension: 200, friction: 20 },
    onRest,
  })

  return (
    <animated.div
      style={{
        ...styles,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        cursor: draggable ? 'grab' : 'default',
        zIndex: draggable ? 1 : 0, // Add zIndex here
      }}
      onMouseDown={draggable ? (e) => onDragStart(e, id) : undefined}
      onMouseMove={draggable ? (e) => onDragMove(e, id) : undefined}
      onMouseUp={draggable ? (e) => onDragEnd(e, id) : undefined}
    />
  )
}

const GinRummy: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const cardsRef = useRef<CardProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [dragTarget, setDragTarget] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const initializePixi = async () => {
      const app = new PIXI.Application()
      await app.init({ background: '#1C1C1C', resizeTo: window })

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.view)
      }
      appRef.current = app

      // Create the card deck
      const deckTexture = PIXI.Texture.from(back)
      const deckSprite = new PIXI.Sprite(deckTexture)
      deckSprite.anchor.set(0.5)
      deckSprite.x = app.renderer.width / 2
      deckSprite.y = app.renderer.height / 2
      app.stage.addChild(deckSprite)

      // Add distribute button
      const button = new PIXI.Text({
        text: 'Distribute',
        style: {
          fontSize: 24,
          fill: 0xffffff,
          align: 'center',
        },
      })
      button.anchor.set(0.5)
      button.x = app.renderer.width / 2
      button.y = app.renderer.height - 50
      button.interactive = true
      button.cursor = 'pointer'
      button.on('pointerdown', distributeCards)
      app.stage.addChild(button)

      // Add cards to state
      const newCards: CardProps[] = []
      for (let i = 0; i < 52; i++) {
        newCards.push({
          id: i,
          image: i < 20 ? (i % 2 === 0 ? front : back) : back, // First 20 cards will alternate between front and back, rest will be back
          position: { x: app.renderer.width / 2, y: app.renderer.height / 2 },
          scale: 1,
          rotate: i % 2 === 0 ? 0 : 180,
          isPlayer: i % 2 === 0,
          draggable: true, // Make all cards draggable
        })
      }
      setCards(newCards)
      cardsRef.current = newCards

      return () => {
        app.destroy(true, true)
      }
    }

    initializePixi()

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, true)
      }
    }
  }, [])
  console.log(cards, 'these are my cards')

  const distributeCards = async () => {
    const app = appRef.current
    if (!app) {
      console.error('App is not initialized')
      return
    }

    console.log('Distribute button clicked') // Debug log
    const delayTime = 200 // Delay between each card distribution
    const padding = 20 // Padding for good looks
    const playerYPosition = app.renderer.height - CARD_HEIGHT - padding
    const opponentYPosition = padding
    const overlap = 60 // Amount of overlap between cards
    const cardSpacing = CARD_WIDTH - overlap // Calculate card spacing for overlap

    for (let i = 0; i < 20; i++) {
      const card = cardsRef.current[i]
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id
            ? {
                ...c,
                position: {
                  x: app.renderer.width / 2 + 300,
                  y: app.renderer.height / 2,
                },
                scale: 1.5,
                rotate: 180,
              }
            : c
        )
      )
      await new Promise((resolve) => setTimeout(resolve, delayTime))

      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id
            ? {
                ...c,
                position: {
                  x: padding + ((i / 2) % 10) * cardSpacing,
                  y: card.isPlayer ? playerYPosition : opponentYPosition,
                },
                scale: 1.5,
                rotate: 0,
              }
            : c
        )
      )
      await new Promise((resolve) => setTimeout(resolve, delayTime))

      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id
            ? {
                ...c,
                scale: 1,
              }
            : c
        )
      )
    }

    handleDistributionComplete()
  }

  const handleDistributionComplete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 2 seconds

    const app = appRef.current
    if (!app) {
      console.error('App is not initialized')
      return
    }

    const newCardId = 20 // This can be the next card in the deck
    setCards((prevCards) =>
      prevCards.map((c, index) =>
        index === newCardId
          ? {
              ...c,
              position: {
                x: app.renderer.width / 2 + 300,
                y: app.renderer.height / 2,
              },
              scale: 1.5,
              rotate: 180,
            }
          : c
      )
    )

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust timing as needed

    setCards((prevCards) =>
      prevCards.map((c, index) =>
        index === newCardId
          ? {
              ...c,
              position: {
                x: app.renderer.width / 2 + 500,
                y: app.renderer.height / 2,
              },
              scale: 1,
              rotate: 0,
              image: front, // Change the image to front when reaching the target
            }
          : c
      )
    )
  }

  const onDragStart = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    console.log('start dragging')
    const target = event.currentTarget as HTMLDivElement
    const rect = target.getBoundingClientRect()
    setDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    target.style.opacity = '0.5'
    target.style.zIndex = '1000' // Increase z-index
    target.style.width = `${CARD_WIDTH * 1.2}px` // Increase size
    target.style.height = `${CARD_HEIGHT * 1.2}px` // Increase size
    setDragTarget(id)
  }

  const onDragEnd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('end dragging')
    const target = event.currentTarget as HTMLDivElement
    target.style.opacity = '1'
    target.style.zIndex = '0' // Reset z-index
    target.style.width = `${CARD_WIDTH}px` // Reset size
    target.style.height = `${CARD_HEIGHT}px` // Reset size
    setDragTarget(null)
  }

  const onDragMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    if (dragTarget === id) {
      requestAnimationFrame(() => {
        const newX = event.clientX - dragOffset.x
        const newY = event.clientY - dragOffset.y
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === id
              ? {
                  ...c,
                  position: { x: newX, y: newY },
                }
              : c
          )
        )
      })
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {cards.map((card) => (
        <AnimatedCard
          key={card.id}
          {...card}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  )
}

export default GinRummy
