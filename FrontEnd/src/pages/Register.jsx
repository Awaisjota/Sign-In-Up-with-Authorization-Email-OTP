import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../features/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Register
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

        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button disabled={loading} className="w-full mt-4">
          Register
        </Button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/login" className="hover:underline text-blue-600">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
