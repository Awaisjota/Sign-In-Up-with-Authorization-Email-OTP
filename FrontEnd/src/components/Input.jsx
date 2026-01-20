const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default Input;
