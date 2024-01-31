import { useContext } from "react";
import { UserContext } from "../../App";

export default function ZodiacSection({ zodiacData }) {
  const { hadInfo } = useContext(UserContext);
  const myZodiac = zodiacData[hadInfo.zodiac];

  return (
    <>
      <li className="todayLuckrow row">
        <p className="m-0 ">{myZodiac.astroLogical}</p>
      </li>
      <li className="todayLuckrow row">
        <p className="m-0">{myZodiac.todayWord}</p>
      </li>
      <li className="todayLuckrow row">
        <p className="col-4 m-0">幸運數字</p>
        <p className="col-8 m-0">{myZodiac.luckyNumber}</p>
      </li>
      <li className="todayLuckrow row">
        <p className="col-4 m-0">幸運顏色</p>
        <p className="col-8 m-0">{myZodiac.luckyColor}</p>
      </li>
    </>
  );
}
