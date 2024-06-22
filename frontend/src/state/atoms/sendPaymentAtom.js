import { atom, selector } from "recoil";

export const sendPaymentAtom = atom({
  key: "sendPayment",
  default: false,
});

export const paymentDoneAtom = atom({
  key: "paymentDoneSelector",
  default: false,
});
