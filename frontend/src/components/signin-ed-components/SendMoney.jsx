import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useUser } from "../../store/userStore";

function SendMoney() {
  const [{ isPaymentModalOpen }, dispatch] = useUser();
  const [{ toPayUser }] = useUser();
  console.log(toPayUser);

  const modalRef = useRef(null);
  const [token] = useLocalStorage("token", null);
  const [userAmount, setUserAmount] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const modalElement = modalRef.current;
    if (isPaymentModalOpen) modalElement.showModal();
    else modalElement.close();
  }, [isPaymentModalOpen]);

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
          dispatch({
            type: "set_payment_modal",
            payload: false,
          });
        }}
      >
        X
      </button>
      <div className="mt-2 flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold mb-10">Send Money</h1>
        <div className="flex gap-x-2">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white">
            <h1 className="text-xl font-normal text-center">
              {toPayUser?.firstName
                ? `${toPayUser?.firstName[0]}`
                : "Loading..."}
            </h1>
          </div>
          <h1 className="text-2xl font-medium">{`${toPayUser?.firstName} ${toPayUser?.lastName}`}</h1>
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
          value={userAmount}
          onChange={(e) => setUserAmount(e.target.value)}
        />
        <h1 className="text-red-500">{submitError}</h1>
        <button
          className="bg-green-500 text-white rounded-md w-full p-2"
          onClick={async () => {
            if (parseInt(userAmount) <= 0)
              return setSubmitError("Amount has to be greater than zero");
            try {
              await axios.post(
                `${import.meta.env.VITE_BE_API_ACCOUNT}/transfer`,
                {
                  to: toPayUser._id,
                  amount: userAmount,
                },
                {
                  headers: {
                    Authorization: `bearer ${token}`,
                  },
                }
              );

              dispatch({
                type: "set_payment_modal",
                payload: false,
              });

              dispatch({
                type: "set_success_modal",
                payload: true,
              });

              setSubmitError("");
              setUserAmount("");
              setTimeout(() => {
                dispatch({
                  type: "set_success_modal",
                  payload: false,
                });
              }, 3000);
            } catch (e) {
              if (e.response.status == 400) {
                setSubmitError(e.response.data.message);
              }
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </dialog>
  );
}

export default SendMoney;
