import { useEffect, useState } from 'react'
import { Sprite, Container } from '@pixi/react-animated'
import { Texture } from '@pixi/core'
import { Stage } from '@pixi/react'
import { Assets } from '@pixi/assets'
import { animated, to } from '@react-spring/web'

import '../styles/GameArea.css'
import ImageLinks from 'src/assets/images/ImageLinks'
import useCardEntryAnimation from 'src/assets/animations/cardEntryAnimation'

const AnimatedContainer = animated(Container)

const GameArea = () => {
  const [textures, setTextures] = useState<{
    watermark: Texture | null
    background: Texture | null
    card1: Texture | null
    card2: Texture | null
    backcard: Texture | null
  }>({
    watermark: null,
    background: null,
    card1: null,
    card2: null,
    backcard: null,
  })

  useEffect(() => {
    ;(async () => {
      const [
        watermarkTexture,
        backgroundTexture,
        card1Texture,
        card2Texture,
        backcardTexture,
      ] = await Promise.all([
        Assets.load(ImageLinks.gamescreen_images.watermark),
        Assets.load(ImageLinks.gamescreen_images.card_background),
        Assets.load(ImageLinks.all_cards.c1),
        Assets.load(ImageLinks.all_cards.c2),
        Assets.load(ImageLinks.gamescreen_images.back_card),
      ])

      setTextures({
        watermark: watermarkTexture as Texture,
        background: backgroundTexture as Texture,
        card1: card1Texture as Texture,
        card2: card2Texture as Texture,
        backcard: backcardTexture as Texture,
      })
    })()
  }, [])

  // Ensure useCardEntryAnimation is called unconditionally
  const springs = useCardEntryAnimation(
    textures.backcard ?? Texture.EMPTY,
    textures.card1 ?? Texture.EMPTY
  )

  if (!textures.background || !textures.card1 || !textures.backcard) {
    return null
  }

  return (
    <div className='canvas-area'>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1c1c1c }}
      >
        <Container sortableChildren={true}>
          {textures.watermark && (
            <Sprite
              texture={textures.watermark}
              x={60}
              y={window.innerHeight / 2}
              anchor={0.5}
              scale={0.5}
              zIndex={0}
            />
          )}
          {springs.map((spring, index) => (
            <AnimatedContainer
              key={index}
              x={to([spring.x], (x) => x)}
              y={to([spring.y], (y) => y)}
              rotation={to(
                [spring.rotate],
                (rotate) => rotate * (Math.PI / 180)
              )}
              scale={to([spring.scaleX, spring.scaleY], (scaleX, scaleY) => ({
                x: scaleX,
                y: scaleY,
              }))}
              anchor={0.5}
              zIndex={spring.zIndex}
            >
              <Sprite texture={textures.background as Texture} anchor={0.5} />
              <Sprite texture={textures.card1 as Texture} anchor={0.5} />
            </AnimatedContainer>
          ))}
          {textures.watermark && (
            <Sprite
              texture={textures.watermark}
              x={window.innerWidth - 60}
              y={window.innerHeight / 2}
              anchor={0.5}
              scale={{ x: -0.5, y: 0.5 }}
              zIndex={0}
            />
          )}
        </Container>
      </Stage>
    </div>
  )
}

export default GameArea
