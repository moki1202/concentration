import { useSpring } from '@react-spring/web'
import { Texture } from '@pixi/core'

interface AnimationProps {
  texture1: Texture
  texture2: Texture
}

const useDiscardPileAnimation = ({ texture1, texture2 }: AnimationProps) => {
  const [spring, api] = useSpring(() => ({
    from: {
      scale: 0.3,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      texture: texture1,
    },
    to: async (next) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await next({
        x: window.innerWidth - 100,
        y: window.innerHeight / 2 - 50,
        scale: 0.2,
        config: { duration: 400 },
        texture: texture1,
      }) // Move up slightly and scale down
      await next({
        x: window.innerWidth,
        y: window.innerHeight / 2,
        scale: 0.3,
        config: { duration: 400 },
        texture: texture2,
      }) // Move right and back to original scale
    },
  }))

  const startAnimation = () => {
    api.start()
  }

  return { spring, startAnimation }
}

export default useDiscardPileAnimation
