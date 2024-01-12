"use client";
import Button from "@components/button/button";
import DropdownInputField from "@components/form/DropdownField";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const moduleDefaultData = {
  product: "",
  name: "",
  defaultCost: 0,
};

const moduleDefaultErrors = {
  product: null,
  name: null,
  defaultCost: null,
};

const ModuleForm = ({ params }) => {
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const getAllProductRecordAPI = useApi();
  const router = useRouter();
  const moduleId = params.moduleId;

  // MODULE FORM DATA & ERRORS
  const [formData, setFormData] = useState(moduleDefaultData);
  const [formErrors, setFormErrors] = useState(moduleDefaultErrors);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // PRODUCT
  const [allProductData, setAllProductData] = useState([]);
  const [productSelectedValue, setProductSelectedValue] = useState(null);
  const onProductChangeHandler = (selectedOptions) => {
    setProductSelectedValue(selectedOptions);
    updateFields({ product: selectedOptions.value });
  };

  // GET ALL PRODUCTS DATA CREATED BY ADMIN
  useEffect(() => {
    getAllProductRecords();
  }, []);

  const getAllProductRecords = useCallback(async () => {
    await getAllProductRecordAPI.fetchData(`product/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllProductRecordAPI.apiStatus.isLoading && getAllProductRecordAPI.apiStatus.isLoaded && getAllProductRecordAPI.data !== null) {
      let allData = getAllProductRecordAPI?.data?.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record?.name,
          value: record?._id,
        });
      });
      setAllProductData(allFormattedRecords);
    }
  }, [getAllProductRecordAPI.data]);

  // MODUEL NAME
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
    if (moduleId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`module/${moduleId}`, formData, "Module Updated Successfully");
  };

  const handleCreateRecord = async () => {
    await createRecordAPI.postData("module", formData, "Module Created Successfully");
  };

  // ROUTE TO ALL MODULES TABLE IF MODULE IS CREATED SUCCESSFULLY
  useEffect(() => {
    if (createRecordAPI.data === "success") {
      router.push("/module");
    }
  }, [createRecordAPI.apiStatus.isLoaded]);

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (moduleId !== "create") {
      getSingleRecordAPI.fetchData(`module/${moduleId}`);
    }
  }, [moduleId]);

  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      getAllProductRecordAPI?.data?.data?.map((product) => {
        if (getSingleRecordAPI.data.data.product === product._id) {
          setProductSelectedValue({
            label: product.name,
            value: product._id,
          });
        }
      });

      updateFields({ product: getSingleRecordAPI.data.data.product, name: getSingleRecordAPI.data.data.name, defaultCost: getSingleRecordAPI.data.data.defaultCost });
    }
  }, [getSingleRecordAPI.data, getAllProductRecordAPI.data]);

  // ROUTE TO ALL MODULES TABLE IF MODULE IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/module");
    }
  }, [updateRecordAPI.apiStatus.isLoaded]);

  const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  useEffect(() => {
    if (formData.name === "" || formData.product === "" || formData.defaultCost === 0) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  }, [formData]);

  return (
    <Wrapper>
      <div className="card">
        <div className="body">
          <Form>
            <div className="grid grid-cols-3">
              <div className="form-group">
                <DropdownInputField label="Product*" options={allProductData} selectedValue={productSelectedValue} loading={getAllProductRecordAPI.apiStatus.isLoading} placeholder={"Select product"} onChangeHandler={onProductChangeHandler} />
              </div>
              <div className="form-group">
                <InputField type="text" name="name" placeholder="Module name" label="Module Name*" value={formData.name || ""} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.name} />
              </div>
              <div className="form-group">
                <InputField type="number" name="defaultCost" placeholder="Module default cost" label="Module Default Cost*" value={formData.defaultCost || ""} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.defaultCost} />
              </div>
            </div>
            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/module")}>
                Back to all modules
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler} disabled={isSubmitBtnDisabled}>
                {moduleId === "create" ? "Create Module" : "Update Module"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ModuleForm;
