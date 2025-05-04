
import React from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "../components/MobileLayout";

const NotFound = () => {
  return (
    <MobileLayout hideNavigation>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <Link to="/" className="text-violet-500 hover:text-violet-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default NotFound;
