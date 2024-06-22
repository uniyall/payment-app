import { Link, Navigate, useNavigate } from "react-router-dom";
import BottomWarning from "./auth-components/BottomWarning";
import Button from "./auth-components/Button";
import Heading from "./auth-components/Heading";
import InputBox from "./auth-components/InputBox";
import SubHeading from "./auth-components/SubHeading";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useUser } from "../store/userStore";

function Signin() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [{ username }, dispatch] = useUser();
  const [, setToken] = useLocalStorage("token", null);
  if (username) return <Navigate to="/dashboard" />;
  console.log(username);

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          username: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // do something
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BE_API_USER}/signin`,
              {
                username: values.username,
                password: values.password,
              }
            );

            if (response.status === 200) {
              setSubmitting(false);
              dispatch({
                type: "set_user",
                payload: values.username,
              });
              setToken(response.data.token);
              navigate("/dashboard");
            }
          } catch (e) {
            // do something - setting error
            if (e.response.status === 411 || e.response.status == 403) {
              setSubmitError(e.response.data.message);
              setTimeout(() => {
                setSubmitError("");
              }, 3000);
            }
          }
        }}
      >
        {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 p-3">
              <Heading>Sign in</Heading>
              <div className="w-2/3">
                <SubHeading>
                  Enter your credentials to access your account
                </SubHeading>
              </div>
              <InputBox
                label={"Username"}
                placeHolder={"Your Username"}
                name={"username"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                isPass={false}
              />
              <InputBox
                label={"Password"}
                name={"password"}
                placeHolder={"********"}
                isPass={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Button isSubmitting={isSubmitting}> Sign In </Button>
              <BottomWarning>
                {`Don't have an account? `}
                <Link className="underline" to="/signup">
                  Sign Up
                </Link>
              </BottomWarning>
              <h1 className="text-red-500">{submitError}</h1>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signin;
