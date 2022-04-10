import React, { useState, useContext } from "react";
import { HandleForm } from "../../helpers/customHook";
import postsApi from "../../helpers/postsApi";
import { CreateUser } from "./CreateUser";
import { Login } from "./Login";
import { AuthContext } from "../../context/authContext";
import { ModalAuth } from "./Modal";
import { Button } from "@mui/material";
import { UIContext } from "../../context/UIContext";

export const Auth = () => {
  const { auth } = useContext(AuthContext);
  const { openModal, handleClose, handleOpen } = useContext(UIContext);
  console.log(openModal, handleClose, handleOpen);
  const [isLogin, setIsLogin] = useState(true);

  const initialValue = {
    email: "",
    password: "",
  };
  const [formValue, handleInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const path = isLogin ? "users/login" : "users/new";
      const res = await postsApi.post(path, formValue);
      const { token, user } = res.data;
      auth({ token, ...user });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="mx-5 mt-5">
      {isLogin ? (
        // <Login
        //   formValue={formValue}
        //   handleInputChange={handleInputChange}
        //   handleSubmit={handleSubmit}
        //   setIsLogin={setIsLogin}
        // />
        <>
          <ModalAuth openModal={openModal} handleClose={handleClose} />
        </>
      ) : (
        <CreateUser
          formValue={formValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
};
