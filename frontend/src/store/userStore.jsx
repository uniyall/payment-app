// User store
import { createContext, useContext, useReducer } from "react";

// manage user information via React Context
const UserContext = createContext(null);

function getInitialUsername() {
  // fetches user information from local storage !!
  try {
    const value = window.localStorage.getItem("user");
    if (value) return JSON.parse(value);
    else {
      window.localStorage.setItem("user", JSON.stringify(null));
      return null;
    }
  } catch (e) {
    return null;
  }
}

const useUserSource = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "set_user": {
          try {
            window.localStorage.setItem("user", JSON.stringify(action.payload));
          } catch (e) {
            console.log(e);
          }
          return { ...state, username: action.payload };
        }

        case "set_payment_modal": {
          return { ...state, isPaymentModalOpen: action.payload };
        }

        case "set_success_modal": {
          return { ...state, isSuccessModalOpen: action.payload };
        }

        case "set_toPayUser": {
          return { ...state, toPayUser: action.payload };
        }
      }
    },
    {
      username: getInitialUsername(),
      isPaymentModalOpen: false,
      isSuccessModalOpen: false,
      toPayUser: null,
    }
  );

  return [state, dispatch];
};

export const UserProvider = ({ children }) => {
  return (
    <div>
      <UserContext.Provider value={useUserSource()}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
