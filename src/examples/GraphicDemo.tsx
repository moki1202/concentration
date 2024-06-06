import { Graphics } from "@pixi/react-animated";

const GraphicDemo = () => {
  return (
    <>
      {/* Circle */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill("0xffffff");
          g.drawCircle(0, 0, 50);
          g.endFill();
        }}
        x={100}
        y={100}
      />

      {/* Rectabgle */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill("#EFB79F");
          g.drawRect(200, 50, 100, 100);
          g.endFill();
        }}
      />

      {/* Line */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(5, "#525252");
          g.moveTo(350, 50);
          g.lineTo(450, 150);
        }}
      />

      {/* Ellipse / Oval */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill("#525252");
          g.drawEllipse(600, 100, 100, 60);
          g.endFill();
        }}
      />

      {/* Arc */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(10, "#525252");
          g.arc(100, 300, 50, Math.PI, Math.PI * 2);
        }}
      />
    </>
  );
};

export default GraphicDemo;
