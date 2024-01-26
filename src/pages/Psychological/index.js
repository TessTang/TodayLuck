import { useState } from "react";

import Test from "./Test";
import Result from "./Result";

export default function Psychological() {
  //user selected
  const [userAns, setuserAns] = useState([]);
  //check if donetest => test||result
  const [done, setDone] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center psychoLogical_Outer w-100">
      <p className="btn btn-success fs-sm-4 mb-1 fw-bold">
        菲爾人格測試：測你的內在人格特質
      </p>
      {done ? (
        <Result
          userAns={userAns}
          setuserAns={setuserAns}
          setDone={setDone}
        ></Result>
      ) : (
        <Test
          setDone={setDone}
          userAns={userAns}
          setuserAns={setuserAns}
        ></Test>
      )}
    </div>
  );
}
