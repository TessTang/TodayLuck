import { useContext } from "react";
import { UserContext } from "../App";

export default function ChangInfobtn({ btnClass }) {
  const { sethadInfo } = useContext(UserContext);
  return (
    <button
      className={`${btnClass} btn btn-danger changeBottom`}
      onClick={() => {
        window.localStorage.removeItem("hadInfo");
        sethadInfo(false);
      }}
    >
      變更設定
    </button>
  );
}
