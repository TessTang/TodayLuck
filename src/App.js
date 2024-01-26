import { useEffect, useState, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import axiosRetry from "axios-retry";

import CLOUDS from "vanta/dist/vanta.clouds.min";

import "./assets/scss/all.scss";
import Home from "./pages/Home";
import Todayluck from "./pages/Todayluck";
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
          speed: 0.6,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  //haduserinfo state
  const [hadInfo, sethadInfo] = useState(
    JSON.parse(window.localStorage.getItem("hadInfo")),
  );
  //user information context
  const userContextValue = {
    hadInfo,
    sethadInfo,
  };

  //get LUNAR ZODIAC DATA
  const [luckDtatIsLoading, setluckDtatIsLoading] = useState(true);
  const zodiacData = useRef([]);
  const lunarData = useRef([]);

  useEffect(() => {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 15000;
      },
      retryCondition: (error) => {
        if (error.response === undefined) {
          console.log("noo");
        }
        return true;
      },
    });

    axios
      .all([
        axios.get('https://todayluck-nodeinfo.onrender.com/lunar'),
        axios.get('https://todayluck-nodeinfo.onrender.com/zodiac')
      ])
      .then((res) => {
        lunarData.current = res[0].data;
        zodiacData.current = res[1].data;
        setluckDtatIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={userContextValue}>
      <div ref={myRef} className="container-fluid vh-100 p-3">
        <div className="myContainer container-sm rounded-4 bg-warning p-3 bg-opacity-50">
          <h1 className="myLogo logoIndex col-12">中西迷信網</h1>

          <Routes>
            <Route path="/" exact element={<Home></Home>}></Route>
            <Route
              path="/TodayLuck"
              element={
                <Todayluck
                  zodiacData={zodiacData}
                  lunarData={lunarData}
                  luckDtatIsLoading={luckDtatIsLoading}
                ></Todayluck>
              }
            ></Route>
            <Route
              path="/Psychological"
              element={<Psychological></Psychological>}
            ></Route>
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
