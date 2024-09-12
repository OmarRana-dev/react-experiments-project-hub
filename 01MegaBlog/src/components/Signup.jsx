import React, { useState } from "react";
import authService from "../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setErrorMessage("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const { email, password } = data;
        const session = await authService.login({ email, password });

        if (session) {
          const userData = await authService.getCurrentUser(user);
          if (userData) dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto my-8 w-full max-w-lg bg-slate-300 rounded-xl p-10 border">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 text-blue-500 hover:text-blue-400 underline"
          >
            Log In
          </Link>
        </p>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Enter your Name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email address mush be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPatern: (value) => {
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) ||
                      `
                        Password must be at least 8 characters long.
                        Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.
                        Can contain special characters.
                        `;
                  },
                },
              })}
            />
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
