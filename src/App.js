import { useEffect, useState, useRef, createContext, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import CLOUDS from "vanta/dist/vanta.clouds.min";

import "./assets/scss/all.scss";
import Home from "./pages/Home";
import TodayLuck from "./pages/TodayLuck";
import Psychological from "./pages/Psychological";

//user information context
export const UserContext = createContext();

function App() {
  //background cloud
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          sunColor: 0xe18f28,
          sunlightColor: 0xc57629,
          speed: 1,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  //haduserinfo state
  const [hadInfo, setHadInfo] = useState(
    JSON.parse(window.localStorage.getItem("hadInfo")),
  );
  //user information context
  const userContextValue = useMemo(
    () => ({
      hadInfo,
      setHadInfo,
    }),
    [hadInfo],
  );

  //get LUNAR ZODIAC DATA
  const [zodiacData, setZodiacData] = useState([]);
  const [lunarData, setLunarData] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://todayluck-nodeinfo.onrender.com/lunar"),
        axios.get("https://todayluck-nodeinfo.onrender.com/zodiac"),
      ])
      .then((res) => {
        setLunarData(res[0].data);
        setZodiacData(res[1].data);
      })
      .catch((err) => {
        setLunarData("err");
        setZodiacData("err");
      });
  }, []);

  return (
    <UserContext.Provider value={userContextValue}>
      <div ref={myRef} className="container-fluid vh-100 p-3">
        <div className="myContainer container-sm rounded-4 bg-warning p-3 bg-opacity-50">
          <h1 className="myLogo logoIndex col-12">中西迷信網</h1>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Today's_Luck"
              element={
                <TodayLuck
                  zodiacData={zodiacData}
                  lunarData={lunarData}
                ></TodayLuck>
              }
            />
            <Route path="/Psychological" element={<Psychological />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
