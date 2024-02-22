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

export default emailValidation;
