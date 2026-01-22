import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectAuthRole, selectToken } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const role = useSelector(selectAuthRole);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Welcome to Dashboard as{" "}
          <span className="text-blue-600 capitalize">{role || "user"}</span>
        </h1>

        {/* Project Description */}
        <p className="text-gray-600 text-lg text-center mb-10">
          This application is a complete Sign In & Sign Up system featuring
          secure validation, authentication, and authorization. It includes
          email OTP verification, password reset, forgot password functionality,
          and modern security best practices to ensure a reliable and safe user
          experience.
        </p>

        {/* Token Display (Optional for Dev Mode) */}
        {token && (
          <div className="bg-gray-50 border rounded-lg p-4 text-sm break-words mb-10">
            <strong className="text-gray-700">Auth Token:</strong>
            <p className="text-gray-500 mt-1">{token}</p>
          </div>
        )}

        {/* DevBlog Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          AwaisJota DevBlog Website
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Visit my DevBlog platform where I share MERN Stack projects, modern UI
          designs, coding tutorials, real-world development experiences, and
          professional web engineering insights.
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <a
            href="https://awaisjotablog.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition shadow-md"
          >
            Visit AwaisJota DevBlog 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
