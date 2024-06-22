import axios from "axios";
import { atom } from "recoil";

export const allUserAtom = atom({
  key: "allUserAtom",

  effects: [
    ({ trigger, setSelf }) => {
      if (trigger === "get") {
        const fn = async () => {
          try {
            const token = JSON.parse(window.localStorage.getItem("token"));
            const response = await axios.get(
              `${import.meta.env.VITE_BE_API_USER}/bulk`,
              {
                headers: {
                  Authorization: `bearer ` + token,
                },
              }
            );
            setSelf(response.data);
          } catch (error) {
            console.error("Failed to fetch users", error);
            setSelf([]); // Set an empty array or handle error state as needed
          }
        };
        fn();
      }
    },
  ],
});
