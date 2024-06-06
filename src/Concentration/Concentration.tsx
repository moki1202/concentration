import React, { useRef, useEffect, useState } from 'react'
import { Application, Container, Sprite, Assets, Ticker } from 'pixi.js'
import { useNavigate } from 'react-router-dom'
import { cardData } from './data/carData'
import back from '../assets/back.png'
import {
  animate_flip,
  animate_flip_to_back,
  animate_appearance,
} from './animations/animation'
import './style/style.css'
import { constant } from './constant'
import { shuffle_array } from './utils'

const Concentration: React.FC = () => {
  const canvas_ref = useRef<HTMLDivElement>(null)
  const is_animated_ref = useRef<boolean>(false)
  const [cards, set_cards] = useState<{
    first_card: Container | null
    second_card: Container | null
    first_card_id: string | null
    second_card_id: string | null
  }>({
    first_card: null,
    second_card: null,
    first_card_id: null,
    second_card_id: null,
  })
  const [player, set_player] = useState<number>(1)
  const [player_1_score, set_player_1_score] = useState<number>(0)
  const [player_2_score, set_player_2_score] = useState<number>(0)
  const [player_1_cards, set_player_1_cards] = useState<Container[]>([])
  const [player_2_cards, set_player_2_cards] = useState<Container[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const initialize_pixi = async () => {
      const app = new Application()

      await app.init({ background: '#1C1C1C', resizeTo: window })

      if (canvas_ref.current) {
        canvas_ref.current.appendChild(app.canvas)
      }

      app.stage.sortableChildren = true

      const selected_cards = select_random_cards(
        cardData,
        constant.totalCards / 2
      )
      const doubled_cards = [...selected_cards, ...selected_cards]
      const shuffled_cards = shuffle_array(doubled_cards)

      const card_width = constant.cardWidth
      const card_height = constant.cardHeight
      const padding = 10
      const cols = constant.cols
      const rows = Math.ceil(shuffled_cards.length / cols)
      const total_width = cols * (card_width + padding) - padding
      const total_height = rows * (card_height + padding) - padding

      const start_x = (window.innerWidth - total_width) / 2
      const start_y = (window.innerHeight - total_height) / 2

      shuffled_cards.forEach(async (card_data, index) => {
        const { symbol, id } = card_data
        const card = await create_card(symbol, id)
        const target_x =
          start_x + (index % cols) * (card_width + padding) + card_width / 2
        const target_y =
          start_y +
          Math.floor(index / cols) * (card_height + padding) +
          card_height / 2
        card.x = -card_width + 50
        card.y = -card_height + 50
        card.rotation = Math.random() * Math.PI * 2
        card.zIndex = index
        app.stage.addChild(card)

        animate_appearance(card, target_x, target_y)
      })

      return () => {
        app.destroy(true, true)
      }
    }

    initialize_pixi()
  }, [])

  const select_random_cards = (
    data: { symbol: string; id: string }[],
    count: number
  ) => {
    const shuffled = shuffle_array([...data])
    return shuffled.slice(0, count)
  }

  const create_card = async (symbol: string, id: string) => {
    const card = new Container()
    const back_texture = await Assets.load(back)
    const front_texture = await Assets.load(symbol)
    const back_sprite = new Sprite(back_texture)
    const front_sprite = new Sprite(front_texture)

    back_sprite.width = 100
    back_sprite.height = 150
    front_sprite.width = 100
    front_sprite.height = 150
    front_sprite.visible = false

    card.pivot.set(50, 75)
    card.addChild(back_sprite)
    card.addChild(front_sprite)
    card.label = id

    card.eventMode = 'static'
    card.cursor = 'pointer'
    card.on('pointerdown', () => on_card_click(card, front_sprite, back_sprite))

    return card
  }

  const on_card_click = (
    card: Container,
    front_sprite: Sprite,
    back_sprite: Sprite
  ) => {
    if (is_animated_ref.current || (cards.first_card && cards.second_card))
      return

    if (front_sprite.visible) return

    is_animated_ref.current = true
    animate_flip(card, front_sprite, back_sprite, () => {
      set_cards((prev_cards) => {
        if (!prev_cards.first_card) {
          is_animated_ref.current = false
          return {
            ...prev_cards,
            first_card: card,
            first_card_id: card.label,
          }
        } else {
          return {
            ...prev_cards,
            second_card: card,
            second_card_id: card.label,
          }
        }
      })
    })
  }

  useEffect(() => {
    if (cards.first_card && cards.second_card) {
      check_for_match()
    }
  }, [cards])

  useEffect(() => {
    if (player_1_cards.length + player_2_cards.length === constant.totalCards) {
      console.log('game is finished')
      if (player_1_score > player_2_score) {
        navigate('/winner', { state: { winner: 'Player 1' } })
      } else if (player_2_score > player_1_score) {
        navigate('/winner', { state: { winner: 'Player 2' } })
      } else {
        navigate('/winner', { state: { winner: 'Tie' } })
      }
    }
  }, [player_1_cards, player_2_cards, navigate, player_1_score, player_2_score])

  console.log(player_1_cards, 'total cards with player 1')
  console.log(player_2_cards, 'total cards with player 2')

  const check_for_match = () => {
    const { first_card_id, second_card_id } = cards
    if (!first_card_id || !second_card_id) return

    const first_card_type = first_card_id.slice(0, 2)
    const second_card_type = second_card_id.slice(0, 2)

    if (first_card_type === second_card_type) {
      if (player === 1) {
        set_player_1_score((prev_score) => prev_score + 1)
        if (cards.first_card) {
          move_card_to_player(cards.first_card, 1)
        }
        if (cards.second_card) {
          move_card_to_player(cards.second_card, 1)
        }
      } else {
        set_player_2_score((prev_score) => prev_score + 1)
        if (cards.first_card) {
          move_card_to_player(cards.first_card, 2)
        }
        if (cards.second_card) {
          move_card_to_player(cards.second_card, 2)
        }
      }
      setTimeout(() => {
        reset_cards(false)
        is_animated_ref.current = false
      }, 500)
    } else {
      setTimeout(() => {
        const first_card = cards.first_card
        const second_card = cards.second_card

        if (first_card) {
          const first_card_front_sprite = first_card.children.find(
            (child) => child instanceof Sprite && !child.visible
          ) as Sprite
          const first_card_back_sprite = first_card.children.find(
            (child) => child instanceof Sprite && child.visible
          ) as Sprite

          if (first_card_front_sprite) {
            animate_flip(
              first_card,
              first_card_front_sprite,
              first_card_back_sprite,
              () => {
                console.log('First card reset')
              }
            )
          }
        }

        if (second_card) {
          const second_card_front_sprite = second_card.children.find(
            (child) => child instanceof Sprite && !child.visible
          ) as Sprite
          const second_card_back_sprite = second_card.children.find(
            (child) => child instanceof Sprite && child.visible
          ) as Sprite

          if (second_card_front_sprite) {
            animate_flip(
              second_card,
              second_card_front_sprite,
              second_card_back_sprite,
              () => {
                console.log('Second card reset')
              }
            )
          }
        }
        reset_cards(true)
        is_animated_ref.current = false
      }, 1000)
    }
  }

  const reset_cards = (change_player: boolean) => {
    set_cards({
      first_card: null,
      second_card: null,
      first_card_id: null,
      second_card_id: null,
    })
    if (change_player) {
      set_player((prev_player) => (prev_player === 1 ? 2 : 1))
    }
  }

  const move_card_to_player = (card: Container, player: number) => {
    const margin_top = 300
    const target_x = player === 1 ? 100 : window.innerWidth - 100
    const target_y =
      player === 1
        ? margin_top + player_1_cards.length * 20
        : margin_top + player_2_cards.length * 20

    const ticker_instance = new Ticker()
    ticker_instance.add(() => {
      if (card.x !== target_x || card.y !== target_y) {
        card.x += (target_x - card.x) * 0.1
        card.y += (target_y - card.y) * 0.1
        if (
          Math.abs(card.x - target_x) < 1 &&
          Math.abs(card.y - target_y) < 1
        ) {
          card.x = target_x
          card.y = target_y
          ticker_instance.stop()
          card.zIndex =
            player === 1 ? player_1_cards.length : player_2_cards.length
          animate_flip_to_back(card)
          if (player === 1) {
            set_player_1_cards((prev_cards) => [...prev_cards, card])
          } else {
            set_player_2_cards((prev_cards) => [...prev_cards, card])
          }
        }
      }
    })

    ticker_instance.start()
  }

  return (
    <div>
      <div ref={canvas_ref} />
      <div className='scoreboard'>
        <div className={`player-score ${player === 1 ? 'active' : ''}`}>
          <div>Player 1</div>
          <div className='score'>{player_1_score}</div>
        </div>
        <div className={`player-score ${player === 2 ? 'active' : ''}`}>
          <div>Player 2</div>
          <div className='score'>{player_2_score}</div>
        </div>
      </div>
    </div>
  )
}

export default Concentration
