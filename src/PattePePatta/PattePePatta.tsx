import _ from "lodash";
import { useEffect, useState } from "react";
import { Assets } from "@pixi/assets";

import { Stage } from "@pixi/react";
import Game from "./Game";
import constants from "./constants";
import img_2C from "../assets/deck/2C.svg";
import img_2D from "../assets/deck/2D.svg";
import img_2H from "../assets/deck/2H.svg";
import img_2S from "../assets/deck/2S.svg";
import img_3C from "../assets/deck/3C.svg";
import img_3D from "../assets/deck/3D.svg";
import img_3H from "../assets/deck/3H.svg";
import img_3S from "../assets/deck/3S.svg";
import img_4C from "../assets/deck/4C.svg";
import img_4D from "../assets/deck/4D.svg";
import img_4H from "../assets/deck/4H.svg";
import img_4S from "../assets/deck/4S.svg";
import img_5C from "../assets/deck/5C.svg";
import img_5D from "../assets/deck/5D.svg";
import img_5H from "../assets/deck/5H.svg";
import img_5S from "../assets/deck/5S.svg";
import img_6C from "../assets/deck/6C.svg";
import img_6D from "../assets/deck/6D.svg";
import img_6H from "../assets/deck/6H.svg";
import img_6S from "../assets/deck/6S.svg";
import img_7C from "../assets/deck/7C.svg";
import img_7D from "../assets/deck/7D.svg";
import img_7H from "../assets/deck/7H.svg";
import img_7S from "../assets/deck/7S.svg";
import img_8C from "../assets/deck/8C.svg";
import img_8D from "../assets/deck/8D.svg";
import img_8H from "../assets/deck/8H.svg";
import img_8S from "../assets/deck/8S.svg";
import img_9C from "../assets/deck/9C.svg";
import img_9D from "../assets/deck/9D.svg";
import img_9H from "../assets/deck/9H.svg";
import img_9S from "../assets/deck/9S.svg";
import img_AC from "../assets/deck/AC.svg";
import img_AD from "../assets/deck/AD.svg";
import img_AH from "../assets/deck/AH.svg";
import img_AS from "../assets/deck/AS.svg";
import img_JC from "../assets/deck/JC.svg";
import img_JD from "../assets/deck/JD.svg";
import img_JH from "../assets/deck/JH.svg";
import img_JS from "../assets/deck/JS.svg";
import img_KC from "../assets/deck/KC.svg";
import img_KD from "../assets/deck/KD.svg";
import img_KH from "../assets/deck/KH.svg";
import img_KS from "../assets/deck/KS.svg";
import img_QC from "../assets/deck/QC.svg";
import img_QD from "../assets/deck/QD.svg";
import img_QH from "../assets/deck/QH.svg";
import img_QS from "../assets/deck/QS.svg";
import img_TC from "../assets/deck/TC.svg";
import img_TD from "../assets/deck/TD.svg";
import img_TH from "../assets/deck/TH.svg";
import img_TS from "../assets/deck/TS.svg";
import img_base from "../assets/deck/base.svg";

const config = {
  size: { width: constants.WIDTH, height: constants.HEIGHT },
  stage: { antialias: true, backgroundColor: 0x1099bb },
};

const PattePePatta = () => {
  const [textures, setTextures] = useState<any>({});

  // load textures
  useEffect(() => {
    (async () => {
      const res = await Assets.load([
        { alias: "2C", src: img_2C },
        { alias: "2D", src: img_2D },
        { alias: "2H", src: img_2H },
        { alias: "2S", src: img_2S },
        { alias: "3C", src: img_3C },
        { alias: "3D", src: img_3D },
        { alias: "3H", src: img_3H },
        { alias: "3S", src: img_3S },
        { alias: "4C", src: img_4C },
        { alias: "4D", src: img_4D },
        { alias: "4H", src: img_4H },
        { alias: "4S", src: img_4S },
        { alias: "5C", src: img_5C },
        { alias: "5D", src: img_5D },
        { alias: "5H", src: img_5H },
        { alias: "5S", src: img_5S },
        { alias: "6C", src: img_6C },
        { alias: "6D", src: img_6D },
        { alias: "6H", src: img_6H },
        { alias: "6S", src: img_6S },
        { alias: "7C", src: img_7C },
        { alias: "7D", src: img_7D },
        { alias: "7H", src: img_7H },
        { alias: "7S", src: img_7S },
        { alias: "8C", src: img_8C },
        { alias: "8D", src: img_8D },
        { alias: "8H", src: img_8H },
        { alias: "8S", src: img_8S },
        { alias: "9C", src: img_9C },
        { alias: "9D", src: img_9D },
        { alias: "9H", src: img_9H },
        { alias: "9S", src: img_9S },
        { alias: "AC", src: img_AC },
        { alias: "AD", src: img_AD },
        { alias: "AH", src: img_AH },
        { alias: "AS", src: img_AS },
        { alias: "JC", src: img_JC },
        { alias: "JD", src: img_JD },
        { alias: "JH", src: img_JH },
        { alias: "JS", src: img_JS },
        { alias: "KC", src: img_KC },
        { alias: "KD", src: img_KD },
        { alias: "KH", src: img_KH },
        { alias: "KS", src: img_KS },
        { alias: "QC", src: img_QC },
        { alias: "QD", src: img_QD },
        { alias: "QH", src: img_QH },
        { alias: "QS", src: img_QS },
        { alias: "TC", src: img_TC },
        { alias: "TD", src: img_TD },
        { alias: "TH", src: img_TH },
        { alias: "TS", src: img_TS },
        { alias: "base", src: img_base },
      ]);

      setTextures(res);
    })();
  }, []);

  if (_.isEmpty(textures)) {
    return null;
  }

  return (
    <div style={{ width: "100%", background: "black" }}>
      <div style={{ margin: "0 auto", width: constants.WIDTH }}>
        <Stage {...config.size} options={config.stage}>
          <Game textures={textures} />
        </Stage>
      </div>
    </div>
  );
};

export default PattePePatta;
