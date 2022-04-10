import React from "react";

export const Login = ({
  handleInputChange,
  formValue,
  handleSubmit,
  setIsLogin,
}) => {
  return (
    <>
      <div className="mx-5 mt-5">
        <form className="myform" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              value={formValue.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" class="btn btn-primary mt- mb-2">
            Submit
          </button>
          <button className="auth d-block" onClick={() => setIsLogin(false)}>
            Create new account
          </button>
        </form>
      </div>
    </>
  );
};
