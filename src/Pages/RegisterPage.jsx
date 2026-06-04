import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";

// Minimal visual representation based on image structure
const PhotoPreview = ({ file }) => {
  if (!file) return null;
  return (
    <div className="mt-2 text-center text-xs text-gray-500">
      File: {file.name} (Preview in development)
    </div>
  );
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, password, email, file } = data;

    const newUser = {
      name,
      password,
      email,
      image: file?.[0],
    };

    console.log(newUser);
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center hover:pointer-coarse">
        <div className="flex mt-2 md:mt-4">
          <div className="w-full max-w-md p-8 border border-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-gray-900">
              Create a new account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                </div>
                <input
                  type="password"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Photo (Optional)
                </label>
                <input
                  type="file"
                  id="photo"
                  className="block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500"
                  accept="image/*"
                  {...register("file", {
                    required: "Picture is required",
                  })}
                />
                {errors.file && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.file.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  className="btn w-full bg-green-300 hover:bg-green-400"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
              </span>
              <button className="text-sm font-medium text-green-600 hover:text-green-500">
                Sign In now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
