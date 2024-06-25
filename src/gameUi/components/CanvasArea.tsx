import React, { useEffect, useRef } from 'react'
import { Application, Assets, Container, Sprite, Texture } from 'pixi.js'
import '../styles/canvasArea.css'

import card_back from '../../assets/back-card.png' // Ensure the correct path to the asset
import { AllCards } from '../data/cardData' // Importing the AllCards array
import watermark_path from '../../assets/watermark.png'

const CanvasArea: React.FC = () => {
  const canvas_ref = useRef<HTMLDivElement>(null)
  const pixi_app_ref = useRef<Application | null>(null)
  const texture_cache = useRef<{ [key: string]: Texture }>({})

  // Define the resize function outside of the useEffect
  const resize = () => {
    const app = pixi_app_ref.current
    if (!app) return

    app.renderer.resize(
      canvas_ref.current!.clientWidth,
      canvas_ref.current!.clientHeight
    )

    // Center the container on the screen
    const container = app.stage.children[0] as Container

    container.x = (canvas_ref.current!.clientWidth - container.width) / 2
    container.y = (canvas_ref.current!.clientHeight - container.height) / 2
  }

  // Variables to track dragging
  let drag_target: Sprite | null = null

  const on_drag_move = (event: any) => {
    if (drag_target) {
      drag_target.parent.toLocal(event.global, undefined, drag_target.position)
    }
  }

  const on_drag_start = (event: any) => {
    const card = event.currentTarget as Sprite
    card.alpha = 0.5
    drag_target = card
    pixi_app_ref.current!.stage.on('pointermove', on_drag_move)
  }

  const on_drag_end = () => {
    if (drag_target) {
      pixi_app_ref.current!.stage.off('pointermove', on_drag_move)
      drag_target.alpha = 1
      drag_target = null
    }
  }

  useEffect(() => {
    const initialize_pixi = async () => {
      // Create a new application
      const app = new Application()
      pixi_app_ref.current = app

      // Initialize the application
      await app.init({
        background: '#191919',
        resizeTo: canvas_ref.current!, // Use non-null assertion
      })

      // Append the application canvas to the canvas_ref div
      if (canvas_ref.current) {
        canvas_ref.current.appendChild(app.canvas)
        console.log('Canvas initialized')
      }

      // Create and add a container to the stage
      const container = new Container()
      app.stage.addChild(container)

      // Load all front textures and cache them
      const front_textures = await Promise.all(
        AllCards.map(async (card_path) => {
          if (!texture_cache.current[card_path]) {
            const texture = await Assets.load(card_path)
            texture_cache.current[card_path] = texture
          }
          return texture_cache.current[card_path]
        })
      )
      console.log('Card front textures loaded:', front_textures)

      //load back_texture
      const back_texture = await Assets.load(card_back)

      //load watermark
      const watermark_texture = await Assets.load(watermark_path)

      // Define card dimensions relative to screen size
      const card_width = app.canvas.width * 0.2
      const card_height = card_width * 1.4

      // Function to create a card sprite
      const create_card = (texture: Texture, x: number, y: number) => {
        const card = new Sprite(texture)
        card.width = card_width
        card.height = card_height
        card.x = x
        card.y = y
        card.anchor.set(0.5) // Set anchor to the center of the card
        card.interactive = true
        card.zIndex = 1

        card
          .on('pointerdown', on_drag_start)
          .on('pointerup', on_drag_end)
          .on('pointerupoutside', on_drag_end)
          .on('pointermove', on_drag_move)

        return card
      }

      // Create the deck of cards at the center
      const deck_x = canvas_ref.current!.clientWidth / 2
      const deck_y = canvas_ref.current!.clientHeight / 2

      front_textures.forEach((front_texture) => {
        const card = create_card(front_texture, deck_x, deck_y)
        container.addChild(card)
      })

      // Center the container on the screen
      container.x = 0 // Ensure container is at 0,0
      container.y = 0

      //create and position the left watermark sprite
      const left_watermark = new Sprite(watermark_texture)
      left_watermark.anchor.set(0.5)
      left_watermark.width = card_width / 1.2 // Adjust size as needed
      left_watermark.height = left_watermark.width // Maintain aspect ratio
      left_watermark.x = canvas_ref.current!.clientWidth / 6 // Adjust position as needed
      left_watermark.y = canvas_ref.current!.clientHeight / 2 // Adjust position as needed
      left_watermark.interactive = false
      left_watermark.scale.x = -0.35 // Mirror horizontally
      left_watermark.zIndex = 0

      container.addChild(left_watermark)

      // Create and position the right watermark sprite
      const right_watermark = new Sprite(watermark_texture)
      right_watermark.anchor.set(0.5)
      right_watermark.width = card_width / 1.2 // Adjust size as needed
      right_watermark.height = right_watermark.width // Maintain aspect ratio
      right_watermark.x = canvas_ref.current!.clientWidth / 1.2 // Adjust position as needed
      right_watermark.y = canvas_ref.current!.clientHeight / 2 // Adjust position as needed
      right_watermark.interactive = false
      right_watermark.zIndex = 0


      container.addChild(right_watermark)

      // Set up the stage for pointer events
      app.stage.eventMode = 'static'
      app.stage.hitArea = app.screen
      app.stage.on('pointerup', on_drag_end)
      app.stage.on('pointerupoutside', on_drag_end)

      window.addEventListener('resize', resize)

      return app
    }

    const pixi_app_promise = initialize_pixi()

    return () => {
      pixi_app_promise.then(() => {
        if (canvas_ref.current) {
          canvas_ref.current.innerHTML = ''
        }
        if (pixi_app_ref.current) {
          pixi_app_ref.current.destroy(true, {
            children: true,
            texture: true,
          })
        }
      })
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <div className='canvas-area' ref={canvas_ref}></div>
}

export default CanvasArea
