import React, { FunctionComponent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";

import RouteNames from "../Config/RouteNames";
import PasswordInput from "../Components/Input/PasswordInput";
import EmailInput from "../Components/Input/EmailInput";

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.token,
          email: response.data.email,
        })
      );

      navigate(RouteNames.Home);
    } catch (e: any) {
      // TODO: flash toast message
      console.log(e.message);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 sm:p-8">
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <EmailInput value={email} setValue={setEmail} />
        <PasswordInput value={password} setValue={setPassword} />
        <button
          type="submit"
          className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Login
        </button>
        <p className="text-sm font-light text-gray-500">
          Don’t have an account yet?
          <Link
            to={RouteNames.Register}
            className="font-medium text-primary-600 hover:underline"
          >
            {"     "}Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
