import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] py-6">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4 animate-bounce" />
      <h2 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-500 mb-4">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
