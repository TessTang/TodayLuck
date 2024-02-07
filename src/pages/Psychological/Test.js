import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { motionContainer, item } from "../../assets/motionfunc";

import Button from "../../components/Button";
import questions from "./assets/questions";

export default function Test({ setDone, setUserAns }) {
  //userOptions
  const [selectedOption, setSelectedOption] = useState("");
  //click radio => label css
  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  //now question
  const [qusNum, setqusNum] = useState(0);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //register name更新
  const myans = "ans" + String(qusNum);

  //到最後一題時設定setDone完成跳轉Result頁面
  function onSubmit(data) {
    if (qusNum === questions.length - 1) {
      setUserAns((pre) => [...pre, data[`ans${qusNum}`]]);
      setDone(true);
      return;
    }
    setUserAns((pre) => [...pre, data[`ans${qusNum}`]]);
    setqusNum((pre) => {
      return pre + 1;
    });
    setSelectedOption("");
  }

  return (
    <motion.form
      variants={motionContainer}
      initial="start"
      animate="end"
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow d-flex flex-column w-75"
    >
      <motion.span variants={item} className="fs-sm-4 d-block">
        - {questions[qusNum].id} -
      </motion.span>
      <motion.p variants={item} className="fs-sm-4">
        {questions[qusNum].question}
      </motion.p>
      <motion.div
        key={qusNum}
        variants={motionContainer}
        initial="start"
        animate="end"
        className="d-flex flex-column justify-content-around bg-danger bg-opacity-50 p-3 rounded-3 gap-2 psycholQues mb-2"
      >
        {questions[qusNum].answer.map((val) => {
          return (
            <motion.label
              variants={item}
              key={val.text}
              className={`fs-sm-5 hvr-wobble-skew ${selectedOption === val.value ? "checked" : ""}`}
            >
              <input
                type="radio"
                value={val.value}
                onClick={handleChange}
                {...register(`ans${qusNum}`, { required: true })}
              />
              {val.text}
            </motion.label>
          );
        })}
      </motion.div>
      <div>
        <Button
          buttonText="下一題"
          type="submit"
          inclass={errors?.[myans] && "is-invalid"}
        >
          <div id="nameFeedback" className="invalid-feedback">
            沒有選答案喔!
          </div>
        </Button>
      </div>
    </motion.form>
  );
}
