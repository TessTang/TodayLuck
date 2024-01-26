import { Link } from "react-router-dom";

import Button from "../../components/Button";
import testResults from "./assets/testResults";

export default function Result({ userAns, setDone, setuserAns }) {
  //將分數陣列加總
  const userScore = userAns
    .map((val) => {
      return parseInt(val);
    })
    .reduce((a, b) => {
      return a + b;
    });

  //找大於的分數，若高於60就是最後一個
  const userResult =
    testResults.filter((val) => {
      return val.total >= userScore;
    })[0] || testResults[testResults.length - 1];

  //重新測驗=>重置分數資料
  //回今日運勢=>跳回頁面
  //retest button
  const resetAns = () => {
    setDone(false);
    setuserAns([]);
  };

  return (
    <>
      <span className="fs-sm-4 d-block">- 結果 -</span>
      <p className="fs-sm-4">{userResult.title}</p>
      <div className="myCenter bg-danger bg-opacity-50 py-5 px-3 rounded-3 psycholAns fs-sm-4 mb-4">
        {userResult.content}
      </div>
      <Button onClick={resetAns} buttonText="重新測驗"></Button>

      <Link to="/TodayLuck" className="col-12">
        <Button buttonText="回今日運勢頁面"> </Button>
      </Link>
    </>
  );
}
