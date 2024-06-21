import React, { useEffect, useRef } from 'react'
import { Application, Assets, Container, Sprite } from 'pixi.js'
import '../styles/canvasArea.css'
import back from '../../assets/front.png' // Ensure the correct path to the asset

const CanvasArea: React.FC = () => {
  
  const canvasRef = useRef<HTMLDivElement>(null)
  const pixiAppRef = useRef<Application | null>(null)

  // Define the resize function outside of the useEffect
  const resize = () => {
    const app = pixiAppRef.current
    if (!app) return

    app.renderer.resize(window.innerWidth, window.innerHeight)

    // Update card dimensions
    const cardWidth = app.screen.width * 0.1
    const cardHeight = cardWidth * 1.5
    const overlapOffset = cardWidth * 0.4
    const offsetX = app.screen.width * 0.05
    const offsetY = app.screen.height * -0.05 // Negative value to move cards upwards

    const container = app.stage.children[0] as Container

    // Update positions
    container.children.forEach((child, index) => {
      if (child instanceof Sprite) {
        child.width = cardWidth
        child.height = cardHeight
        if (index < 11) {
          // Opponent's row
          child.x =
            (10 - index) * overlapOffset - app.screen.width * 0.2 + offsetX
          child.y = app.screen.height * 0.1 + offsetY // Move cards upwards
        } else if (index === 11) {
          // Draw pile
          child.x =
            app.screen.width / 2 -
            cardWidth -
            cardWidth * 0.7 -
            app.screen.width * 0.2 +
            offsetX
          child.y =
            app.screen.height / 2 - cardHeight / 2 - cardHeight * 1.5 + offsetY // Move cards upwards
        } else if (index === 12) {
          // Discard pile
          child.x =
            app.screen.width / 2 -
            cardWidth * 0.1 -
            app.screen.width * 0.2 +
            offsetX
          child.y =
            app.screen.height / 2 - cardHeight / 2 - cardHeight * 1.5 + offsetY // Move cards upwards
        } else if (index > 12 && index < 18) {
          // Player's first row
          child.x =
            (index - 13) * overlapOffset -
            cardWidth * 0.3 -
            app.screen.width * 0.2 +
            offsetX
          child.y =
            app.screen.height - cardHeight - app.screen.height * 0.3 + offsetY // Move cards upwards
        } else if (index >= 18 && index < 21) {
          // Player's second row
          child.x =
            (index - 18) * overlapOffset +
            cardWidth * 1.6 -
            app.screen.width * 0.2 +
            offsetX
          child.y =
            app.screen.height - cardHeight - app.screen.height * 0.3 + offsetY // Move cards upwards
        } else if (index >= 21) {
          // Player's third row
          child.x =
            (index - 21) * overlapOffset +
            cardWidth * 2.8 -
            app.screen.width * 0.2 +
            offsetX
          child.y =
            app.screen.height - cardHeight - app.screen.height * 0.3 + offsetY // Move cards upwards
        }
      }
    })

    // Center the container on the screen
    container.x = (app.screen.width - container.width) / 2
    container.y = (app.screen.height - container.height) / 2
  }

  useEffect(() => {
    const initializePixi = async () => {
      // Create a new application
      const app = new Application()

      // Store the app reference to use later for cleanup
      pixiAppRef.current = app

      // Initialize the application
      await app.init({ background: '#1c1c1c', resizeTo: window })

      // Append the application canvas to the canvasRef div
      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas)
        console.log('Canvas initialized')
      }

      // Create and add a container to the stage
      const container = new Container()
      app.stage.addChild(container)

      // Load the card texture
      const texture = await Assets.load(back)
      console.log('Card texture loaded:', texture)

      // Define card dimensions relative to screen size
      const cardWidth = app.screen.width * 0.15
      const cardHeight = cardWidth * 1.5
      const overlapOffset = cardWidth * 0.4 // Adjust overlap relative to card width

      // Offset for moving cards to the right and upwards
      const offsetX = app.screen.width * 0.2 // Adjust this value for the desired horizontal shift
      const offsetY = app.screen.height * -0.1 // Negative value for the desired vertical shift

      // Create opponent's row of cards with overlap
      for (let i = 10; i >= 0; i--) {
        const card = new Sprite(texture)
        card.width = cardWidth
        card.height = cardHeight
        card.x = i * overlapOffset - app.screen.width * 0.2 + offsetX // Move cards to the right
        card.y = app.screen.height * 0.1 + offsetY // Move cards upwards
        container.addChild(card)
      }

      // Create draw and discard piles in the center
      const drawPile = new Sprite(texture)
      drawPile.width = cardWidth
      drawPile.height = cardHeight
      drawPile.x =
        app.screen.width / 2 -
        cardWidth -
        cardWidth * 0.7 -
        app.screen.width * 0.25 +
        offsetX // Move to the right
      drawPile.y =
        app.screen.height / 2 - cardHeight / 2 - cardHeight * 1.5 + offsetY // Move cards upwards
      container.addChild(drawPile)

      const discardPile = new Sprite(texture)
      discardPile.width = cardWidth
      discardPile.height = cardHeight
      discardPile.x =
        app.screen.width / 2 -
        cardWidth * 0.1 -
        app.screen.width * 0.2 +
        offsetX // Move to the right
      discardPile.y =
        app.screen.height / 2 - cardHeight / 2 - cardHeight * 1.5 + offsetY // Move cards upwards
      discardPile.rotation = 10 * (Math.PI / 180)
      container.addChild(discardPile)

      // Create player's row of cards
      for (let i = 0; i < 5; i++) {
        const card = new Sprite(texture)
        card.width = cardWidth
        card.height = cardHeight
        card.x =
          i * overlapOffset - cardWidth * 0.3 - app.screen.width * 0.2 + offsetX // Move to the right
        card.y =
          app.screen.height - cardHeight - app.screen.height * 0.4 + offsetY // Move cards upwards
        container.addChild(card)
      }

      for (let i = 0; i < 3; i++) {
        const card = new Sprite(texture)
        card.width = cardWidth
        card.height = cardHeight
        card.x =
          i * overlapOffset + cardWidth * 1.6 - app.screen.width * 0.2 + offsetX // Move to the right
        card.y =
          app.screen.height - cardHeight - app.screen.height * 0.375 + offsetY // Move cards upwards
        container.addChild(card)
      }

      for (let i = 0; i < 3; i++) {
        const card = new Sprite(texture)
        card.width = cardWidth
        card.height = cardHeight
        card.x =
          i * overlapOffset +
          cardWidth * 2.8 -
          app.screen.width * 0.15 +
          offsetX // Move to the right
        card.y =
          app.screen.height - cardHeight - app.screen.height * 0.375 + offsetY // Move cards upwards
        container.addChild(card)
      }

      // Center the container on the screen
      container.x = (app.screen.width - container.width) / 2
      container.y = (app.screen.height - container.height) / 2

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

  return <div className='canvas-area' ref={canvasRef}></div>
}

export default CanvasArea
