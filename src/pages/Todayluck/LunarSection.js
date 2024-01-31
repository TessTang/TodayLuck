export default function LunarSection({ lunarData }) {
  return (
    <>
      <li className="todayLuckrow row">
        <p className="col-3 m-0">農曆</p>
        <p className="col-9 m-0">{lunarData.lunarDate.substring(3)}</p>
      </li>
      <li className="todayLuckrow row">
        <p className="col-3 m-0">宜</p>
        <ul className="lunarYiJi row row-cols-3 row-cols-sm-4 col-9">
          {lunarData.yiContent.split("、").map((val, idx) => {
            return (
              <li className="col" key={idx}>
                {val}
              </li>
            );
          })}
        </ul>
      </li>
      <li className="todayLuckrow row">
        <p className="col-3 m-0">忌</p>
        <ul className="lunarYiJi row row-cols-3 row-cols-sm-4 col-9">
          {lunarData.jiContent.split("、").map((val, idx) => {
            return (
              <li className="col" key={idx}>
                {val}
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
}
