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

// ///////////
// Login and Register Screen
// ///////////
function LoginScreen() {
  const [checkClicked, setCheckCliked] = useState(false);
  const [checkAlert, setCheckAlert] = useState({});
  console.log(checkAlert.Success);
  console.log(checkAlert.Error);

  return (
    <>
      <div className="absolute left-0 right-0 mt-4 text-center">
        <Alert checkAlert={checkAlert} />
      </div>
      <div className="flex items-center justify-center h-screen ">
        <div className="">
          <div className="flex items-center justify-center text-center border border-gray-200 shadow-2xl rounded-2xl">
            {checkClicked ? (
              <>
                <div className="mx-12">
                  <LoginUnit setCheckAlert={setCheckAlert} />
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
                  <div className="flex items-center justify-center mt-2">
                    <input type="checkbox" />{" "}
                    <span className="ml-2 font-bold">Remember Me</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mx-12">
                <RegisterUnit setCheckAlert={setCheckAlert} />
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
                className="object-cover w-full h-auto rounded-xl"
              />
            </div>
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
const LoginUnit = ({ setCheckAlert }) => {
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
      setCheckAlert({ Success: "Login Successful" });
    }
  }, [error, success, setCheckAlert]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-11">Sign In</h1>
        <div>
          <form onSubmit={(e) => loginDataHandler(e, setDbResponse, canSubmit)}>
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
const RegisterUnit = ({ setCheckAlert }) => {
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
              type="number"
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
