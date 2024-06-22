import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useUser } from "../../store/userStore";

function Balance() {
  const [token] = useLocalStorage("token", null);
  const [{ isPaymentModalOpen }] = useUser();

  const [balanceState, setBalanceState] = useState(0);
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_API_ACCOUNT}/balance`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      const { balance } = response.data;
      setBalanceState(balance);
    };
    fn();
  }, [isPaymentModalOpen, token]);

  function rupify(amount) {
    let buffer = 3;
    let digitsTraversed = 0;
    const numArray = Math.floor(amount).toString().split("");
    const finalArray = [];
    for (let i = numArray.length - 1; i >= 0; i--) {
      digitsTraversed++;
      finalArray.push(numArray[i]);
      if (digitsTraversed == buffer) {
        if (i != 0) finalArray.push(",");
        buffer = 2;
        digitsTraversed = 0;
      }
    }
    return finalArray.reverse().join("");
  }

  return (
    <div>
      <h1 className="font-bold text-sm ">
        Your Balance Rs {rupify(balanceState)}
      </h1>
    </div>
  );
}

export default Balance;
