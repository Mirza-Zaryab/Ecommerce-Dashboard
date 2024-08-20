import "./NewProduct.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../Components/Layout/Topbar";
import { ReactSVG } from "react-svg";
import Breadcrumb from "../../Components/Utilities/BreadCrumb";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import { toast } from "react-toastify";
import { getRequest, postRequestFormData } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import axios from "axios";

const NewProduct = () => {
  // const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState([]);
  const [imageState, setImageState] = useState([]);
  // const [imageUpState, setImageUpState] = useState(null);

  const getCategoryList = async () => {
    const onSuccess = (res) => {
      // console.log('res____________',res)
      setCategories(res.list);
      //   toast.success(res.message, {
      //     position: toast.POSITION.TOP_RIGHT

      //   // setAnyState(res.)
      // })
    };
    const onError = (err) => {
      // console.log('err___', err)
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      }); // handle error
    };

    await getRequest("", routes.categoryListing, true, onSuccess, onError);

    // console.log("e");
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  // Adding Product UseEffect -------------------

  // const handleImageUpload = (event) => {
  //   const file = event.target;

  //   if (file) {
  //     setImageState(URL.createObjectURL(file.files));
  //     const blob = new Blob([file.files[0]], { type: file.files[0].type });
  //     setImageUpState(blob);
  //     setFormState({ ...formState, [images]: file.files });
  //   }
  // };

  const doPost = async (body) => {
    console.log(body);
    const onSuccess = (res) => {
      console.log("res____________", res);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,

        // setAnyState(res.)
      });
    };
    const onError = (err) => {
      console.log("err___", err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      }); // handle error
    };

    await postRequestFormData(
      body,
      routes.addNewProduct,
      true,
      onSuccess,
      onError
    );
  };

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    images: [],
    renderedImgs: [],
    productName: "",
    packagesInStock: "",
    itemsPerPackage: "",
    priceForGroup: "",
    singleBuyPrice: "",
    requiredPeopleForGroup: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const backHandler = () => {
    navigate(-1);
  };

  // const handleImageUpload = (event) => {

  //   const file = event.target.files;
  //   console.log('files',event.target.files)

  //      if (file) {
  //     // setImageState(URL.createObjectURL(file.files));
  //     const blob = new Blob([file.files], { type: file.files.type });
  //     // setImageUpState(blob);
  //     setFormState({ ...formState, [images]: file.files });
  //     setImageState(blob)
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setFormState({ ...formState, images: [...formState.images, reader.result] });
  //   };
  // };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageState(files);
    console.log("files", files);

    files.forEach((file) => {
      if (file) {
        const blob = new Blob([file], { type: file.type });
        // setFormState(prevState => ( { ...prevState, images: [...prevState.images, blob] }));

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFormState({
            ...formState,
            images: [...formState.images, blob],
            renderedImgs: [...formState.renderedImgs, reader.result],
          });
        };
      }
    });
  };

  const handleRemoveImage = () => {
    setFormState({ ...formState, image: null });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const incrementHandler = (name) => {
    setFormState({ ...formState, [name]: ++formState[name] });
  };
  const decrementHandler = (name) => {
    if (formState[name] == 0) return;
    setFormState({ ...formState, [name]: --formState[name] });
  };

  console.log(formState.images, "form state images");

  const handleSubmit = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "x-sh-auth",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl90b2tlbiI6IjJmZmEyMjYwLTFiMTEtMTFlZS1hMTY1LTE3Y2U4OGQwZTc1NSIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE2ODg1NDcxMTJ9.dv9o1Rtevf-0Rmczp4DLYZka8io11XA82L8BF79PfT4"
    );

    var formdata = new FormData();
    formdata.append("cat_id", "64a52fe33989a6a46e6069ba");
    formdata.append("name", "Android TV ");
    formdata.append(
      "desc",
      "65 inch dolby audio voice remote control google asistance chrome cast built in "
    );
    for (const file of imageState) {
      console.log('imageState',file)
      formdata.append("images", file);
    }

    // console.log('imageState',formState.images);
    // return

    // formdata.append("images", fileInput.files[0], "/C:/Users/Lenovo/Pictures/le2.jpg");
    // formdata.append("images", fileInput.files[0], "/C:/Users/Lenovo/Pictures/Led.jpg");
    // formdata.append("images", fileInput.files[0], "/C:/Users/Lenovo/Pictures/led3.jpg");
    formdata.append("price", "400");
    formdata.append("package_in_stock", "60");
    formdata.append("item_per_package", "20");
    formdata.append("group_type", "regular");
    formdata.append("regular", '{"price_for_regular": 350, "no_of_person": 5}');
    formdata.append("chama", "{}");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/product/add_product",
      headers: {
        "Content-Type": "application/json",
        "x-sh-auth":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl90b2tlbiI6IjJmZmEyMjYwLTFiMTEtMTFlZS1hMTY1LTE3Y2U4OGQwZTc1NSIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE2ODg1NDcxMTJ9.dv9o1Rtevf-0Rmczp4DLYZka8io11XA82L8BF79PfT4",
        // ...formdata.getHeaders()
      },
      data: formdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSubmit = async(event) => {
  //   event.preventDefault();
  //   const formData = {};
  //   formData.images = formState.images;
  //   // for(const file of imageState ){
  //   //   console.log('imageState',file)
  //   //   formData.images.push(file)
  //   // }

  //   // imageState.forEach((file) => {
  //   //   formData.('images[]', file);
  //   //   console.log(file)
  //   // });

  //   // console.log('imagestate',formData.images);
  //   // return;
  //   // console.log("submit form initialize");
  //   // const newErrors = validateForm(formState);
  //   // if (Object.keys(newErrors).length > 0) {
  //   //   setErrors(newErrors);
  //   //   return;
  //   // }
  //   // // handle form submission
  //   formData.price =  formState.singleBuyPrice;
  //   formData.name = formState.productName;
  //   formData.desc = formState.description;
  //   formData.package_in_stock = formState.packagesInStock;
  //   formData.item_per_package = formState.itemsPerPackage;
  //   formData.group_type = formState.groupType;
  //   formData.cat_id = formState.cat_id;
  //   formData.regular = JSON.stringify (formState.groupType==='regular' ? {price_for_regular: formState.priceForGroup, no_of_person: formState.requiredPeopleForGroup}: {} )
  //   formData.chama =JSON.stringify(formState.groupType==='chama' ? {price_for_chama: formState.priceForGroup, no_of_person: formState.requiredPeopleForGroup, installment:0}: {} )

  //   console.log(formData.images, ' form data images')
  //   await doPost(formData)

  //   // reset form state
  //   setFormState({
  //     renderedImgs:[],
  //     images: [],
  //     productName: "",
  //     packagesInStock: 0,
  //     itemsPerPackage: 0,
  //     priceForGroup: 0,
  //     singleBuyPrice: 0,
  //     requiredPeopleForGroup: 0,
  //     description: "",
  //   });
  //   setErrors({});
  //   navigate(-1);
  // };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.productName.trim()) {
      errors.productName = "Product name is required";
    }
    if (formData.packagesInStock <= 0) {
      errors.packagesInStock = "Packages in stock must be greater than 0";
    }
    if (formData.itemsPerPackage <= 0) {
      errors.itemsPerPackage = "Items per package must be greater than 0";
    }
    if (formData.priceForGroup <= 0) {
      errors.priceForGroup = "Price for group must be greater than 0";
    }
    if (formData.singleBuyPrice <= 0) {
      errors.singleBuyPrice = "Single buy price must be greater than 0";
    }
    if (formData.requiredPeopleForGroup <= 0) {
      errors.requiredPeopleForGroup =
        "Required people for group must be greater than 0";
    }
    if (formData.images.length <= 0) {
      errors.image = "Atleast 1 image is required";
    }
    if (formData.description.length == "0") {
      errors.description = "Description of product is required";
    }
    return errors;
  };

  // console.log(formState)

  return (
    <div className="new-product-page">
      <Topbar />
      <div className="new-product-main">
        <div className="main-top">
          <ReactSVG
            src="/tools-icons/back-arrow.svg"
            className="back-button"
            onClick={backHandler}
          />
          <div className="page-name-wrapper">
            <h1>Add new product</h1>
            <Breadcrumb />
          </div>
        </div>
        <div className="new-product-form">
          <div className="form-left">
            {formState.renderedImgs[0] ? (
              <>
                <img src={formState.renderedImgs[0]} alt="uploaded" />
                <label htmlFor="image-upload" onClick={handleRemoveImage}>
                  Remove
                </label>
              </>
            ) : (
              <>
                <label className="image-upload-button" htmlFor="image-upload">
                  <ReactSVG src={"/tools-icons/upload-image.svg"} />
                  <span>Upload Image</span>
                </label>
                {errors.image && <p className="form-error">{errors.image}</p>}
              </>
            )}
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <label htmlFor="catgories">Category List</label>
              <select
                className="select-box"
                name="cat_id"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.cat_name}
                  </option>
                ))}
              </select>

              <input
                className="product-name"
                type="text"
                name="productName"
                placeholder="Product name"
                value={formState.productName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.productName && (
                <p className="form-error">{errors.productName}</p>
              )}
              <div className="complex-inputs-wrapper">
                <div>
                  <div className="plus-minus-wrapper">
                    <label htmlFor="packagesInStock">Packages in stock</label>
                    <div className="plus-minus-input">
                      <SecondaryButton
                        type="button"
                        className="form-minus-button"
                        onClick={() => {
                          decrementHandler("packagesInStock");
                        }}
                      >
                        -
                      </SecondaryButton>
                      <input
                        value={formState.packagesInStock}
                        name="packagesInStock"
                        placeholder="0"
                        min={0}
                        type="number"
                        step={1}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <SecondaryButton
                        type="button"
                        onClick={() => {
                          incrementHandler("packagesInStock");
                        }}
                        className="form-plus-button"
                      >
                        +
                      </SecondaryButton>
                    </div>
                  </div>
                  {errors.packagesInStock && (
                    <p className="form-error">{errors.packagesInStock}</p>
                  )}
                </div>
                <div>
                  <div className="plus-minus-wrapper">
                    <label htmlFor="itemsPerPackage">Items per package</label>
                    <div className="plus-minus-input">
                      <SecondaryButton
                        type="button"
                        className="form-minus-button"
                        onClick={() => {
                          decrementHandler("itemsPerPackage");
                        }}
                      >
                        -
                      </SecondaryButton>
                      <input
                        value={formState.itemsPerPackage}
                        name="itemsPerPackage"
                        placeholder="0"
                        min={0}
                        type="number"
                        step={1}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <SecondaryButton
                        type="button"
                        className="form-plus-button"
                        onClick={() => {
                          incrementHandler("itemsPerPackage");
                        }}
                      >
                        +
                      </SecondaryButton>
                    </div>
                  </div>
                  {errors.itemsPerPackage && (
                    <p className="form-error">{errors.itemsPerPackage}</p>
                  )}
                </div>
              </div>
              <input
                value={formState.singleBuyPrice}
                name="singleBuyPrice"
                type="number"
                placeholder="Single buy price"
                min={0}
                step={0.1}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.singleBuyPrice && (
                <p className="form-error">{errors.singleBuyPrice}</p>
              )}

              <label> Group buy type </label>

              <div className="group">
                <input
                  type="radio"
                  id="radio1"
                  name="groupType"
                  value="regular"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label htmlFor="radio1">Regular Group</label>
                <input
                  type="radio"
                  id="radio2"
                  name="groupType"
                  value="chama"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label htmlFor="radio2">Chama Group</label>
              </div>

              <input
                value={formState.priceForGroup}
                name="priceForGroup"
                type="number"
                placeholder="Price for group"
                min={0}
                step={0.1}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.priceForGroup && (
                <p className="form-error">{errors.priceForGroup}</p>
              )}
              <input
                value={formState.requiredPeopleForGroup}
                name="requiredPeopleForGroup"
                type="number"
                placeholder="Required people for group"
                min={0}
                step={1}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.requiredPeopleForGroup && (
                <p className="form-error">{errors.requiredPeopleForGroup}</p>
              )}
              <textarea
                value={formState.description}
                name="description"
                placeholder="Description"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.description && (
                <p className="form-error">{errors.description}</p>
              )}
              <div className="submit-form-buttons">
                <h3 onClick={backHandler}>Cancel</h3>
                <PrimaryButton className="submit-form-button" type="submit">
                  Add & save
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
