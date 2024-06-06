import _ from "lodash";
import { Sprite } from "@pixi/react-animated";
import React, { useEffect } from "react";
import { useTick } from "@pixi/react";

import back from "../../../assets/back.png";

const MovingCard = () => {
  const [should_tick, set_should_tick] = React.useState(false);
  const sprite_ref = React.useRef<any>();
  const sprite_ref_2 = React.useRef<any>();

  useTick((delta) => {
    if (should_tick) {
      if (sprite_ref.current) {
        sprite_ref.current.x += 1;
      }

      if (sprite_ref_2.current) {
        sprite_ref_2.current.rotation += 0.1;
      }
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      set_should_tick(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Sprite
        ref={sprite_ref}
        source={back}
        scale={{
          x: 0.07,
          y: 0.08,
        }}
        x={50}
        y={50}
      />

      <Sprite
        ref={sprite_ref_2}
        source={back}
        scale={{
          x: 0.07,
          y: 0.08,
        }}
        x={50}
        y={200}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      {_.map([1, 1, 1, 1], (v, i) => {
        return (
          <Sprite
            key={`item${i}`}
            source={back}
            scale={{
              x: 0.07,
              y: 0.08,
            }}
            x={200 + i * 5}
            y={200 + i * 5}
          />
        );
      })}

      {_.map([1, 1, 1, 1], (v, i) => {
        return (
          <Sprite
            key={`item2${i}`}
            source={back}
            scale={{
              x: 0.07,
              y: 0.08,
            }}
            x={250 + i * 5}
            y={250 + i * 5}
          />
        );
      })}
    </>
  );
};

export default MovingCard;
