export default function Button({
  buttonText,
  onClick,
  type,
  inclass,
  children,
}) {
  return (
    <>
      <div className="d-grid col-6 mx-auto mt-1">
        <button
          onClick={onClick}
          type={type}
          className={`hvr-wobble-skew btn btn-success py-2 fw-bold rounded-4 shadow ${inclass}`}
        >
          {buttonText}
        </button>
        {children}
      </div>
    </>
  );
}
