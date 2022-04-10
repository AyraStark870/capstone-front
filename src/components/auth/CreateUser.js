import React from "react";

export const CreateUser = ({
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
            <div id="emailHelp" class="form-text">
              Password should have at leats 5 characters.
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-1">
            Submit
          </button>
          <button className="auth d-block" onClick={() => setIsLogin(true)}>
            Already have an account? log in
          </button>
        </form>
      </div>
    </>
  );
};
