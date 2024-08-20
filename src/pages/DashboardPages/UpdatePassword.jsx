import React, { useState } from "react";
import { Input, Form } from "antd";

import Topbar from "../../Components/Layout/Topbar";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import "./UpdatePassword.scss";
import { ToastContainer, toast } from 'react-toastify';
import { putRequest } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";

const UpdatePassword = () => {

    
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasword = async (e) => {
    e.preventDefault();
    const body = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword
    };

    const onSuccess = (res) => {
      // console.log('res____________',res)
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      
      // setAnyState(res.)
    })
   }
    const onError = (err) => {
      // console.log('err___', err)
      toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
    });        // handle error
    }

    await putRequest(body, routes.changePassword, true, onSuccess, onError)

    console.log("e");
  };



  const [formValues, setFormValues] = useState({
    currentPassword: "",
    password: "",
    confirm: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Helper Functions
  const validateForm = () => {
    const errors = {};

    if (!formValues.currentPassword) {
      errors.currentPassword = "Please input your current password";
    }

    if (!formValues.password) {
      errors.password = "Please input your new password";
    }

    if (formValues.password !== formValues.confirm) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // submit form here
      console.log(formValues);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({ ...prevFormErrors, [name]: "" }));
  };

  return (
    <div className="update-password-page">
      <ToastContainer />
      <Topbar />
      <div className="update-password-wrapper">
        <h2>Update Password</h2>
        <Form onSubmitCapture={changePasword} className="form-update-password">
          <Form.Item
            onChange={(e) => setOldPassword(e.target.value)}
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password",
              },
            ]}
            validateStatus={formErrors.currentPassword ? "error" : ""}
            help={formErrors.currentPassword}
          >
            <Input.Password
              name="currentPassword"
              value={formValues.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />
          </Form.Item>
          <Form.Item
            onChange={(e) => setNewPassword(e.target.value)}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password",
              },
            ]}
            validateStatus={formErrors.password ? "error" : ""}
            help={formErrors.password || formErrors.confirm}
          >
            <Input.Password
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="New password"
            />
          </Form.Item>
          <Form.Item
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirm"
            dependencies={["password"]}
            validateStatus={formErrors.confirm ? "error" : ""}
            help={formErrors.confirm}
            rules={[
              {
                required: true,
                message: "Please confirm your new password",
              },
            ]}
          >
            <Input.Password
              name="confirm"
              value={formValues.confirm}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </Form.Item>
          <Form.Item>
            <PrimaryButton type="submit">Update Password</PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
