import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useUser } from "../../store/userStore.jsx";

function Appbar() {
  const [{ username }, dispatch] = useUser();
  const [, setToken] = useLocalStorage("token", null);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col font-medium text-sm">
      <div className="flex justify-between p-1 items-center">
        <h1>Pay-ment App</h1>
        <div className="flex w-min gap-1 items-center">
          <h1>Hello</h1>
          <div className="w-8 h-8 rounded-full bg-slate-300">
            <h1 className="text-xl font-normal text-center">
              {username[0].toUpperCase()}
            </h1>
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded-full ml-5"
            onClick={() => {
              dispatch({
                type: "set_user",
                payload: undefined,
              });
              setToken(null);
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr className=" mt-1 w-full border-2" />
    </div>
  );
}

export default Appbar;
