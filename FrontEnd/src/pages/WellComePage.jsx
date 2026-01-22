import { useSelector } from "react-redux";

const WellComePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        {/* Top Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Welcome to Dashboard as{" "}
          <span className="text-blue-600 capitalize">
            {user?.role || "User"}
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-gray-600 text-lg text-center mb-10">
          This project is a complete Sign In & Sign Up system with secure
          validation, authentication, and authorization. It includes email OTP
          verification, password reset, forgot password functionality, and
          modern security best practices to ensure a safe and smooth user
          experience.
        </p>

        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          AwaisJota DevBlog Website
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8">
          Explore my DevBlog platform where I share real-world MERN Stack
          projects, coding tutorials, development tips, and modern web
          engineering solutions for developers.
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <a
            href="https://your-devblog-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
          >
            Visit AwaisJota DevBlog 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default WellComePage;
