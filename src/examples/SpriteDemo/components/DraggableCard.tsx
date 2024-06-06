import _ from "lodash";
import { Sprite } from "@pixi/react-animated";
import * as PIXI from "pixi.js";

const DraggableCard = () => {
  const onDragStart = (event: any) => {
    const sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.dragging = true;
  };

  const onDragEnd = (event) => {
    const sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
  };

  const onDragMove = (event: any) => {
    const sprite = event.currentTarget;
    if (sprite.dragging) {
      sprite.parent.toLocal(event.global, null, sprite.position);
    }
  };

  return (
    <>
      <Sprite
        source={"https://pixijs.io/examples/examples/assets/bunny.png"}
        y={150}
        x={100}
        scale={1}
        cursor={"pointer"}
        anchor={0.5}
        eventMode={"static"}
        onpointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        hitArea={new PIXI.Circle(0, 0, 1250)}
        pointermove={onDragMove}
      />

      {/* <Sprite
        source={back}
        y={150}
        scale={0.1}
        x={200}
        eventMode={"static"}
        pointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        pointermove={onDragMove}
      /> */}
    </>
  );
};

export default DraggableCard;
