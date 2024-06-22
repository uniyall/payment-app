import { Formik } from "formik";
import Heading from "./auth-components/Heading";
import SubHeading from "./auth-components/SubHeading";
import InputBox from "./auth-components/InputBox";
import Button from "./auth-components/Button";
import BottomWarning from "./auth-components/BottomWarning";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpValidation } from "../utils/formValidation";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useUser } from "../store/userStore";

function Signup() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [{ username }, dispatch] = useUser();
  const [, setToken] = useLocalStorage("token", null);

  if (username) return <Navigate to="/dashboard" />;

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          username: "",
        }}
        validate={signUpValidation}
        onSubmit={async (values, { setSubmitting }) => {
          // make api call to backend for registration
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BE_API_USER}/signup`,
              {
                username: values.username,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
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
            if (e.response.status === 411) {
              setSubmitError(e.response.data.message);
              setTimeout(() => {
                setSubmitError("");
              }, 3000);
            }
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 p-3">
              <Heading>Sign up</Heading>
              <div className="w-2/3">
                <SubHeading>
                  Enter your information to create an account
                </SubHeading>
              </div>
              <InputBox
                label={"First Name"}
                placeHolder={"John"}
                name={"firstName"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                isPass={false}
              />
              <h1 className="text-red-500">
                {errors.firstName && touched.firstName && errors.firstName}
              </h1>
              <InputBox
                label={"Last Name"}
                placeHolder={"Doe"}
                name={"lastName"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <h1 className="text-red-500">
                {errors.lastName && touched.lastName && errors.lastName}
              </h1>
              <InputBox
                label={"User Name"}
                placeHolder={"username"}
                name={"username"}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.username}
              />
              <h1 className="text-red-500">
                {errors.username && touched.username && errors.username}
              </h1>
              <InputBox
                label={"Password"}
                placeHolder={"********"}
                name={"password"}
                isPass={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <h1 className="text-red-500">
                {errors.password && touched.password && errors.password}
              </h1>
              <Button isSubmitting={isSubmitting}> Sign Up </Button>
              <BottomWarning>
                Already have an account?{" "}
                <Link className="underline" to="/signin">
                  Sign In
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

export default Signup;
