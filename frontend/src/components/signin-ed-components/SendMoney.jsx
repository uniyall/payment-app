import { useEffect, useRef } from "react";

function SendMoney() {
  const modalRef = useRef(null);
  useEffect(() => {
    const modalElement = modalRef.current;
    modalElement.showModal();
  }, []);

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className="p-4 w-11/12 sm:w-1/2 shadow-lg relative backdrop:bg-[color:hsl(0_0%_0%_/_50%)]"
    >
      <button
        id="closeModal"
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg font-bold"
        onClick={() => {
          const modalElement = modalRef.current;
          modalElement.close();
        }}
      >
        X
      </button>
      <div className="mt-2 flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold mb-10">Send Money</h1>
        <div className="flex gap-x-2">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white">
            <h1 className="text-xl font-normal text-center">A</h1>
          </div>
          <h1 className="text-2xl font-medium">{`Friend's Name`}</h1>
        </div>
        <label className=" text-slate-800" htmlFor="users">
          Amount (in Rs)
        </label>
        <input
          className="w-full p-2 border-2 rounded-md"
          id="users"
          type="number"
          placeholder="Enter amount"
          inputMode="numeric"
        />
        <button className="bg-green-500 text-white rounded-md w-full p-2">
          Initiate Transfer
        </button>
      </div>
    </dialog>
  );
}

export default SendMoney;
