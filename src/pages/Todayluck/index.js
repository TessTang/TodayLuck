import { Link } from "react-router-dom";

import Button from "../../components/Button";
import ChangInfobtn from "../../components/ChangInfobtn";
import LunarSection from "./LunarSection";
import ZodiacSection from "./ZodiacSection";

export default function Todayluck({
  zodiacData,
  lunarData,
  luckDtatIsLoading,
}) {
  const Loadingpage = () => {
    return <div className="loader"></div>;
  };

  return (
    <>
      {/* lunar section */}
      <Link to="/">
        <ChangInfobtn btnClass="inTodayLuck"></ChangInfobtn>
      </Link>
      <ul className="fs-md-5 todayLuckOuter container-sm bg-danger bg-opacity-50  p-2">
        {luckDtatIsLoading ? (
          <Loadingpage />
        ) : (
          <LunarSection lunarData={lunarData}></LunarSection>
        )}
      </ul>
      <ul className="fs-md-5 todayLuckOuter container-sm bg-primary bg-opacity-10 p-2">
        {luckDtatIsLoading ? (
          <Loadingpage />
        ) : (
          <ZodiacSection zodiacData={zodiacData}></ZodiacSection>
        )}
      </ul>
      <Link to="/Psychological" className="col-12">
        <Button buttonText="心理測驗GOGO!"></Button>
      </Link>
    </>
  );
}
