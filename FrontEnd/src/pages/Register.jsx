import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    return () => dispatch(clearError());
  }, []);

  const getFieldError = (field) =>
    error?.errors?.find((e) => e.path === field)?.msg;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        })
      ).unwrap();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Register
        </h2>

        {error?.message && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mt-3 shadow-sm">
            <span className="text-lg">⚠️</span>
            <span>{error.message}</span>
          </div>
        )}

        <Input
          onChange={() => dispatch(clearError())}
          name="name"
          placeholder="Name"
        />
        {getFieldError("name") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("name")}
          </span>
        )}
        <Input
          onChange={() => dispatch(clearError())}
          name="email"
          placeholder="Email"
        />
        {getFieldError("email") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("email")}
          </span>
        )}
        <Input
          onChange={() => dispatch(clearError())}
          name="password"
          type="password"
          placeholder="Password"
        />
        {getFieldError("password") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("password")}
          </span>
        )}

        <Button
          disabled={status === "loading"}
          className="bg-pink-500 w-full mt-4 "
        >
          {status === "loading" ? "Registering..." : "Register"}
        </Button>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
