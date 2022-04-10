import { useState } from "react";

export const HandleForm = (initialValue) => {
  const [formValue, setFormValue] = useState(initialValue);

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const resetForm = () => {
    setFormValue(initialValue);
  };
  return [formValue, handleInputChange, resetForm];
};
