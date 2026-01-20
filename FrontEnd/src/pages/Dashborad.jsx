import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token, isAuth } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
      <div className="bg-white shadow-md rounded-xl p-8 w-96 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome! You are{" "}
          <span className="font-medium">
            {isAuth ? "logged in" : "not logged in"}
          </span>
        </p>

        {/* User Token display for debugging (optional) */}
        {token && (
          <div className="bg-gray-100 text-gray-700 p-3 rounded mb-6 w-full break-words text-sm">
            <strong>Token:</strong> {token}
          </div>
        )}

        <button
          onClick={() => dispatch(logout())}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all w-full mb-4"
        >
          Logout
        </button>

        {/* Optional navigation links */}
        <div className="flex justify-between w-full text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
