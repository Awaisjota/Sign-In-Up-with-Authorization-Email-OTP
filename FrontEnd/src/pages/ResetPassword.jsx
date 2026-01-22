import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResetPassword = () => {
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
      const email = e.target.email.value;
      const otp = e.target.otp.value;
      const newPassword = e.target.password.value;

      const res = await dispatch(
        resetPassword({ email, otp, newPassword })
      ).unwrap();

      navigate("/login");
    } catch (error) {
      console.log("Reset Password error:", error); // show error in UI
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Reset Password
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
        <Input
          name="otp"
          onChange={() => dispatch(clearError())}
          placeholder="OTP"
        />
        {getFieldError("otp") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("otp")}
          </span>
        )}
        <Input
          name="password"
          onChange={() => dispatch(clearError())}
          type="password"
          placeholder="New Password"
        />
        {getFieldError("newPassword") && (
          <span className="text-red-500 text-xs mt-1 block">
            * {getFieldError("newPassword")}
          </span>
        )}
        <Button disabled={status === "loading"} className="w-full mt-4">
          {status === "loading" ? "Reseting Password..." : "Reset Password"}
        </Button>

        <p className="text-center text-gray-500">
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
