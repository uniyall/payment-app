import BottomWarning from "./auth-components/BottomWarning";
import Button from "./auth-components/Button";
import Heading from "./auth-components/Heading";
import InputBox from "./auth-components/InputBox";
import SubHeading from "./auth-components/SubHeading";

function Signin() {
  return (
    <div>
      <form>
        <div className="flex flex-col items-center gap-2 p-3">
          <Heading>Sign in</Heading>
          <div className="w-2/3">
            <SubHeading>
              Enter your credentials to access your account
            </SubHeading>
          </div>
          <InputBox label={"Email"} placeHolder={"john@gmail.com"} />
          <InputBox label={"Password"} placeHolder={""} />
          <Button> Sign In </Button>
          <BottomWarning>{`Don't have an account? Sign Up`}</BottomWarning>
        </div>
      </form>
    </div>
  );
}

export default Signin;
