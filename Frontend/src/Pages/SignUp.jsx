import React, { useState } from "react";
import bg from "../assets/virtualassistant.png";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { signUpUser } from "../api/SignUpApi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { serverURL } = useContext(UserDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const data = await signUpUser(serverURL, {
        name,
        email: email,
        password,
      });

      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(error.message || "Signup failed");
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className=" mt-4 w-[90%] h-[520px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Registered to <span className="text-blue-400">Virtual Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-18px"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-18px"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-18px relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {showPassword ? (
            <IoEyeOffSharp
              className="absolute top-[16px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeSharp
              className="absolute top-[16px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {err.length > 0 && <p className="text-red-500 text-[17px]">*{err}</p>}
        <button
          className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] mt-[30px] cursor-pointer"
          disabled={loading}
        >
          {loading ? "loading...." : "Sign Up"}
        </button>
        <p
          className="text-[white] text-18px cursor-pointer"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Already have an account ?
          <span className="text-blue-400"> Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
