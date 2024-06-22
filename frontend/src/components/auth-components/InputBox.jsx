function InputBox({
  placeHolder,
  label,
  name,
  isPass,
  value,
  onBlur,
  onChange,
}) {
  return (
    <div className="flex flex-col w-full">
      <label className="font-medium text-slate-800" htmlFor={label}>
        {" "}
        {label}{" "}
      </label>
      <input
        className="w-full p-2 border-2 rounded-md"
        id={label}
        type={isPass ? "password" : "text"}
        placeholder={placeHolder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}

export default InputBox;
