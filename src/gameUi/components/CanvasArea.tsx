import React, { useEffect, useRef } from 'react'
import { Application, Assets, Container, Sprite, Texture } from 'pixi.js'
import '../styles/canvasArea.css'

import cardBack from '../../assets/back-card.png' // Ensure the correct path to the asset
import { AllCards } from '../data/cardData' // Importing the AllCards array

const CanvasArea: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const pixiAppRef = useRef<Application | null>(null)

  // Define the resize function outside of the useEffect
  const resize = () => {
    const app = pixiAppRef.current
    if (!app) return

    app.renderer.resize(
      canvasRef.current!.clientWidth,
      canvasRef.current!.clientHeight
    )

    // Center the container on the screen
    const container = app.stage.children[0] as Container

    container.x = (canvasRef.current!.clientWidth - container.width) / 2
    container.y = (canvasRef.current!.clientHeight - container.height) / 2
  }

  // Variables to track dragging
  let dragTarget: Sprite | null = null

  const onDragMove = (event: any) => {
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, undefined, dragTarget.position)
    }
  }

  const onDragStart = (event: any) => {
    const card = event.currentTarget as Sprite
    card.alpha = 0.5
    dragTarget = card
    pixiAppRef.current!.stage.on('pointermove', onDragMove)
  }

  const onDragEnd = () => {
    if (dragTarget) {
      pixiAppRef.current!.stage.off('pointermove', onDragMove)
      dragTarget.alpha = 1
      dragTarget = null
    }
  }

  useEffect(() => {
    const initializePixi = async () => {
      // Create a new application
      const app = new Application()
      pixiAppRef.current = app

      // Initialize the application
      await app.init({
        background: '#191919',
        resizeTo: canvasRef.current!, // Use non-null assertion
      })

      // Append the application canvas to the canvasRef div
      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas)
        console.log('Canvas initialized')
      }

      // Create and add a container to the stage
      const container = new Container()
      app.stage.addChild(container)

      // Load all front textures
      const frontTextures = await Promise.all(
        AllCards.map((cardPath) => Assets.load(cardPath))
      )
      console.log('Card front textures loaded:', frontTextures)

      // Define card dimensions relative to screen size
      const cardWidth = app.canvas.width * 0.25

      const cardHeight = cardWidth * 1.4

      // Function to create a card sprite
      const createCard = (texture: Texture, x: number, y: number) => {
        const card = new Sprite(texture)
        card.width = cardWidth
        card.height = cardHeight
        card.x = x
        card.y = y
        card.anchor.set(0.5) // Set anchor to the center of the card
        card.interactive = true

        card
          .on('pointerdown', onDragStart)
          .on('pointerup', onDragEnd)
          .on('pointerupoutside', onDragEnd)
          .on('pointermove', onDragMove)

        return card
      }

      // Create the deck of cards at the center
      const deckX = canvasRef.current!.clientWidth / 2
      const deckY = canvasRef.current!.clientHeight / 2

      frontTextures.forEach((frontTexture) => {
        const card = createCard(frontTexture, deckX, deckY)
        container.addChild(card)
      })

      // Center the container on the screen
      container.x = 0 // Ensure container is at 0,0
      container.y = 0

      // Set up the stage for pointer events
      app.stage.eventMode = 'static'
      app.stage.hitArea = app.screen
      app.stage.on('pointerup', onDragEnd)
      app.stage.on('pointerupoutside', onDragEnd)

      window.addEventListener('resize', resize)

      return app
    }

    const pixiAppPromise = initializePixi()

    return () => {
      pixiAppPromise.then(() => {
        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''
        }
        if (pixiAppRef.current) {
          pixiAppRef.current.destroy(true, {
            children: true,
            texture: true,
          })
        }
      })
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <div className='canvas-area' ref={canvasRef} style={{ flex: 1 }}></div>
}

export default CanvasArea
