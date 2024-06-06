import { Container, Sprite, Ticker } from 'pixi.js'

export const animate_flip = (
  card: Container,
  frontSprite: Sprite,
  backSprite: Sprite,
  callback?: () => void
) => {
  const ticker = new Ticker()
  let scaleX = 1
  let scaleY = 1
  let scalingDown = true

  ticker.add(() => {
    if (scalingDown) {
      scaleX -= 0.1
      scaleY -= 0.02
      if (scaleX <= 0) {
        scaleX = 0
        backSprite.visible = !backSprite.visible
        frontSprite.visible = !frontSprite.visible
        scalingDown = false
      }
    } else {
      scaleX += 0.1
      scaleY += 0.02
      if (scaleX >= 1) {
        scaleX = 1
        scaleY = 1
        ticker.stop()
        if (callback) callback()
      }
    }
    card.scale.set(scaleX, scaleY)
  })

  ticker.start()
}

export const animate_flip_to_back = (card: Container) => {
  const frontSprite = card.children.find(
    (child) => child instanceof Sprite && !child.visible
  ) as Sprite
  const backSprite = card.children.find(
    (child) => child instanceof Sprite && child.visible
  ) as Sprite

  if (frontSprite && backSprite) {
    animate_flip(card, frontSprite, backSprite)
  }
}

export const animate_appearance = (
  card: Container,
  target_x: number,
  target_y: number
) => {
  const ticker_instance = new Ticker()
  const rotation_direction = Math.random() < 0.5 ? -1 : 1

  ticker_instance.add(() => {
    if (card.x !== target_x || card.y !== target_y) {
      card.x += (target_x - card.x) * 0.05
      card.y += (target_y - card.y) * 0.05
      card.rotation += 0.05 * rotation_direction

      if (Math.abs(card.x - target_x) < 1 && Math.abs(card.y - target_y) < 1) {
        card.x = target_x
        card.y = target_y
        card.rotation = 0
        ticker_instance.stop()
      }
    }
  })

  ticker_instance.start()
}
