import React, { useEffect, useRef } from "react";
import { useUser } from "../../store/userStore";

function TransferSuccess() {
  const modalRef = useRef(null);
  const [{
    isSuccessModalOpen
  }] = useUser();

  useEffect(() => {
    const modalElement = modalRef.current;
    if (isSuccessModalOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isSuccessModalOpen]);

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className="p-4 bg-transparent  relative backdrop:bg-[color:hsl(0_0%_0%_/_50%)]"
    >
      <div className="rounded-full bg-green-200 p-2 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={5}
          stroke="green"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </dialog>
  );
}

export default TransferSuccess;
