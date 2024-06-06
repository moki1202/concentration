import { Container } from "@pixi/react-animated";

import useGame from "./useGame";
import StartingDeck from "./components/StartingDeck";
import GameContext from "./context";
import { useContext } from "react";
import BottomDeckComp from "./components/BottomDeckComp";
import TopDeckComp from "./components/TopDeckComp";

const GameComp = () => {
  const { turn } = useContext(GameContext);

  return (
    <Container sortableChildren={true}>
      {!turn && <StartingDeck />}

      <BottomDeckComp />
      <TopDeckComp />
    </Container>
  );
};

const Game = ({ textures }) => {
  const value = useGame({ textures });

  return (
    <GameContext.Provider value={value}>
      <GameComp />
    </GameContext.Provider>
  );
};

export default Game;
