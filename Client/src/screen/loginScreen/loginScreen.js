import React, { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import login2 from "../../assets/images/login2.png";

function LoginScreen() {
  const [checkClicked, setCheckCliked] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="">
        <div className="flex items-center justify-center text-center border border-gray-200 shadow-2xl rounded-2xl">
          {checkClicked ? (
            <>
              <div className="mx-12">
                <LoginUnit />
                <div>
                  <p>
                    Create New Account{" "}
                    <span
                      className="text-blue-500 cursor-pointer hover:text-blue-800"
                      onClick={() => checkClicked && setCheckCliked(false)}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="mx-12">
              <RegisterUnit />
              <div className="mt-2">
                <p>
                  Already have an account ?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-800"
                    onClick={() => !checkClicked && setCheckCliked(true)}
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="">
            <img
              src={login2}
              alt="Login IMG"
              className="w-[320px] h-[480px] rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;

const LoginUnit = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-11">Sign In</h1>
        <div>
          <form>
            <InputFieldUnit
              type="text"
              name="username"
              label="User Name"
              placeholder="User Name"
              iconName={<PersonOutlineOutlinedIcon />}
            />
<<<<<<< HEAD
=======

>>>>>>> 8414ab91a75c3279623b7b7f673d7fad5c196bf7
            <InputFieldUnit
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              iconName={<MailOutlinedIcon />}
            />
            <button className="px-3 py-2 my-3 mb-6 font-semibold text-white bg-purple-500 border rounded-lg">
              Login Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const RegisterUnit = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-11">Sign Up</h1>
        <div>
          <form>
            <InputFieldUnit
              type="text"
              name="username"
              label="User Name"
              placeholder="User Name"
              iconName={<PersonOutlineOutlinedIcon />}
            />
            <InputFieldUnit
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              iconName={<MailOutlinedIcon />}
            />
            <InputFieldUnit
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              iconName={<LockOutlinedIcon />}
            />
            <InputFieldUnit
              type="password"
              name="confirmpassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              iconName={<LockResetOutlinedIcon />}
            />
            <button className="px-3 py-2 my-3 mb-6 font-semibold text-white bg-purple-500 border rounded-lg">
              Sign up Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const InputFieldUnit = ({ iconName, type, name, placeholder }) => {
  return (
    <>
      <div className="flex items-center justify-center my-2 border rounded-lg shadow-lg">
        <div className="flex items-center justify-center py-2 ">
          <div className="ml-2 -mr-2">{iconName}</div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="mx-4 outline-none"
          />
        </div>
      </div>
    </>
  );
};
