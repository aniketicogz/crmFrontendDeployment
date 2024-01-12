"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/button/button";
import InputComponent from "@components/form/input";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";

const defaultData = {
  name: "",
  stage: 0,
};

const defaultErrors = {
  name: null,
  stage: null,
};

const SalesstageForm = ({ params }) => {
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const router = useRouter();
  const salesstageId = params.salesstageId;

  // MODULE FORM DATA & ERRORS
  const [formData, setformData] = useState(defaultData);
  const [formErrors, setFormErrors] = useState(defaultErrors);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setformData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // UPDATE FORM ERRORS
  const updateErrors = (fields) => {
    setFormErrors((prev) => {
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
    if (salesstageId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  // CREATE
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  const handleCreateRecord = async () => {
    await createRecordAPI.postData("salesstage", formData, "Sales Stage Created Successfully");
  };

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  // UPDATE
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`salesstage/${salesstageId}`, formData, "Sales Stage Updated Successfully");
  };

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE SUBMODULE DATA
  useEffect(() => {
    if (salesstageId !== "create" && getSingleRecordAPI.data === null) {
      handleSingleRecord();
    }
  }, [salesstageId, getSingleRecordAPI.data]);

  const handleSingleRecord = useCallback(async () => {
    await getSingleRecordAPI.fetchData(`salesstage/${salesstageId}`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded && getSingleRecordAPI.data !== null) {
      updateFields({ name: getSingleRecordAPI.data.data.name, stage: getSingleRecordAPI.data.data.stage });
    }
  }, [getSingleRecordAPI.data]);

  // ROUTE TO ALL SUBMODULES TABLE IF MODULE IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (salesstageId !== "create") {
      if (updateRecordAPI.data === "success") {
        router.push("/salesstage");
      }
    } else {
      if (createRecordAPI.data === "success") {
        router.push("/salesstage");
      }
    }
  }, [updateRecordAPI.data, createRecordAPI.data]);

  const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  useEffect(() => {
    if (formData.name === "" || formData.stage === 0) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  }, [formData]);

  console.log("formData", formData);

  return (
    <Wrapper>
      <div className="card">
        <div className="body">
          <Form>
            <div className="grid grid-cols-3">
              <div className="form-group">
                <InputField type="text" name="name" placeholder="Enter sales stage name*" label="Sales Stage Name*" value={formData.name || ""} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.name} />
              </div>
              <div className="form-group">
                <InputField type="number" name="stage" placeholder="Enter sales stage %*" label="Sales Stage %*" value={formData.stage || 0} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.stage} />
              </div>
            </div>
            {/* ERROR SECTION STARTS */}
            <div className="grid w-100 flex justify-between items-center">{createRecordAPI.apiStatus.error && createRecordAPI.apiStatus.error}</div>
            {/* ERROR SECTION ENDS */}
            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/salesstage")}>
                Back to all Sales Stages
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler} disabled={isSubmitBtnDisabled}>
                {salesstageId === "create" ? "Create Sales Stage" : "Update Sales Stage"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default SalesstageForm;
