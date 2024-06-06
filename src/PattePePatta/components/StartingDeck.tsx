import { useSprings } from "react-spring";
import { useContext, useState } from "react";
import { Container } from "@pixi/react-animated";
import _ from "lodash";

import constants from "../constants";
import Card from "./Card";
import Button from "./Button";
import GameContext from "../context";

const StartingDeck = () => {
  const [show_start_button, set_show_start_button] = useState(true);

  const { textures, on_game_started, handle_shuffle_main_deck } =
    useContext(GameContext);

  const [springs, api] = useSprings(constants.NUMBER_OF_CARDS, (i) => ({
    texture: textures[constants.CARDS.base],
    x: constants.WIDTH / 2 - i * constants.DIFF_BW_CARDS,
    scale: [constants.SCALE, constants.SCALE],
    y: constants.HEIGHT / 2,
    zIndex: 1000 - i,
    anchor: 0.5,
    angle: 0,
  }));

  const handle_start_game = () => {
    set_show_start_button(false);

    const get_final_config = (
      final_x: number,
      final_y: number,
      delay: number,
      zIndex: number
    ) => {
      return {
        to: [
          {
            x: final_x,
            y: final_y,
            angle: 360,
          },
          {
            zIndex,
          },
        ],
        delay,
        config: {
          duration: 1000,
        },
      };
    };

    api.start((i) => {
      return {
        ...get_final_config(
          constants.WIDTH / 2 -
            Math.floor((52 - i) / 2) * constants.DIFF_BW_CARDS,
          i % 2 === 0 ? constants.BOTTOM_DECK_Y : constants.TOP_DECK_Y,
          i * 200,
          i
        ),
        onRest: () => {
          if (i === constants.NUMBER_OF_CARDS - 1) {
            on_game_started();
          }
        },
      };
    });
  };

  return (
    <>
      {_.map(springs, (value: any, key: number) => {
        return <Card key={`item${key}`} card_props={value} dragging={false} />;
      })}

      <Container x={constants.WIDTH / 2} y={constants.HEIGHT / 2}>
        {show_start_button && (
          <>
            <Button
              on_click={handle_start_game}
              x={0}
              y={100}
              width={100}
              height={30}
              border_radius={10}
              text="Start"
            />
            <Button
              on_click={handle_shuffle_main_deck}
              x={0}
              y={140}
              width={100}
              height={30}
              border_radius={10}
              text="Shuffle"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default StartingDeck;
