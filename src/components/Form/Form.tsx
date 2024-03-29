"use client";

import { useState, useEffect, FormEvent } from "react";
import Select, { SingleValue } from "react-select";
import throwEx from "@/Functions/Throw/throwEx";
import emailValidation from "./FormFunctions/emailValidation";
import phoneValidation from "./FormFunctions/phoneValidation";
import formatPhone from "./FormFunctions/formatPhone";
import { SupervisorName } from "./FormTypes/SupervisorName";

export default function Form() {
  const [fName, setFName] = useState("");
  const [fNameBlurred, setFNameBlurred] = useState(false);
  const [isFNamePopulated, setIsFNamePopulated] = useState(true);

  const [lName, setLName] = useState("");
  const [lNameBlurred, setLNameBlurred] = useState(false);
  const [isLNamePopulated, setIsLNamePopulated] = useState(true);

  const [email, setEmail] = useState("");
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailPopulated, setIsEmailPopulated] = useState(true);
  const [emailCheck, setEmailCheck] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneBlurred, setPhoneBlurred] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhonePopulated, setIsPhonePopulated] = useState(true);
  const [phoneCheck, setPhoneCheck] = useState(false);

  const [supervisorData, setSupervisorData] = useState<SupervisorName[]>([]);
  const [supervisor, setSupervisor] = useState("select");

  useEffect(() => {
    fetch(
      "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/supervisors"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const results = data.results;

        const nameData = results.map((result: any) => {
          return result.name;
        });

        setSupervisorData(nameData);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error);
        }
      });
  }, []);

  const handleSupervisorNames = (
    event: SingleValue<{ value: string; label: string }>
  ) => {
    const label = event?.label || throwEx("Supervisor name label is missing!");
    setSupervisor(label);
  };

  const getSupervisorDropDown = () => {
    if (supervisorData !== undefined && supervisorData.length > 3) {
      const supervisorNames = supervisorData;

      const supervisors = supervisorNames.map((item) => {
        const selectItems = {
          value: `${item.first.toLowerCase()}${item.last.toLowerCase()}`,
          label: `${item.first} ${item.last}`,
        };
        return selectItems;
      });

      return (
        <Select
          className="w-48"
          options={supervisors}
          onChange={(e) => handleSupervisorNames(e)}
        />
      );
    }
  };

  const handleFNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const result = target.value.replace(/[^a-z]/gi, "");

    setFName(result);
  };

  const handleFNameBlurred = () => {
    if (fName === "") {
      setIsFNamePopulated(false);
    } else {
      setIsFNamePopulated(true);
    }
    setFNameBlurred(true);
  };

  const handleLNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const result = target.value.replace(/[^a-z]/gi, "");

    setLNameBlurred(false);

    setLName(result);
  };

  const handleLNameBlurred = () => {
    if (lName === "") {
      setIsLNamePopulated(false);
    } else {
      setIsLNamePopulated(true);
    }
    setLNameBlurred(true);
  };

  const handleEmailCheck = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    setEmailCheck(checked);
    setPhoneCheck(false);
  };

  const handleEmailChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setEmailBlurred(false);

    setEmail(target.value);

    setIsEmailValid(emailValidation(email));
  };

  const handleEmailBlurred = () => {
    if (email === "") {
      setIsEmailPopulated(false);
    } else {
      setIsEmailPopulated(true);
    }
    setEmailBlurred(true);
  };

  const handlePhoneCheck = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    setPhoneCheck(checked);
    setEmailCheck(false);
  };

  const handlePhoneChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const formattedPhone = formatPhone(target.value);

    setPhoneBlurred(false);

    setPhone(formattedPhone);

    setIsPhoneValid(phoneValidation(phone));
  };

  const handlePhoneBlurred = () => {
    if (phone === "") {
      setIsPhonePopulated(false);
    } else {
      setIsPhonePopulated(true);
    }
    setPhoneBlurred(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = [
      fName,
      lName,
      `${emailCheck ? email : ""}`,
      `${phoneCheck ? phone : ""}`,
      supervisor,
    ];
    console.log(`Data captured: ${postData}`);

    fetch("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }).then(() => {
      console.log("I am submitted!");
      console.log("Form data sent!");
    });
  };

  return (
    <div className="grid place-content-center bg-light-grey-blue pb-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className="flex flex-col md:flex-row pb-9 pt-5 md:pt-9"
          data-testid="name-input-section"
        >
          <label className="pr-0 md:pr-9" data-testid="form-fname-label">
            <p data-testid="form-fname">First Name</p>
            <input
              className="w-48"
              id="fname"
              name="fname"
              type="text"
              value={fName}
              onChange={(e) => handleFNameChange(e)}
              onBlur={() => {
                handleFNameBlurred();
              }}
              data-testid="form-fname-input"
            />
            <p className="text-red-600">
              {fNameBlurred && !isFNamePopulated
                ? "Your first name is empty!"
                : ""}
            </p>
          </label>
          <label data-testid="form-lname-label">
            <p data-testid="form-lname">Last Name</p>
            <input
              className="w-48"
              id="lname"
              name="fname"
              type="text"
              value={lName}
              onChange={(e) => handleLNameChange(e)}
              onBlur={() => {
                handleLNameBlurred();
              }}
              data-testid="form-lname-input"
            />
            <p className="text-red-600">
              {lNameBlurred && !isLNamePopulated
                ? "Your last name is empty!"
                : ""}
            </p>
          </label>
        </div>
        <p data-testid="notify-question">
          How would you prefer to be notified?
        </p>
        <div
          className="flex flex-col md:flex-row"
          data-testid="contact-input-section"
        >
          <label className="pr-0 md:pr-9" data-testid="form-email-label">
            <p data-testid="form-email">
              <input
                type="checkbox"
                name="emailcheckbox"
                id="emailcheckbox"
                checked={emailCheck}
                onChange={(e) => handleEmailCheck(e)}
                data-testid="emailcheckbox"
              />
              Email
            </p>
            <input
              className="w-48"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              onBlur={() => {
                handleEmailBlurred();
              }}
              data-testid="form-email-input"
              disabled={!emailCheck}
            />
            <p className="text-red-600">
              {emailBlurred && emailCheck
                ? !isEmailPopulated
                  ? "Email is empty!"
                  : !isEmailValid
                  ? "Invalid Email!"
                  : ""
                : ""}
            </p>
          </label>
          <label data-testid="form-phone-label">
            <p data-testid="form-phone">
              <input
                type="checkbox"
                name="phonecheckbox"
                id="emailcheckbox"
                checked={phoneCheck}
                onChange={(e) => handlePhoneCheck(e)}
                data-testid="phonecheckbox"
              />
              Phone
            </p>
            <input
              className="font-xnumbers w-48"
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(e)}
              onBlur={() => {
                handlePhoneBlurred();
              }}
              data-testid="form-phone-input"
              disabled={!phoneCheck}
            />
            <p className="text-red-600">
              {phoneBlurred && phoneCheck ? (
                !isPhonePopulated ? (
                  "Phone number is empty!"
                ) : !isPhoneValid ? (
                  "Invalid phone number!"
                ) : (
                  ""
                )
              ) : (
                <br />
              )}
            </p>
          </label>
        </div>
        <br />
        <div
          className="grid justify-items-center"
          data-testid="supervisor-dropdown-section"
        >
          {getSupervisorDropDown()}
          <br />
          <input
            className="bg-dark-grey-blue text-white rounded cursor-pointer w-28"
            type="submit"
            value="Submit"
            data-testid="submit-btn"
          />
        </div>
      </form>
    </div>
  );
}
