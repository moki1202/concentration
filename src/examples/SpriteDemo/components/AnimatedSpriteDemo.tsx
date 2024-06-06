import _ from "lodash";
import { useEffect, useState } from "react";

import back from "../../../assets/back.png";
import front from "../../../assets/front.png";
import { Assets } from "@pixi/assets";
import { useSpring } from "react-spring";
import { Sprite } from "@pixi/react-animated";
import utils from "../../../utils";

const AnimatedSpriteDemoComp = ({ textures }) => {
  const [first_props] = useSpring(
    () => ({
      from: { x: 0, texture: textures[0], xscale: 0.15 },
      to: [
        { x: 100 },
        {
          xscale: 0,
          config: { duration: 500 },
        },
        {
          texture: textures[1],
        },
        {
          xscale: 0.15,
          config: { duration: 500 },
        },
        {
          x: 200,
        },
      ],
      loop: false,
      config: {
        easing: (t) => t,
        duration: 1000,
      },
    }),
    []
  );

  const [second_props, api] = useSpring(() => ({
    from: { x: 100, texture: textures[0] },
  }));

  const handleStart = async () => {
    api.start({
      to: [
        { x: 200, config: { duration: 500 } },
        {
          x: 400,
          config: { duration: 1000 },
        },
      ],
    });
  };

  return (
    <>
      <Sprite
        anchor={0.5}
        y={100}
        angle={180}
        {...first_props}
        scale={first_props.xscale.to((value) => {
          return [value, 0.15];
        })}
      />

      <Sprite
        eventMode={"static"}
        //Docs https://pixijs.com/8.x/guides/components/interaction
        onclick={handleStart}
        anchor={0.5}
        y={300}
        angle={180}
        scale={0.15}
        {...second_props}
      />
    </>
  );
};

const AnimatedSpriteDemo = () => {
  const [textures, setTextures] = useState<any>([]);

  // load textures
  useEffect(() => {
    (async () => {
      const all_textures = await Promise.all([
        Assets.load(back),
        Assets.load(front),
      ]);
      console.log(all_textures);
      setTextures(all_textures);
    })();
  }, []);

  if (_.isEmpty(textures)) {
    return null;
  }

  return <AnimatedSpriteDemoComp textures={textures} />;
};

export default AnimatedSpriteDemo;
