import React, { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import login2 from "../../assets/images/login2.png";
import { InputFieldUnit } from "../../Component/InputFieldComponent/InputFieldComponent";
import { loginDataHandler } from "../../Utils/InputDataHandler/loginDataHandler";
import Alert from "../../Component/AlertUnit/Alert";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { registerDataHandler } from "../../Utils/InputDataHandler/registerDataHandler";
import { useNavigate } from "react-router-dom";
import { UseDataContexts } from "../../ContextAPI/LoginAndMarksContext";

import { useMarksAndGrades } from "../../ContextAPI/getMarksAndGradeContext";

// ///////////
// Login and Register Screen
// ///////////
function LoginScreen() {
  const [checkClicked, setCheckCliked] = useState(false);
  const [checkAlert, setCheckAlert] = useState({});
  console.log(checkAlert.Success);
  console.log(checkAlert.Error);
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute left-0 right-0 mt-4 text-center">
        <Alert checkAlert={checkAlert} />
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col w-11/12 max-w-4xl overflow-hidden bg-white shadow-2xl sm:flex-row rounded-xl">
          {/* Left Side - Form */}
          <div className="flex flex-col items-center justify-center w-full p-8 sm:w-1/2">
            <div className="text-center">
              {checkClicked ? (
                <LoginUnit setCheckAlert={setCheckAlert} navigate={navigate} />
              ) : (
                <RegisterUnit
                  setCheckAlert={setCheckAlert}
                  setCheckCliked={setCheckCliked}
                />
              )}
              <div className="mt-4">
                {checkClicked ? (
                  <p>
                    Create New Account{" "}
                    <span
                      className="text-blue-500 cursor-pointer hover:text-blue-800"
                      onClick={() => setCheckCliked(false)}
                    >
                      Sign up
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 cursor-pointer hover:text-blue-800"
                      onClick={() => setCheckCliked(true)}
                    >
                      Sign in
                    </span>
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center mt-2">
                <input type="checkbox" />
                <span className="ml-2 font-bold">Remember Me</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden sm:block sm:w-1/2">
            <img
              src={login2}
              alt="Login"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;

// ///////////
// Login Unit
// ///////////
const LoginUnit = ({ setCheckAlert, navigate }) => {
  const [dbResponse, setDbResponse] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const { setUser } = UseDataContexts();
  const { fetchMarksAndGrades } = useMarksAndGrades();
  let success, error;

  if (dbResponse.data) {
    ({ success, error } = dbResponse.data);
  }

  if (success && success.token) {
    console.log(success.token);
  }
  // Use useEffect to handle state updates safely
  useEffect(() => {
    if (error) {
      setCheckAlert({ Error: error });
    }
    if (success && success.token) {
      sessionStorage.setItem("jwtToken", success.token);
      setCheckAlert({ Success: "Login Successful" });
      if (success.user.role === "STUDENT") {
        navigate("/");
        fetchMarksAndGrades(success?.user._id);
      }
      if (success.user.role === "LECTURER") {
        navigate("/lecturerDashboard");
        fetchMarksAndGrades(success?.user._id);
      }
    }
  }, [error, success, setCheckAlert, navigate]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-11">Sign In</h1>
        <div>
          <form
            onSubmit={(e) =>
              loginDataHandler(e, setDbResponse, canSubmit, setUser)
            }
          >
            <InputFieldUnit
              type="text"
              name="email"
              errMsgBase="email"
              setCanSubmit={setCanSubmit}
              label="User Name"
              placeholder="Email"
              iconName={<PersonOutlineOutlinedIcon />}
            />

            <InputFieldUnit
              type="password"
              name="password"
              setCanSubmit={setCanSubmit}
              errMsgBase="password"
              label="Password"
              placeholder="Password"
              iconName={<LockOutlinedIcon />}
            />
            <button
              type="submit"
              className="px-3 py-2 my-3 mb-6 font-semibold text-white bg-purple-500 border rounded-lg"
              disabled={!canSubmit}
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// ///////////
//  Register Unit
// ///////////
const RegisterUnit = ({ setCheckAlert, setCheckCliked }) => {
  const [dbResponse, setDbResponse] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  let success, error;
  if (dbResponse.data) {
    ({ success, error } = dbResponse.data);
  }

  // Use useEffect to handle state updates safely
  useEffect(() => {
    if (error) {
      setCheckAlert({ Error: error });
    }
    if (success) {
      setCheckAlert({ Success: "User Reguster Successful" });

      setTimeout(() => {
        setCheckCliked(true);
      }, 2000);
    }
  }, [error, success, setCheckAlert]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-11">Sign Up</h1>
        <div>
          <form
            onSubmit={(e) => registerDataHandler(e, setDbResponse, canSubmit)}
          >
            <InputFieldUnit
              type="text"
              name="username"
              setCanSubmit={setCanSubmit}
              errMsgBase="username"
              label="User Name"
              placeholder="User Name"
              iconName={<PersonOutlineOutlinedIcon />}
            />
            <InputFieldUnit
              type="email"
              name="email"
              setCanSubmit={setCanSubmit}
              errMsgBase="email"
              label="Email"
              placeholder="Email"
              iconName={<MailOutlinedIcon />}
            />

            <InputFieldUnit
              type="text"
              name="mobilenumber"
              setCanSubmit={setCanSubmit}
              errMsgBase="mobilenumber"
              label="Mobile Number"
              placeholder="Mobile Number"
              iconName={<PhoneOutlinedIcon />}
            />
            {/* Gender Dropdown Field */}
            <InputFieldUnit
              type="select"
              name="gender"
              setCanSubmit={setCanSubmit}
              errMsgBase="gender"
              label="Gender"
              placeholder="Select Gender"
              iconName={<WcOutlinedIcon />}
            />
            <InputFieldUnit
              type="password"
              name="password"
              setCanSubmit={setCanSubmit}
              errMsgBase="password"
              label="Password"
              placeholder="Password"
              iconName={<LockOutlinedIcon />}
            />
            <InputFieldUnit
              type="password"
              name="confirmpassword"
              setCanSubmit={setCanSubmit}
              errMsgBase="confirmpassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              iconName={<LockResetOutlinedIcon />}
            />
            <InputFieldUnit
              type="text"
              name="accesscode"
              setCanSubmit={setCanSubmit}
              errMsgBase="accesscode"
              label="Access Code"
              placeholder="Enter Access Code"
              iconName={<VpnKeyIcon />}
            />

            <button
              type="submit"
              className="px-3 py-2 my-3 mb-6 font-semibold text-white bg-purple-500 border rounded-lg"
              disabled={!canSubmit}
            >
              Sign up Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
