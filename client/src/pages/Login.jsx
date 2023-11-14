import { Link, Form, redirect, useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successfully.");
    return redirect("/dashboard");
  } catch (error) {
    errors.msg = error?.response?.data?.msg;
    toast.error(error?.response?.data?.msg);
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        {errors && (
          <p style={{ color: "red", margin: "20 0px" }}>{errors.msg}</p>
        )}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
