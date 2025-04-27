// NotFoundRadium.jsx
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold text-green-400 glowing-text">
        404
      </h1>
      <p className="text-green-200 mt-4 text-xl font-light">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 border border-green-400 text-green-300 hover:bg-green-400 hover:text-black font-medium rounded transition duration-200"
      >
        Home
      </Link>
    </div>
  );
};
