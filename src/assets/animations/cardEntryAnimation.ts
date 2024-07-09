import { Texture } from '@pixi/core'
import { useSprings } from '@react-spring/web'
import { useEffect } from 'react'

const useCardEntryAnimation = (texture1: Texture, texture2: Texture) => {
  const num_cards = 22

  const xOffset = 10 // Slight x-offset for each card

  const rotation_angle = (index: number, angle: number) => {
    if (index <= 20) {
      if (index % 2 === 0) {
        return angle
      }
      return -angle
    }
    return 0
  }

  const card_deck_init_pos: {
    x: number
    y: number
    scaleX: number
    scaleY: number
  } = {
    x: -200,
    y: window.innerHeight / 2 - 150,
    scaleX: 0.25,
    scaleY: 0.25,
  }

  const card_deck_target_pos = {
    x: window.innerWidth / 2 - 50,
    config: { duration: 500 },
  }

  const pre_deal_delay: number = 1000

  const cards_to_deal_at_start = 20

  const discard_anim_mid_card_pos = {
    x: window.innerWidth / 2 + 30,
    y: window.innerHeight / 2 - 170, //slightly above center line
    config: { duration: 200 },
    delay: 1000 + 20 * 200,
  }

  const discardpile_target_pos = {
    rotate: -5,
    x: window.innerWidth / 2 + 100,
    y: window.innerHeight / 2 - 150, // center line
    config: { duration: 200 },
    scaleX: 0.25,
  }

  const [springs, api] = useSprings(num_cards, (index) => ({
    from: {
      rotate: 0,
      x: card_deck_init_pos.x,
      y: card_deck_init_pos.y,
      zIndex: num_cards - index,
      scaleX: card_deck_init_pos.scaleX,
      scaleY: card_deck_init_pos.scaleY,
      texture: texture1, // Ensure texture is assigned here
    },

    to: async (next) => {
      //card deck target position
      await next({
        x: card_deck_target_pos.x,
        config: card_deck_target_pos.config,
        rotate: rotation_angle(index, 5),
      })
      //wait before dealing
      await next({ delay: pre_deal_delay })

      //20 is number of cards to be dealt
      if (index < cards_to_deal_at_start) {
        await next({
          rotate: 0,
          y: window.innerHeight / 2 - (index % 2 === 0 ? 350 : -100),
          x: window.innerWidth / 2 - 100 + index * xOffset,
          config: { duration: 200 },
          delay: index * 200, // Apply delay only here
          zIndex: index % 2 === 0 ? num_cards - index : index,
          texture: texture2, // Change texture here
        })
      } //index 20 card will go to discard pile
      else if (index === 20) {
        await next({
          rotate: 0,
          x: discard_anim_mid_card_pos.x,
          y: discard_anim_mid_card_pos.y, //slightly above center line
          config: discard_anim_mid_card_pos.config,
          zIndex: 0,
          delay: discard_anim_mid_card_pos.delay,
          scaleX: 0,
          texture: texture2, // Change texture here
        })
        //discard pile position
        await next({
          rotate: discardpile_target_pos.rotate,
          x: discardpile_target_pos.x,
          y: discardpile_target_pos.y, // center line
          config: discardpile_target_pos.config,
          zIndex: 0,
          scaleX: discardpile_target_pos.scaleX,
        })
      }
    },
  }))

  useEffect(() => {
    api.start()
  }, [api])

  return springs
}

export default useCardEntryAnimation
