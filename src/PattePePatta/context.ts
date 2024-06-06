import React from "react";

interface Props {
  handle_shuffle_main_deck: any;
  on_game_started: any;
  turn: any;
  handle_shuffle_my_cards: any;
  on_play: any;
  textures: any;
  bottom_deck: any;
  top_deck: any;
}

const GameContext = React.createContext<Props>({} as Props);

export default GameContext;
