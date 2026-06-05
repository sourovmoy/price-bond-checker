import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { AiOutlineLoading } from "react-icons/ai";

const RegisterPage = () => {
  const { createUser } = useAuth();
  const axios = useAxios();
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setSpinner(true);

    try {
      const { name, email, password, phone } = data;

      // 1. Firebase auth
      await createUser(email, password);

      const newUser = {
        name,
        email,
        phone,
      };

      const response = await axios.post("/user", newUser);

      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center hover:pointer-coarse">
        <div className="flex mt-1">
          <div className="w-full max-w-md p-8 border border-gray-100 rounded-lg shadow-md">
            <h2 className="mb-5 text-3xl font-semibold text-gray-900">
              Create a new account
            </h2>

            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="017XXXXXXXX"
                  {...register("phone", {
                    minLength: 11,
                    required: "Phone Number is required",
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.phone.message}
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
                  {...register("file")}
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
                  {spinner ? (
                    <p className="flex items-center gap-3">
                      Creating{" "}
                      <span className="animate-spin">
                        <AiOutlineLoading />
                      </span>
                    </p>
                  ) : (
                    "Register"
                  )}
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
