import { Formik } from "formik";
import Heading from "./auth-components/Heading";
import SubHeading from "./auth-components/SubHeading";
import InputBox from "./auth-components/InputBox";
import Button from "./auth-components/Button";
import BottomWarning from "./auth-components/BottomWarning";

function Signup() {
  return (
    <div>
      <form>
        <div className="flex flex-col items-center gap-2 p-3">
          <Heading>Sign up</Heading>
          <div className="w-2/3">
            <SubHeading>Enter your information to create an account</SubHeading>
          </div>

          <InputBox label={"First Name"} placeHolder={"John"} />
          <InputBox label={"Last Name"} placeHolder={"Doe"} />
          <InputBox label={"Email"} placeHolder={"john@gmail.com"} />
          <InputBox label={"Password"} placeHolder={"123456"} />

          <Button> Sign Up </Button>
          <BottomWarning>Already have an account? Sign In</BottomWarning>
        </div>
      </form>
    </div>
  );
}

export default Signup;
