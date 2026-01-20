import { useDispatch, useSelector } from "react-redux";
import { clearStatus, loginUser } from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((s) => s.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    ).then((res) => {
      if (!res.error) navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        {loading && <p className="text-blue-600 mb-2">Loading...</p>}
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
        <Input name="password" type="password" placeholder="Password" />
        <Button disabled={loading} className="w-full mt-4">
          Login
        </Button>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link to="/forgot" className="hover:underline text-blue-600">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:underline text-blue-600">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
