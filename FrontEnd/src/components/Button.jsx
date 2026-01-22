const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
