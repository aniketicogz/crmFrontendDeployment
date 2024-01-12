"use client";
import Button from "@components/button/button";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const defaultData = {
  name: "",
};

const defaultErrors = {
  name: null,
};

const ProductForm = ({ params }) => {
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const router = useRouter();
  const productId = params.productId;

  // MODULE FORM DATA & ERRORS
  const [formData, setFormData] = useState(defaultData);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormErrors({ ...formErrors, [name]: "This field is required" });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
    updateFields({ ...formData, [name]: value });
  };

  // WHEN USER CLICK ON THE FORM SUBMIT BUTTON IF THE USER IS CREATING MODULE
  // THEN THE MODULE ID WILL BE CREATE AND IF THE USER IS EDITING THE EXISTING
  // MODULE THEN IT WILL SHOW THE RESPECTIVE MODULE ID
  const onSubmitBtnClickHandler = () => {
    if (productId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`product/${productId}`, formData, "Product Updated Successfully");
  };

  const handleCreateRecord = async () => {
    await createRecordAPI.postData("product", formData, "Product Created Successfully");
  };

  // ROUTE TO ALL MODULES TABLE IF MODULE IS CREATED SUCCESSFULLY
  useEffect(() => {
    if (createRecordAPI.data === "success") {
      router.push("/product");
    }
  }, [createRecordAPI.apiStatus.isLoaded]);

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (productId !== "create") {
      getSingleRecordAPI.fetchData(`product/${productId}`);
    }
  }, [productId]);

  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      updateFields({ name: getSingleRecordAPI.data.data.name });
    }
  }, [getSingleRecordAPI.data]);

  // ROUTE TO ALL MODULES TABLE IF MODULE IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/product");
    }
  }, [updateRecordAPI.apiStatus.isLoaded]);

  console.log("formData", formData);

  return (
    <Wrapper>
      <div className="card">
        <div className="body">
          <Form>
            <div className="grid grid-cols-3">
              <div className="form-group">
                <InputField type="text" name="name" placeholder="Enter product name" label="Product Name*" value={formData.name || ""} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.name} />
              </div>
            </div>
            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/product")}>
                Back to all products
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler} disabled={formData.name === "" ? true : false}>
                {productId === "create" ? "Create Product" : "Update Product"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductForm;
