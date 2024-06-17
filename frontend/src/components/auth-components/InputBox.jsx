function InputBox({ placeHolder, label }) {
  return (
    <div className="flex flex-col w-full">
      <label className="font-medium text-slate-800" htmlFor={label}> {label} </label>
      <input className="w-full p-2 border-2 rounded-md" id={label} type="text" placeholder={placeHolder} />
    </div>
  );
}

export default InputBox;
