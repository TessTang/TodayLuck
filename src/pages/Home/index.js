import { IconContext } from "react-icons";
import { useContext } from "react";

import { UserContext } from "../../App";

import Needinfo from "./Needinfo";
import Hadinfo from "./Hadinfo";

//react icon統一格式
//若無資料就到Needinfo，有資料到Hadinfo

export default function Home() {
  const { hadInfo, sethadInfo } = useContext(UserContext);

  return (
    <IconContext.Provider value={{ size: 20, className: "reactIcon" }}>
      {hadInfo ? (
        <Hadinfo hadInfo={hadInfo} />
      ) : (
        <Needinfo sethadInfo={sethadInfo} />
      )}
    </IconContext.Provider>
  );
}
