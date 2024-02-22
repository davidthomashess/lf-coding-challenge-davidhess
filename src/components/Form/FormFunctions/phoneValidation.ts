const phoneValidation = (phone: string) => {
  const numbers = phone.match(/\d/g)?.length || 0;

  if (numbers < 9) {
    return false;
  }

  return true;
};

export default phoneValidation;
