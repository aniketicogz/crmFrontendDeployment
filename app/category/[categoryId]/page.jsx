"use client";
import Button from "@components/button/button";
import InputComponent from "@components/form/input";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const defaultData = {
  name: "",
};

const defaultErrors = {
  name: null,
};

const CategoryForm = ({ params }) => {
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const router = useRouter();
  const categoryId = params.categoryId;

  // MODULE FORM DATA & ERRORS
  const [categoryFormData, setCategoryFormData] = useState(defaultData);
  const [categoryFormErrors, setCategoryFormErrors] = useState(defaultErrors);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setCategoryFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // UPDATE FORM ERRORS
  const updateErrors = (fields) => {
    setCategoryFormErrors((prev) => {
      return { ...prev, ...fields };
    });
  };

  // NAME CHANGE HANDLER
  const [isNameInputFieldValid, setNameInputFieldValid] = useState(true);
  const onNameChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setNameInputFieldValid(true);
      updateErrors({ name: null });
    } else {
      setNameInputFieldValid(false);
      updateErrors({ name: "Name is required" });
    }
    updateFields({ name: value });
  };

  // WHEN USER CLICK ON THE FORM SUBMIT BUTTON IF THE USER IS CREATING MODULE
  // THEN THE MODULE ID WILL BE CREATE AND IF THE USER IS EDITING THE EXISTING
  // MODULE THEN IT WILL SHOW THE RESPECTIVE MODULE ID
  const onSubmitBtnClickHandler = () => {
    if (categoryId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`category/${categoryId}`, categoryFormData, "Category Updated Successfully");
  };

  const handleCreateRecord = async () => {
    await createRecordAPI.postData("category", categoryFormData, "Category Created Successfully");
  };

  // ROUTE TO ALL MODULES TABLE IF MODULE IS CREATED SUCCESSFULLY
  useEffect(() => {
    if (createRecordAPI.data === "success") {
      router.push("/category");
    }
  }, [createRecordAPI.apiStatus.isLoaded]);

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (categoryId !== "create") {
      getSingleRecordAPI.fetchData(`category/${categoryId}`);
    }
  }, [categoryId]);

  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      updateFields({ name: getSingleRecordAPI.data.category.name });
    }
  }, [getSingleRecordAPI.data]);

  // ROUTE TO ALL MODULES TABLE IF MODULE IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/category");
    }
  }, [updateRecordAPI.apiStatus.isLoaded]);

  return (
    <Wrapper>
      <div className="card">
        <div className="body">
          <form>
            <InputComponent inputid="name" label="Category Name" value={categoryFormData.name} onChange={onNameChangeHandler} onBlur={onNameChangeHandler} isInputValid={isNameInputFieldValid} placeholder="Please Enter Category Name" error={categoryFormErrors.name} />
            <div className="grid w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/category")}>
                Back to all categorys
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler}>
                {categoryId === "create" ? "Create Category" : "Update Category"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryForm;
