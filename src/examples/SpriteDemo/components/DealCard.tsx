import _ from "lodash";
import { useEffect, useState } from "react";
import { Assets } from "@pixi/assets";
import { useSpring } from "react-spring";
import { Container, Sprite } from "@pixi/react-animated";

import back from "../../../assets/back.png";
import front from "../../../assets/front.png";

const Card = ({ index, textures }) => {
  const padding = index * 10;
  const delay = (4 - index) * 1000;

  const [first_props] = useSpring(
    () => ({
      from: {
        x: 200 + padding,
        texture: textures[0],
        xscale: 0.15,
        zIndex: 0,
      },
      to: [
        {
          x: 400 + padding,
          config: {
            duration: 100,
          },
        },
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
          zIndex: 4 - index,
        },
        {
          x: 600 + padding,
        },
      ],
      delay,
      //   pause: true,
      loop: false,
      immediate: false,
      config: {
        easing: (t) => t,
        duration: 100,
      },
    }),
    []
  );

  return (
    <Sprite
      anchor={0.5}
      // x={100 + 7 * key}
      y={100 + padding}
      // texture={textures[0]}
      // scale={0.1}
      {...first_props}
      scale={first_props.xscale.to((value) => {
        return [value, 0.15];
      })}
    />
  );
};

const DealCardComp = ({ textures }) => {
  return (
    <Container sortableChildren={true}>
      {_.map([1, 1, 1, 1, 1], (value, key) => {
        return <Card key={`item${key}`} index={key} textures={textures} />;
      })}
    </Container>
  );
};

const DealCard = () => {
  const [textures, setTextures] = useState<any>([]);

  // load textures
  useEffect(() => {
    (async () => {
      const all_textures = await Promise.all([
        Assets.load(back),
        Assets.load(front),
      ]);
      setTextures(all_textures);
    })();
  }, []);

  if (_.isEmpty(textures)) {
    return null;
  }

  return <DealCardComp textures={textures} />;
};

export default DealCard;
