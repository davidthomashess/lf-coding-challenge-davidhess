"use client";

import { useState } from "react";

function emailValidation(email: string) {
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return false; // No "@" or "@" at the beginning/end
  }

  const domain = email.substring(atIndex + 1);
  if (domain.indexOf(".") === -1) {
    return false; // No "." in the domain
  }

  return true;
}

export default function Form() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const [email, setEmail] = useState("");
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailPopulated, setIsEmailPopulated] = useState(true);

  const handleFNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const result = target.value.replace(/[^a-z]/gi, "");

    setFName(result);
  };

  const handleLNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const result = target.value.replace(/[^a-z]/gi, "");

    setLName(result);
  };

  const handleEmailChange = (event: React.SyntheticEvent) => {
    console.log("handleEmailChange");
    const target = event.target as HTMLInputElement;

    setEmailBlurred(false);

    setEmail(target.value);

    // const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    console.log(`What is email?: ${email}`);
    console.log(`is email being set to valid?: ${emailValidation(email)}`);
    setIsEmailValid(emailValidation(email));
  };

  const handleEmailBlurred = () => {
    if (email === "") {
      setIsEmailPopulated(false);
    }
    setEmailBlurred(true);
  };

  console.log(`emailBlurred: ${emailBlurred}`);
  console.log(`isEmailValid: ${isEmailValid}`);
  console.log(`isEmailPopulated: ${isEmailPopulated}`);

  return (
    <div className="grid place-content-center bg-light-grey-blue pb-5">
      <form>
        <div
          className="flex flex-col md:flex-row pb-9 pt-5 md:pt-9"
          data-testid="name-input-section"
        >
          <label className="pr-0 md:pr-9" data-testid="form-fname-label">
            <p data-testid="form-fname">First Name</p>
            <input
              id="fname"
              name="fname"
              type="text"
              value={fName}
              onChange={handleFNameChange}
              data-testid="form-fname-input"
            />
          </label>
          <label data-testid="form-lname-label">
            <p data-testid="form-lname">Last Name</p>
            <input
              id="lname"
              name="fname"
              type="text"
              value={lName}
              onChange={handleLNameChange}
              data-testid="form-lname-input"
            />
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
              <input type="checkbox" />
              Email
            </p>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                handleEmailBlurred();
              }}
              data-testid="form-email-input"
            />
            <p className="text-red-600">
              {emailBlurred
                ? !isEmailValid && !isEmailPopulated
                  ? "Email is empty!"
                  : "Invalid Email!"
                : ""}
            </p>
          </label>
          <label data-testid="form-phone-label">
            <p data-testid="form-phone">
              <input type="checkbox" />
              Phone
            </p>
            <input type="text" data-testid="form-phone-input" />
          </label>
        </div>
        <br />
        <div
          className="grid place-content-center"
          data-testid="supervisor-dropdown-section"
        >
          <label>
            <select
              name="supervisors"
              id="supervisors"
              data-testid="supervisor-dropdown"
            >
              <option value="fredstark">Fred Stark</option>
              <option value="mattgreen">Matt Green</option>
              <option value="charliehue">Charlie Hue</option>
              <option value="danluke">Dan Luke</option>
            </select>
          </label>
          <br />
          <input
            className="bg-dark-grey-blue text-white rounded"
            type="submit"
            value="Submit"
            data-testid="submit-btn"
          />
        </div>
      </form>
    </div>
  );
}
