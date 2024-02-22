"use client";

import { useState, useEffect } from "react";

const throwEx = (msg: string) => {
  throw Error(msg);
};

const emailValidation = (email: string) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return false; // No "@" or "@" at the beginning/end
  }

  const domain = email.substring(atIndex + 1);
  if (domain.indexOf(".") === -1) {
    return false; // No "." in the domain
  }

  return true;
};

const phoneValidation = (phone: string) => {
  const numbers = phone.match(/\d/g)?.length || 0;

  console.log("numbers: " + numbers);

  if (numbers < 9) {
    console.log("invalid phone");
    return false;
  }

  console.log("valid phone");

  return true;
};

const formatPhone = (value: string) => {
  if (!value) return value;

  const phone = value.replace(/[^\d]/g, "");
  const phoneLength = phone.length;

  if (phoneLength < 4) return phone;
  if (phoneLength < 7) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  }
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
};

interface SupervisorName {
  title: string;
  first: string;
  last: string;
}

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
  // const [supervisorNames, setSupervisorNames] = useState([]);
  const [supervisor, setSupervisor] = useState("");

  useEffect(() => {
    fetch(
      "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/supervisors"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const results = data.results;
        // console.log(results);

        const nameData = results.map((result: any) => {
          return result.name;
        });

        // console.log(nameData);

        setSupervisorData(nameData);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error);
        }
      });
  }, []);

  console.log("After useEffect!");
  console.log(supervisorData);

  const handleSupervisorNames = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const result = target.value;
    setSupervisor(result);
  };

  const getSupervisorDropDown = () => {
    if (supervisorData !== undefined) {
      const supervisorNames = supervisorData;
      console.log(supervisorNames[0]);

      const supervisors = supervisorNames.map((item, index) => {
        return (
          <option
            key={index}
            data-testid={`supervisor-${index}`}
            value={`${item.first} ${item.last}`}
          >{`${item.first} ${item.last}`}</option>
        );
      });

      return (
        <label>
          <select
            name="supervisors"
            id="supervisors"
            data-testid="supervisor-dropdown"
          >
            <option value="select">Select...</option>
            {supervisors}
          </select>
        </label>
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

  // const [phone, setPhone] = useState("");
  // const [isPhoneValid, setIsPhoneValid] = useState(true);
  // const [isPhonePopulated, setIsPhonePopulated] = useState(true);

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

  console.log(`phone: ${phone}`);

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
              <input type="checkbox" />
              Email
            </p>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              onBlur={() => {
                handleEmailBlurred();
              }}
              data-testid="form-email-input"
            />
            <p className="text-red-600">
              {emailBlurred
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
              <input type="checkbox" />
              Phone
            </p>
            <input
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(e)}
              onBlur={() => {
                handlePhoneBlurred();
              }}
              data-testid="form-phone-input"
            />
            <p className="text-red-600">
              {phoneBlurred
                ? !isPhonePopulated
                  ? "Email is empty!"
                  : !isPhoneValid
                  ? "Invalid Email!"
                  : ""
                : ""}
            </p>
          </label>
        </div>
        <br />
        <div
          className="grid place-content-center"
          data-testid="supervisor-dropdown-section"
        >
          {getSupervisorDropDown()}
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
