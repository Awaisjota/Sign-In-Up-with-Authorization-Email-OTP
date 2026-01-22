const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  );
};

export default Input;
