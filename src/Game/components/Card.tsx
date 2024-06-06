import { Sprite } from "@pixi/react-animated";
import * as PIXI from "pixi.js";

interface Props {
  card_props: any;
}

const Card = ({ card_props }: Props) => {
  const on_drag_start = (event: any) => {
    const sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.dragging = true;
    sprite.hitArea = new PIXI.Circle(0, 0, 3250);
    // const position = event.data.getLocalPosition(sprite);
    // sprite.x = position.x;
    // sprite.y = position.y;
  };

  const on_drag_end = (event: any) => {
    const sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.hitArea = null;
    sprite.zIndex = 0;
  };

  const on_drag_move = (event: any) => {
    const sprite = event.currentTarget;
    if (sprite.dragging) {
      sprite.zIndex = 100000;
      sprite.parent.toLocal(event.global, null, sprite.position);
    }
  };

  return (
    <Sprite
      x={0}
      y={0}
      scale={0.16}
      anchor={0.5}
      zIndex={0}
      cursor={"pointer"}
      eventMode={"static"}
      onpointerdown={on_drag_start}
      pointerup={on_drag_end}
      pointerupoutside={on_drag_end}
      pointermove={on_drag_move}
      {...card_props}
      //   scale={card_props.scale.to((x, y) => new PIXI.Point(x, y))}
    />
  );
};

export default Card;
