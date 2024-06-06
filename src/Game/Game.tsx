import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Assets } from '@pixi/assets'

import back from '../assets/back.png'
import front from '../assets/front.png'
import { Stage } from '@pixi/react'
import MainComp from './components/MainComp'

const config = {
  size: { width: window.innerWidth, height: window.innerHeight },
  stage: { antialias: true, backgroundColor: 0x1099bb },
}

const Game = () => {
  const [textures, setTextures] = useState<any>([])

  // load textures
  useEffect(() => {
    ;(async () => {
      const all_textures = await Promise.all([
        Assets.load(back),
        Assets.load(front),
      ])
      setTextures(all_textures)
    })()
  }, [])

  if (_.isEmpty(textures)) {
    return null
  }

  return (
    <Stage {...config.size} options={config.stage}>
      <MainComp textures={textures} />
    </Stage>
  )
}

export default Game
