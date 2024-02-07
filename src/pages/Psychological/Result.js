import { Link } from "react-router-dom";

import Button from "../../components/Button";
import testResults from "./assets/testResults";
import { motion } from 'framer-motion';
import { motionContainer, item } from '../../assets/motionfunc';

export default function Result({ userAns, setDone, setUserAns }) {
  //將分數陣列加總
  const userScore = userAns.map(Number).reduce((a, b) => a + b, 0);

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
    setUserAns([]);
  };

  return (
    <motion.div variants={motionContainer} initial="start" animate="end" >
      <motion.span variants={item} className="fs-sm-4 d-block">- 結果 -</motion.span>
      <motion.p variants={item} className="fs-sm-4">{userResult.title}</motion.p>
      <motion.div variants={item} className="myCenter bg-danger bg-opacity-50 py-5 px-3 rounded-3 psycholAns fs-sm-4 mb-4">
        {userResult.content}
      </motion.div>
      <Button onClick={resetAns} buttonText="重新測驗" />

      <Link to="/Today's_Luck" className="col-12">
        <Button buttonText="回今日運勢頁面" />
      </Link>
    </motion.div>
  );
}
