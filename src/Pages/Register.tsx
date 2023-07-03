import React, { FunctionComponent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";

import RouteNames from "../Config/RouteNames";
import PasswordInput from "../Components/Input/PasswordInput";
import EmailInput from "../Components/Input/EmailInput";

const Register: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password != confirmPassword) {
      // TODO: show some error
    }

    try {
      const response = await axios.post("auth/register", {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "token",
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
        <PasswordInput value={confirmPassword} setValue={setConfirmPassword} />
        <button
          type="submit"
          className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Register
        </button>
        <p className="text-sm font-light text-gray-500">
          Already have an account?
          <Link
            to={RouteNames.Login}
            className="font-medium text-primary-600 hover:underline"
          >
            {"     "}Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
