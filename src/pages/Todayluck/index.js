import { Link } from "react-router-dom";
import Button from "../../components/Button";
import ChangInfobtn from "../../components/ChangInfobtn";
import LunarSection from "./LunarSection";
import ZodiacSection from "./ZodiacSection";

export default function TodayLuck({ zodiacData, lunarData }) {
  const Loadingpage = () => {
    return <div className="loader"></div>;
  };

  return (
    <>
      {/* lunar section */}
      <Link to="/">
        <ChangInfobtn />
      </Link>
      <ul className="fs-md-5 todayLuckOuter container-sm bg-danger bg-opacity-50  p-2">
        {zodiacData.length === 0 ? (
          <Loadingpage />
        ) : (
          <LunarSection lunarData={lunarData}/>
        )}
      </ul>
      <ul className="fs-md-5 todayLuckOuter container-sm bg-primary bg-opacity-10 p-2">
        {lunarData.length === 0 ? (
          <Loadingpage />
        ) : (
          <ZodiacSection zodiacData={zodiacData}/>
        )}
      </ul>
      <Link to="/Psychological" className="col-12">
        <Button buttonText="心理測驗GOGO!" />
      </Link>
    </>
  );
}
