import _ from "lodash";
import { useState } from "react";

import constants from "./constants";

const useGame = ({ textures }) => {
  const [turn, set_turn] = useState<string | null>(null);
  const [main_deck, set_main_deck] = useState(
    _.filter(constants.CARDS, (card) => card !== constants.CARDS.base)
  );

  const [top_deck, set_top_deck] = useState<string[]>([]);
  const [bottom_deck, set_bottom_deck] = useState<string[]>([]);

  const handle_shuffle_main_deck = () => {
    const _main_deck = _.cloneDeep(main_deck);
    set_main_deck(_.shuffle(_main_deck));
  };

  const handle_shuffle_my_cards = () => {
    const _deck = _.cloneDeep(
      turn === constants.BOTTOM_PLAYER ? bottom_deck : top_deck
    );

    if (turn === constants.BOTTOM_PLAYER) {
      set_bottom_deck(_.shuffle(_deck));
    } else {
      set_top_deck(_.shuffle(_deck));
    }
  };

  const on_game_started = () => {
    const temp_bottom_deck: string[] = [];
    const temp_top_deck: string[] = [];

    _.map(main_deck, (card, key) => {
      if (key % 2 === 0) {
        temp_bottom_deck.push(card);
      } else {
        temp_top_deck.push(card);
      }
    });

    set_bottom_deck(_.reverse(temp_bottom_deck));
    set_top_deck(_.reverse(temp_top_deck));
    set_turn(constants.BOTTOM_PLAYER);
  };

  const on_play = () => {
    set_turn(
      turn === constants.BOTTOM_PLAYER
        ? constants.TOP_PLAYER
        : constants.BOTTOM_PLAYER
    );
  };

  return {
    handle_shuffle_main_deck,
    on_game_started,
    turn,
    handle_shuffle_my_cards,
    on_play,
    textures,
    bottom_deck,
    top_deck,
  };
};

export default useGame;
