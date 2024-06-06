import { Container, Graphics } from "@pixi/react-animated";
import { Text } from "@pixi/react";
import { TextStyle } from "@pixi/text";

const Button = ({
  on_click,
  text,
  text_style = {},
  x,
  y,
  width,
  height,
  border_radius,
  bg_color,
}) => {
  return (
    <Container
      x={x}
      y={y}
      anchor={0.5}
      cursor={"pointer"}
      eventMode={"static"}
      pointertap={on_click}
    >
      <Graphics
        anchor={0.5}
        draw={(g) => {
          g.clear();
          g.beginFill(bg_color || "#EFB79F");
          g.drawRoundedRect(
            -width * 0.5,
            -height * 0.5,
            width,
            height,
            border_radius
          );
          g.endFill();
        }}
      />
      <Text
        text={text}
        anchor={0.5}
        y={0}
        x={0}
        style={
          new TextStyle({
            align: "center",
            fontSize: 20,
            fontWeight: "400",
            stroke: "#01d27e",
            wordWrap: true,
            wordWrapWidth: 440,
            // ...text_style,
          })
        }
      />
    </Container>
  );
};

export default Button;
