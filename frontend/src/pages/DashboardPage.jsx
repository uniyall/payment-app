import Appbar from "../components/signin-ed-components/Appbar";
import Balance from "../components/signin-ed-components/Balance";
import Users from "../components/signin-ed-components/Users";
import SendPage from "../components/signin-ed-components/SendMoney";
import TransferSuccess from "../components/signin-ed-components/TransferSuccess";

function DashboardPage() {
  return (
    <div className="p-2 sm:p-10 flex flex-col gap-y-2">
      <Appbar></Appbar>
      <Balance />
      <Users />
      <SendPage />
      <TransferSuccess />
    </div>
  );
}

export default DashboardPage;
