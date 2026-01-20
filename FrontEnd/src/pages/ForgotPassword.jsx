import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearStatus } from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(e.target.email.value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Forgot Password
        </h2>

        {loading && (
          <p className="text-blue-600 mb-2 text-center">Loading...</p>
        )}
        {error && (
          <p
            className="text-red-600 mb-2 cursor-pointer text-center"
            onClick={() => dispatch(clearStatus())}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            className="text-green-600 mb-4 cursor-pointer text-center"
            onClick={() => dispatch(clearStatus())}
          >
            {success}
          </p>
        )}

        <Input name="email" placeholder="Email" />
        <Button disabled={loading} className="w-full mt-4">
          Send OTP
        </Button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/reset" className="hover:underline text-blue-600">
            Reset Password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
