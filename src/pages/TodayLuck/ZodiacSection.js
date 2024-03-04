import { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../App";
import { motionContainer, item } from "../../assets/motionfunc";

export default function ZodiacSection({ zodiacData }) {
  const { hadInfo } = useContext(UserContext);
  const myZodiac = zodiacData[hadInfo.zodiac];

  return (
    <motion.div
      variants={motionContainer}
      initial="start"
      animate="end"
      className="flex-grow d-flex flex-column"
    >
      <motion.li variants={item} className="todayLuckrow row">
        <p className="m-0 ">{myZodiac.astroLogical}</p>
      </motion.li>
      <motion.li variants={item} className="todayLuckrow row">
        <p className="m-0">{myZodiac.todayWord}</p>
      </motion.li>
      <motion.li variants={item} className="todayLuckrow row">
        <p className="col-4 m-0">幸運數字</p>
        <p className="col-8 m-0">{myZodiac.luckyNumber}</p>
      </motion.li>
      <motion.li variants={item} className="todayLuckrow row">
        <p className="col-4 m-0">幸運顏色</p>
        <p className="col-8 m-0">{myZodiac.luckyColor}</p>
      </motion.li>
    </motion.div>
  );
}
