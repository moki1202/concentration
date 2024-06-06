import _ from "lodash";
import { useContext } from "react";

import Card from "./Card";
import GameContext from "../context";
import PlayerButtons from "./PlayerButtons";
import { useSpring } from "react-spring";
import constants from "../constants";

const TopDeckComp = () => {
  const { on_play, top_deck, textures } = useContext(GameContext);

  const get_card_position = (i: number) => {
    return {
      texture: textures[constants.CARDS.base],
      x: constants.WIDTH / 2 - i * constants.DIFF_BW_CARDS,
      scale: [constants.SCALE, constants.SCALE],
      y: constants.TOP_DECK_Y,
      zIndex: 1000 - i,
      anchor: 0.5,
    };
  };

  const [props, api] = useSpring(get_card_position(0), []);

  const handle_play = () => {
    on_play();
  };

  return (
    <>
      {_.map(top_deck, (value: any, key: number) => {
        return (
          <Card
            key={`item${key}`}
            card_props={key === 0 ? props : get_card_position(key)}
            dragging={false}
          />
        );
      })}
      <PlayerButtons handle_play={handle_play} />
    </>
  );
};

export default TopDeckComp;
