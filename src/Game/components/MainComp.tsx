import _ from 'lodash'
import { useSprings } from 'react-spring'
import { Container, Graphics } from '@pixi/react-animated'
import { TextStyle } from '@pixi/text'
import { Text } from '@pixi/react'

import Card from './Card'

const NUMBER_OF_CARDS = 10

const MainComp = ({ textures }) => {
  const get_final_config = (final_x: number, delay: number, zIndex) => {
    return {
      to: [
        {
          x: 200,
          y: 300,
          config: {
            duration: 1000,
          },
        },
        {
          scale: [0.2, 0.5],
          config: { duration: 200 },
        },
        {
          texture: textures[1],
          zIndex,
          config: { duration: 0 },
        },
        {
          scale: [0.5, 0.5],
          config: { duration: 200 },
        },
        {
          x: final_x,
          y: 400,
          config: {
            duration: 1000,
          },
        },
      ],
      delay,
    }
  }

  const [springs, api] = useSprings(NUMBER_OF_CARDS, (i) => ({
    texture: textures[0],
    x: 100 - 5 * i,
    scale: [0.5, 0.5],
    y: 200 - 5 * i,
    zIndex: NUMBER_OF_CARDS - i,
    anchor: 0.5,
  }))

  const start_animation = () => {
    api.start((i) => {
      return get_final_config(100 + i * 30, i * 700, i)
    })
  }

  return (
    <Container sortableChildren={true}>
      {_.map(springs, (value: any, key: number) => {
        return <Card key={`item${key}`} card_props={value} />
      })}
      <Container
        x={100}
        y={50}
        cursor={'pointer'}
        eventMode={'static'}
        pointertap={start_animation}
      >
        <Graphics
          draw={(g) => {
            g.clear()
            g.beginFill('#EFB79F')
            g.drawRoundedRect(0, 0, 200, 40, 10)
            g.endFill()
          }}
        />
        <Text
          text='Start'
          anchor={0.5}
          y={20}
          x={100}
          style={
            new TextStyle({
              align: 'center',
              fontSize: 20,
              fontWeight: '400',
              stroke: '#01d27e',
              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
      </Container>
    </Container>
  )
}

export default MainComp
