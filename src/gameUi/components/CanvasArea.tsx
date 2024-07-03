import { useEffect, useState, useRef } from 'react'
import { Sprite, Container } from '@pixi/react-animated'
import { Texture } from '@pixi/core'
import { Stage } from '@pixi/react'
import { Assets } from '@pixi/assets'

import { PIXI_IMAGE_LINKS } from 'src/assets/images/ImageLinks'

const GameArea = () => {
  const [textures, set_textures] = useState<{ [key: string]: Texture } | null>(
    null
  )
  const canvas_ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const res = await Assets.load(Object.values(PIXI_IMAGE_LINKS))
      set_textures(res)
    })()
  }, [])

  if (!textures) {
    return null
  }

  return (
    <div ref={canvas_ref} style={{ flex: 1 }}>
      {canvas_ref.current && (
        <Stage
          width={canvas_ref.current.clientWidth}
          height={canvas_ref.current.clientHeight}
          options={{ backgroundColor: 0x1c1c1c }}
        >
          <Container sortableChildren={true}>
            <Sprite
              texture={textures[PIXI_IMAGE_LINKS.watermark.alias]}
              x={60}
              y={canvas_ref.current.clientHeight / 2}
              anchor={0.5}
              scale={0.5}
              zIndex={0}
            />
            <Sprite
              texture={textures[PIXI_IMAGE_LINKS.watermark.alias]}
              x={canvas_ref.current.clientWidth - 60}
              y={canvas_ref.current.clientHeight / 2}
              anchor={0.5}
              scale={{ x: -0.5, y: 0.5 }}
              zIndex={0}
            />
          </Container>
        </Stage>
      )}
    </div>
  )
}

export default GameArea
