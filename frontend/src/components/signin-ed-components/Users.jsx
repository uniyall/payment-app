import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useUser } from "../../store/userStore";

function Users() {
  const [, dispatch] = useUser();
  const [token] = useLocalStorage("token", null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_API_USER}/bulk`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setAllUsers(response.data);
    };
    fn();
  }, [token]);

  const [searchValue, setSearchValue] = useState("");

  const debouncedQuery = useCallback((func, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await func.apply(this, args);
      }, timeout);
    };
  }, []);

  const fetchUsers = useCallback(
    debouncedQuery(async (filter) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_API_USER}/bulk`,
          {
            params: {
              filter: filter,
            },
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        console.log(response);
        setAllUsers(response.data)
      } catch (e) {
        // do something
        console.log("err", e);
      }
    }, 1000),
    [debouncedQuery, token]
  );

  return (
    <div>
      <div
        className="flex flex-col w-full text-sm 
      gap-y-4"
      >
        <label className="font-bold text-slate-800" htmlFor="users">
          Users
        </label>
        <input
          className="w-full p-2 border-2 rounded-md"
          id="users"
          type="text"
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            fetchUsers(e.target.value);
          }}
        />

        {allUsers.map((ele, index) => (
          <div key={index} className="my-4 flex justify-between">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-slate-300">
                <h1 className="text-xl text-center">
                  {[...ele.firstName][0].toUpperCase()}
                </h1>
              </div>
              <h1 className="font-medium">
                {`${ele.firstName} ${ele.lastName}`}
              </h1>
            </div>
            <button
              className="bg-slate-800 text-white rounded-md px-2 py-1"
              onClick={() => {
                dispatch({
                  type: "set_toPayUser",
                  payload: ele,
                });

                dispatch({
                  type: "set_payment_modal",
                  payload: true,
                  
                });
              }}
            >
              Send Money
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
