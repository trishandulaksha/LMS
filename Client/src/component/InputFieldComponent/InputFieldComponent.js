import { useState } from "react";
import { userNameValidation } from "../../Utils/Validation/userDataValidation";
import { emailValidation } from "../../Utils/Validation/userEmailValidate";
import {
  confirmpasswordValidation,
  passwordValidation,
} from "../../Utils/Validation/passwordValidation";

export const InputFieldUnit = ({
  iconName,
  type,
  name,
  placeholder,
  errMsgBase,
  setCanSubmit,
}) => {
  const [errMsg, setErrMsg] = useState([]);
  const [err, setErr] = useState(false);
  return (
    <>
      <div className="items-center justify-center w-64 my-2">
        <div className="flex items-center justify-center py-2 border rounded-lg shadow-lg ">
          <div className="ml-2 -mr-2">{iconName}</div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="mx-4 outline-none"
            onBlur={(e) =>
              errMsgBase === "username"
                ? userNameValidation(
                    e.target.value,
                    setErr,
                    setErrMsg,
                    setCanSubmit
                  )
                : errMsgBase === "email"
                ? emailValidation(
                    e.target.value,
                    setErr,
                    setErrMsg,
                    setCanSubmit
                  )
                : errMsgBase === "password"
                ? passwordValidation(
                    e.target.value,
                    setErr,
                    setErrMsg,
                    setCanSubmit
                  )
                : confirmpasswordValidation(
                    e.target.value,
                    setErr,
                    setErrMsg,
                    setCanSubmit
                  )
            }
            onChange={() => setErr(false)}
          />
        </div>
        {err &&
          errMsg?.map((msg) => (
            <p className="p-1 text-sm font-semibold text-justify text-red-500">
              {msg}
            </p>
          ))}
      </div>
    </>
  );
};
