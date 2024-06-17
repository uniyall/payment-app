function Appbar() {
  return (
    <div className="flex flex-col font-medium text-sm">
      <div className="flex justify-between p-1 items-center">
        <h1>Pay-ment App</h1>
        <div className="flex w-min gap-1 items-center">
          <h1>Hello</h1>
          <div className="w-8 h-8 rounded-full bg-slate-300">
            <h1 className="text-xl font-normal text-center">A</h1>
          </div>
        </div>
      </div>
      <hr className=" mt-1 w-full border-2" />
    </div>
  );
}

export default Appbar;
