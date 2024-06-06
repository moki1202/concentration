import { useContext } from "react";
import GameContext from "../context";
import constants from "../constants";
import Button from "./Button";

const PlayerButtons = ({ handle_play }) => {
  const { handle_shuffle_my_cards, turn } = useContext(GameContext);

  return (
    <>
      {turn && (
        <>
          <Button
            on_click={handle_play}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 100 : 50}
            width={80}
            height={30}
            border_radius={10}
            text="Play"
          />
          <Button
            on_click={handle_shuffle_my_cards}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 50 : 100}
            width={80}
            height={30}
            border_radius={10}
            text="Shuffle"
          />
        </>
      )}
    </>
  );
};

export default PlayerButtons;
