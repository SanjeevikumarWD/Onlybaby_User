import React from "react";

const Login = ({ onClickAccount }) => {
  return (
    <div className="w-full bg-zinc-50">
      <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="w-full overflow-hidden bg-white p-8 shadow-sm sm:max-w-md sm:rounded-lg">
          <p className="font-bold mb-5 text-gray-500">Login</p>
          <form className="mt-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 rounded-md bg-gray-100 mt-1 block"
                id="email"
                type="email"
                name="email"
                placeholder="Your email address"
                required
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="p-2 w-full rounded-md bg-gray-100 mt-1 block"
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-400 bg-black font-bold text-sm"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={onClickAccount}
                className="text-sm text-gray-600 underline"
              >
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
