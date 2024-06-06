import _ from "lodash";
import { Sprite } from "@pixi/react-animated";

import back from "../../../assets/back.png";
import { useSpring } from "react-spring";

const MovingCardReactSpring = () => {
  const [translation_props] = useSpring(
    () => ({
      from: { x: 0 },
      to: [
        { x: 100, config: { duration: 1000 }, delay: 1000 },
        { x: 200, config: { duration: 1000 }, delay: 1000 },
        { x: 300, config: { duration: 1000 }, delay: 1000 },
        { x: 300, config: { duration: 1000 }, delay: 1000 },
      ],
      //   to: async (next) => {
      //     await next({ x: 100, config: { duration: 3000, easing: (t) => t } });
      //     await next({
      //       x: 200,
      //       config: { duration: 1000, easing: (t) => t },
      //       delay: 2000,
      //     });
      //     await next({
      //       x: 300,
      //       config: { duration: 1000, easing: (t) => t },
      //       delay: 2000,
      //     });
      //   },
      loop: true,
      config: {
        easing: (t) => t,
      },
    }),
    []
  );

  const [rotation_props] = useSpring(
    () => ({
      from: { rotation: 0 },
      to: { rotation: Math.PI * 2 },
      loop: true,
      config: {
        duration: 3000,
        easing: (t) => t, // Linear easing function
      },
    }),
    []
  );

  return (
    <>
      <Sprite
        source={back}
        scale={{
          x: 0.07,
          y: 0.08,
        }}
        {...translation_props}
        y={50}
      />

      <Sprite
        source={back}
        scale={{
          x: 0.07,
          y: 0.08,
        }}
        x={50}
        y={200}
        anchor={{ x: 0.5, y: 0.5 }}
        {...rotation_props}
      />
    </>
  );
};

export default MovingCardReactSpring;
