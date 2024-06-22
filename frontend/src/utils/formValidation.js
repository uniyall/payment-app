import { z } from "zod";

const ZSignup = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

export const signUpValidation = (values) => {
  const error = {};

  const validationResult = ZSignup.safeParse({
    username: values.username,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
  });

  if (!validationResult.success) {
    const validCheck = validationResult.error.flatten((issue) => {
      if (issue.path == "username" && issue.code == "too_small") {
        return {
          message: "Username should have atleast 3 character(s)",
        };
      } else if (issue.path == "username" && issue.code == "too_big") {
        return {
          message: "Username should not have more than 30 character(s)",
        };
      } else if (issue.path == "password" && issue.code == "too_small") {
        return {
          message: "Password should have atleast 6 character(s)",
        };
      } else if (issue.path == "firstName" && issue.code == "too_big") {
        return {
          message: "First Name should not have more than 50 Character(s)",
        };
      } else if (issue.path == "lastName" && issue.code == "too_big") {
        return {
          message: "Last Name should not have more than 50 character(s)",
        };
      }
    });

    const {
      fieldErrors = {}, // Set default for fieldErrors if not present
    } = validCheck || {}; // Check if validCheck exists, handle empty case

    if (fieldErrors) {
      const passwordMessage = fieldErrors.password?.[0]?.message || ""; // Optional chaining for safety
      const usernameMessage = fieldErrors.username?.[0]?.message || "";
      const firstNameMessage = fieldErrors.firstName?.[0]?.message || ""; // Default for firstNameMessage
      const lastNameMessage = fieldErrors.lastName?.[0]?.message || ""; // Default for lastNameMessage

      error.password = passwordMessage;
      error.username = usernameMessage;
      error.firstName = firstNameMessage;
      error.lastName = lastNameMessage;
    }
  }
  return error;
};