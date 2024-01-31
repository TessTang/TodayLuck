import { useContext } from "react";
import { UserContext } from "../App";

export default function ChangInfobtn() {
  const { setHadInfo } = useContext(UserContext);
  return (
    <button
      className="btn btn-danger changeBottom"
      onClick={() => {
        window.localStorage.removeItem("hadInfo");
        setHadInfo(false);
      }}
    >
      變更設定
    </button>
  );
}
