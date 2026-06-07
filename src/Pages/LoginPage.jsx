import React from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loading from "../Components/Loading/Loading";

const LoginPage = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const res = await signIn(email, password);
    if (res.user) {
      navigate("/");
    }
  };
  if (loading) <Loading />;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center hover:pointer-coarse">
        <div className="flex mt-8 md:mt-20">
          <div className="w-full max-w-md p-8  border border-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-gray-900">
              Sign in to your account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  {/* <a
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <input
                  type="password"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be 6 characters",
                    },
                  })}
                />
              </div>
              <div>
                <button className="btn w-full" type="submit">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
              </span>
              <Link
                to={"/register"}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
