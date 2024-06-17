const USERS = [
  {
    name: "Shaurya Uniyal",
  },
  {
    name: "Prateek Uniyal",
  },
];

function Users() {
  return (
    <div>
      <div className="flex flex-col w-full text-sm gap-y-4">
        <label className="font-bold text-slate-800" htmlFor="users">
          Users
        </label>
        <input
          className="w-full p-2 border-2 rounded-md"
          id="users"
          type="text"
          placeholder="Search users..."
        />
        {USERS.map((ele, index) => (
          <div key={index} className="my-4 flex justify-between">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-slate-300">
                <h1 className="text-xl text-center">A</h1>
              </div>
              <h1 className="font-medium"> {ele.name}</h1>
            </div>
            <button className="bg-slate-800 text-white rounded-md px-2 py-1">
              Send Money
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
