import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ForgotPassword = () => {
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
      const res = await dispatch(forgotPassword(e.target.email.value)).unwrap();
      navigate("/reset");
    } catch (error) {
      console.log("Forgot Password error:", error); // show error in UI
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Forgot Password
        </h2>

        {error?.message && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mt-3 shadow-sm">
            <span className="text-lg">⚠️</span>
            <span>{error.message}</span>
          </div>
        )}

        <Input
          name="email"
          onChange={() => dispatch(clearError())}
          placeholder="Email"
        />
        {getFieldError("email") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("email")}
          </span>
        )}
        <Button disabled={status === "loading"} className="w-full mt-4">
          {status === "loading" ? "Sending OTP..." : "Send OTP"}
        </Button>

        <p className="text-center text-gray-500">
          <Link
            to="/reset"
            className="text-blue-600 font-semibold hover:underline"
          >
            Reset Password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
