import { useForm } from "react-hook-form";

//icon
import { FaStarOfDavid, FaGrinHearts } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

import Button from "../../components/Button";
import NeedSelect from "./components/NeedSelect";
import { userZodiac, userLove } from "./assets/selectOption";

export default function Needinfo({ setHadInfo }) {
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit button
  //送出後提交資料給localStorage並轉到hadinfo
  const onSubmit = (data) => {
    window.localStorage.setItem("hadInfo", JSON.stringify(data));
    setHadInfo(data);
  };

  return (
    <>
      <p className="fs-5 fs-sm-3 col-9 mx-auto text-nowrap">
        每日為您整理星座與農民曆 <br />
        還可以做個心理測驗!
        <BsFillHandThumbsUpFill />
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow-1 d-flex flex-column justify-content-around"
      >
        <p className="fs-5 fs-sm-4 mb-3">請先填寫資料:</p>
        {/* name input */}
        <div className="form-group row px-3 justify-content-center gap-1 mt-1">
          <label
            htmlFor="name"
            className="width-fit shadow col-sm-2 col-form-label bg-warning rounded-5 fs-5 fs-md-4 "
          >
            名字
            <MdEmojiPeople />
          </label>
          <div className="col-sm-8 position-relative">
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="最多十個字!"
              maxLength="10"
              className={`form-control rounded-5 bg-warning shadow fs-5 fs-md-4 ${errors.name && "is-invalid"}`}
            />
            <div
              id="nameFeedback"
              className="invalid-feedback position-absolute end-0"
            >
              寫我
              <FaExclamation size="13" />
            </div>
          </div>
        </div>
        {/* zodiac input */}
        <NeedSelect
          register={register}
          errors={errors}
          options={userZodiac}
          id="zodiac"
          question="星座"
          deco={<FaStarOfDavid />}
        />
        {/* love input */}
        <NeedSelect
          register={register}
          errors={errors}
          options={userLove}
          id="love"
          question="派系"
          deco={<FaGrinHearts />}
        />
        {/* button */}
        <div className="form-group row mt-3">
          <Button buttonText="送出" type="submit" />
        </div>
      </form>
    </>
  );
}
