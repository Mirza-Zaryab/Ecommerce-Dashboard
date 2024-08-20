import "./Profile.scss";

import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Input, Form } from "antd";

import Topbar from "../../Components/Layout/Topbar";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { putRequestFormData } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);

  // const [image, setImage] = useState("");
  const [imageState, setImageState] = useState(null);
  const [imageUpState, setImageUpState] = useState(null);

  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [email, setEmail] = useState(user?.email);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        // Form validation failed
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target;

    if (file) {
      setImageState(URL.createObjectURL(file.files[0]));
      const blob = new Blob([file.files[0]], { type: file.files[0].type });
      setImageUpState(blob);
    }
  };

   console.log(imageUpState, 'Images-------')
  const doUpdate = async (e) => {
    e.preventDefault();
    const body = {
      first_name: firstName,
      last_name: lastName,
      // email: email,
      profile_image: imageUpState
    };

    const onSuccess = (res) => {
      console.log('res____________',res)
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      
      // setAnyState(res.)
    })
   }
    const onError = (err) => {
      console.log('err___', err)
      toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
    });        // handle error
    }

    await putRequestFormData(body, routes.updateProfile, true, onSuccess, onError)

    console.log("e");
  };

  return (
    <div className="profile-page">
      <ToastContainer />
      <Topbar />
      <h1>Profile</h1>
      <div className="profile-image-wrapper">
        {imageState ? (
          <label htmlFor="image-upload-input" className="label-in-place">
            <img src={imageState} alt="profile-img" />
          </label>
        ) : user?.profile_image ? (
          <label htmlFor="image-upload-input" className="label-in-place">
          <img src={user.profile_image} alt="profile-img" />
          </label>
        ) : (
          <label htmlFor="image-upload-input" className="label-in-place">
            <ReactSVG src="./tools-icons/upload.svg" />
            Upload image
          </label>
        )}

        <div className="image-upload-button">
          {/* {imageState && (
            <label htmlFor="image-upload-input">
              <ReactSVG src="./tools-icons/upload.svg" />
              Update image
            </label>
          )} */}

          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <Form
        form={form}
        onSubmitCapture={doUpdate}
        // onFinish={doUpdate}
        className="profile-page-inputs"
      >
        <Form.Item
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input type="text" name="firstName" placeholder={user.first_name} />
        </Form.Item>
        <Form.Item
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input type="text" name="lastName" placeholder={user.last_name} />
        </Form.Item>
        {/* <Form.Item
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input type="email" name="email" placeholder={user.email} />
        </Form.Item> */}
        <div className="profile-page-buttons">
          <h3 className="cancel-button" onClick={backHandler} >Cancel</h3>
          <PrimaryButton type="submit">Update &amp; save</PrimaryButton>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
