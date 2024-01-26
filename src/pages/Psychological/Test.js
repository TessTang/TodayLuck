import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import questions from "./assets/questions";

export default function Test({ setDone, userAns, setuserAns }) {
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
  let myans = "ans" + String(qusNum);

  //到最後一題時設定setDone完成跳轉Result頁面
  function onSubmit(data) {
    if (qusNum === questions.length - 1) {
      setuserAns([...userAns, data[`ans${qusNum}`]]);
      setDone(true);
      return;
    }
    setuserAns([...userAns, data[`ans${qusNum}`]]);
    setqusNum((pre) => {
      return pre + 1;
    });
    setSelectedOption("");
  }
  console.log(userAns);
  console.log(`ans${qusNum}`);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow d-flex flex-column w-75"
    >
      <span className="fs-sm-4 d-block">- {questions[qusNum].id} -</span>
      <p className="fs-sm-4">{questions[qusNum].question}</p>
      <div className="d-flex flex-column justify-content-around bg-danger bg-opacity-50 p-3 rounded-3 gap-2 psycholQues mb-2">
        {questions[qusNum].answer.map((val) => {
          return (
            <label
              key={val[1]}
              className={`fs-sm-5 hvr-wobble-skew ${selectedOption === val[1] ? "checked" : ""}`}
            >
              <input
                type="radio"
                value={val[1]}
                onClick={handleChange}
                {...register(`ans${qusNum}`, { required: true })}
              />
              {val[0]}
            </label>
          );
        })}
      </div>
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
    </form>
  );
}
