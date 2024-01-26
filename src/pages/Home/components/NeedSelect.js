import { FaExclamation } from "react-icons/fa";

export default function NeedSelect({
  register,
  errors,
  options,
  id,
  question,
  deco,
}) {
  return (
    <>
      <div className="form-group row px-3 justify-content-center gap-1 mt-1">
        <label
          htmlFor={id}
          className="width-fit shadow col-sm-2 col-form-label bg-warning rounded-5 fs-5 fs-md-4"
        >
          {question} {deco}
        </label>
        <div className="col-sm-8 position-relative">
          <select
            {...register(`${id}`, { required: true })}
            className={`${errors.zodiac && "is-invalid"} form-select rounded-5 bg-warning shadow fs-5 fs-md-4`}
            id={id}
            defaultValue=""
          >
            <option value="" disabled>
              請選擇
            </option>
            {options.map((val, idx) => {
              return (
                <option value={val.value} key={idx}>
                  {val.title}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback position-absolute end-0">
            選我
            <FaExclamation size="13" />
          </div>
        </div>
      </div>
    </>
  );
}
