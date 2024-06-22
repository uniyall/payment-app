import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="w-screen h-screen p-2 flex flex-col justify-center items-center">
      <h1 className="text-8xl text-blue-700 font-bold text-center">PayKaro</h1>
      <div className="flex gap-x-3 m-5 text-xl">
        <Link to="signup">
          <h1>Signup</h1>
        </Link>
        <Link to="signin">
          <h1>Signin</h1>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
