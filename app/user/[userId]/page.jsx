"use client";
import Button from "@components/button/button";
import Dropdown from "@components/dropdown/dropdown";
import DropdownInputField from "@components/form/DropdownField";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";
import RadioInput from "@components/form/RadioInput";
import InputComponent from "@components/form/input";
import RadioButtonComponent from "@components/form/radio";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import { getMultiSelectedValueObjectFromArrayOfObjectsUsingKey, getSelectedValueObjectFromArrayOfObjectsUsingKey, removeOptionsFromDropdown } from "@lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const userDefaultData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobileNo: "",
  department: "",
  designation: "",
  reportingManager: "",
  reportee: [],
  region: "",
  isAdmin: false,
  isPartner: false,
  isLeader: false,
};

const userDefaultErrors = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  mobileNo: null,
};

const UserForm = ({ params }) => {
  const router = useRouter();
  const userId = params.userId;

  // API CALLS
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const getAllUsersRecordAPI = useApi(); // GET ALL USER DATA

  // USER FORM DATA & ERROS
  const [userFormData, setUserFormData] = useState(userDefaultData);
  const [userFormErrors, setUserFormErrors] = useState(userDefaultErrors);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (userId !== "create") {
      getSingleRecordAPI.fetchData(`user/${userId}`);
    }
  }, [userId]);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setUserFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // UPDATE FORM ERROS
  const updateErrors = (fields) => {
    setUserFormErrors((prev) => {
      return { ...prev, ...fields };
    });
  };

  // ADMIN
  const adminOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  const [selectedAdminOption, setSelectedAdminOption] = useState(adminOptions[1]);
  const handleAdminOptionChange = (e) => {
    let booleanValue = JSON.parse(e.target.value);
    setSelectedAdminOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(e.target.value, adminOptions));
    updateFields({ isAdmin: booleanValue });
  };

  // LEADER
  const leaderOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  const [selectedLeaderOption, setSelectedLeaderOption] = useState(leaderOptions[1]);
  const handleLeaderOptionChange = (e) => {
    let booleanValue = JSON.parse(e.target.value);
    setSelectedLeaderOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(e.target.value, leaderOptions));
    updateFields({ isLeader: booleanValue });
  };

  // LEADER
  const partnerOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  const [selectedPartnerOption, setSelectedPartnerOption] = useState(partnerOptions[1]);
  const handlePartnerOptionChange = (e) => {
    let booleanValue = JSON.parse(e.target.value);
    setSelectedPartnerOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(e.target.value, partnerOptions));
    updateFields({ isPartner: booleanValue });
  };

  // FIRST NAME
  const [isFirstNameInputFieldIsValid, setFirstNameInputFieldIsValid] = useState(true);
  const onFirstNameChangeHandler = (enteredValue) => {
    console.log("enteredValue", enteredValue.target);
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setFirstNameInputFieldIsValid(true);
      updateErrors({ firstName: null });
    } else {
      setFirstNameInputFieldIsValid(false);
      updateErrors({ firstName: "First Name is required" });
    }
    updateFields({ firstName: value });
  };

  // LAST NAME
  const [isLastNameInputFieldIsValid, setLastNameInputFieldIsValid] = useState(true);
  const onLastNameChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setLastNameInputFieldIsValid(true);
      updateErrors({ lastName: null });
    } else {
      setLastNameInputFieldIsValid(false);
      updateErrors({ lastName: "Last Name is required" });
    }
    updateFields({ lastName: value });
  };

  // EMAIL
  const [isEmailInputFieldIsValid, setEmailInputFieldIsValid] = useState(true);
  const onEmailChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setEmailInputFieldIsValid(true);
      updateErrors({ email: null });
    } else {
      setEmailInputFieldIsValid(false);
      updateErrors({ email: "Email is required" });
    }
    updateFields({ email: value });
  };

  // PASSWORD
  const [isPasswordInputFieldIsValid, setPasswordInputFieldIsValid] = useState(true);
  const onPasswordChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setPasswordInputFieldIsValid(true);
      updateErrors({ password: null });
    } else {
      setPasswordInputFieldIsValid(false);
      updateErrors({ password: "Password is required" });
    }
    updateFields({ password: value });
  };

  // MOBILE NO
  const [isMobileNoInputFieldIsValid, setMobileNoInputFieldIsValid] = useState(true);
  const onMobileNoChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setMobileNoInputFieldIsValid(true);
      updateErrors({ mobileNo: null });
    } else {
      setMobileNoInputFieldIsValid(false);
      updateErrors({ mobileNo: "Mobile No is required" });
    }
    updateFields({ mobileNo: value });
  };

  // DEPARTMENT
  const [isDepartmentInputFieldIsValid, setDepartmentInputFieldIsValid] = useState(true);
  const onDepartmentChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    // if (value.trim() !== "") {
    //   setDepartmentInputFieldIsValid(true);
    //   updateErrors({ department: null });
    // } else {
    //   setDepartmentInputFieldIsValid(false);
    //   updateErrors({ department: "Department is required" });
    // }
    updateFields({ department: value });
  };

  // DESIGNATION
  const [isDesignationInputFieldIsValid, setDesignationInputFieldIsValid] = useState(true);
  const onDesignationChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    // if (value.trim() !== "") {
    //   setDesignationInputFieldIsValid(true);
    //   updateErrors({ designation: null });
    // } else {
    //   setDesignationInputFieldIsValid(false);
    //   updateErrors({ designation: "Designation is required" });
    // }
    updateFields({ designation: value });
  };

  // REPORTING MANAGER
  const ReportingManagerDropdownOptions = [
    { label: "Amit Tripathi", value: "amittripathi" },
    { label: "Shahan Degamwala", value: "shahandegamwala" },
    { label: "Rohan Noronha", value: "rohannoronha" },
  ];
  const [allReportingManagerData, setAllReportingManagerData] = useState(ReportingManagerDropdownOptions);
  const [reportingManagerSelectedValue, setReportingManagerSelectedValue] = useState(null);
  const [allReportingManagerDataStatus, setAllReportingManagerDataStatus] = useState({
    isLoading: false,
    isLoaded: false,
    error: null,
  });
  const onReportingManagerChangeHandler = (selectedOptions) => {
    setReportingManagerSelectedValue(selectedOptions);
    updateFields({ reportingManager: selectedOptions.value });
  };

  // GET USERS DATA
  useEffect(() => {
    getAllUsersRecords();
  }, []);

  const getAllUsersRecords = useCallback(async () => {
    await getAllUsersRecordAPI.fetchData(`user/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllUsersRecordAPI.apiStatus.isLoading && getAllUsersRecordAPI.apiStatus.isLoaded && getAllUsersRecordAPI.data !== null) {
      let allData = getAllUsersRecordAPI.data.data;

      let allUsersData = [];
      allData.map((user) => {
        allUsersData.push({
          label: `${user.firstName} ${user.lastName}`,
          value: user._id,
        });
      });

      setAllReportingManagerData(allUsersData);
    }
  }, [getAllUsersRecordAPI.data]);

  // REPORTEE
  const ReporteeDropdownOptions = [
    { label: "Amit Tripathi", value: "amittripathi" },
    { label: "Shahan Degamwala", value: "shahandegamwala" },
    { label: "Rohan Noronha", value: "rohannoronha" },
    { label: "Manoj Yadav", value: "manojyadav" },
    { label: "Jigar Unadkat", value: "jigarunadkat" },
  ];
  const [allReporteeData, setAllReporteeData] = useState(ReporteeDropdownOptions);
  const [reporteeSelectedValue, setReporteeSelectedValue] = useState([]);
  const [allReporteeDataStatus, setAllReporteeDataStatus] = useState({
    isLoading: false,
    isLoaded: false,
    error: null,
  });
  const onReporteeChangeHandler = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setReporteeSelectedValue(selectedOptions);
    updateFields({ reportee: selectedValues });
  };

  useEffect(() => {
    if (reportingManagerSelectedValue !== null) {
      let updatedArr = removeOptionsFromDropdown(reportingManagerSelectedValue, allReporteeData);
      setAllReporteeData(updatedArr);
    }
  }, [reportingManagerSelectedValue]);

  // REGION
  const RegionDropdownOptions = [
    { label: "India", value: "india" },
    { label: "USA", value: "usa" },
    { label: "Canada", value: "canada" },
  ];
  const [allRegionData, setAllRegionData] = useState(RegionDropdownOptions);
  const [regionSelectedValue, setRegionSelectedValue] = useState(null);
  const onRegionChangeHandler = (selectedOptions) => {
    setRegionSelectedValue(selectedOptions);
    updateFields({ region: selectedOptions.value });
  };

  // WHEN USER CLICK ON THE FORM SUBMIT BUTTON IF THE USER IS CREATING USER
  // THEN THE USER ID WILL BE CREATE AND IF THE USER IS EDITING THE EXISTING
  // USER THEN IT WILL SHOW THE RESPECTIVE USER ID
  const onSubmitBtnClickHandler = () => {
    if (userId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  // IF USER IS CREATING A NEW USER
  const handleCreateRecord = () => {
    if (userFormData.firstName.length === 0 || userFormData.lastName.length === 0 || userFormData.email.length === 0 || userFormData.password.length === 0 || userFormData.mobileNo.length === 0) {
      errorNotify("Please fill all required fields");
    } else {
      createUser(userFormData);
    }
  };

  // IF USER IS UPDATING THE CREATED USER
  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      updateFields({
        firstName: getSingleRecordAPI.data.data.firstName,
        lastName: getSingleRecordAPI.data.data.lastName,
        email: getSingleRecordAPI.data.data.email,
        password: getSingleRecordAPI.data.data.password,
        mobileNo: getSingleRecordAPI.data.data.mobileNo,
        department: getSingleRecordAPI.data.data.department,
        designation: getSingleRecordAPI.data.data.designation,
        reportingManager: getSingleRecordAPI.data.data.reportingManager,
        reportee: getSingleRecordAPI.data.data.reportee,
        region: getSingleRecordAPI.data.data.region,
        isAdmin: getSingleRecordAPI.data.data.isAdmin,
        isPartner: getSingleRecordAPI.data.data.isPartner,
        isLeader: getSingleRecordAPI.data.data.isLeader,
      });
      setSelectedAdminOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(String(getSingleRecordAPI.data.data.isAdmin), adminOptions));
      setSelectedPartnerOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(String(getSingleRecordAPI.data.data.isPartner), partnerOptions));
      setSelectedLeaderOption(getSelectedValueObjectFromArrayOfObjectsUsingKey(String(getSingleRecordAPI.data.data.isLeader), leaderOptions));

      let reportingManagerSelectedValue = getSelectedValueObjectFromArrayOfObjectsUsingKey(getSingleRecordAPI.data.data.reportingManager, allReportingManagerData);
      setReportingManagerSelectedValue(reportingManagerSelectedValue);

      let reporteeSelectedValue = getMultiSelectedValueObjectFromArrayOfObjectsUsingKey(getSingleRecordAPI.data.data.reportee, allReporteeData);
      setReporteeSelectedValue(reporteeSelectedValue);

      let regionSelectedValue = getSelectedValueObjectFromArrayOfObjectsUsingKey(getSingleRecordAPI.data.data.region, allRegionData);
      setRegionSelectedValue(regionSelectedValue);
    }
  }, [getSingleRecordAPI.data]);

  const handleUpdateRecord = async () => {
    if (userFormData.firstName.length === 0 || userFormData.lastName.length === 0 || userFormData.email.length === 0 || userFormData.password.length === 0 || userFormData.mobileNo.length === 0) {
      errorNotify("Please fill all required fields");
    } else {
      await updateRecordAPI.putData(`user/${userId}`, userFormData, "User Updated Successfully");
    }
  };

  // ROUTE TO ALL USES TABLE IF USER IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/user");
    }
  }, [updateRecordAPI.apiStatus.isLoaded]);

  // CREATE USER
  const [createUserAPIStatus, setCreateUserAPIStatus] = useState({
    isLoading: false,
    isLoaded: false,
    error: null,
  });

  const createUser = useCallback(async (formData) => {
    setCreateUserAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));

    try {
      const url = `${API_URL}user`;

      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        errorNotify(data.error);
        setCreateUserAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: true,
          isLoaded: false,
          error: data.error,
        }));
      } else {
        successNotify("User Created Successfully");
        setCreateUserAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
        router.push("/user");
      }
    } catch (error) {
      console.log("error", error);
      errorNotify(error);
      createUserAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
        isLoaded: false,
        error: error,
      }));
    }
  }, []);

  return (
    <Wrapper>
      <div className="page-header">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link href="/">Home</Link>
          </div>
          <div className="breadcrumb-item">
            <Link href="/user">User</Link>
          </div>
          <div className="breadcrumb-item active">{userId === "create" ? "Create" : `${userFormData.firstName} ${userFormData.lastName}`}</div>
        </div>
        <div className="page-title-wrapper">
          <div className="page-title">{userId === "create" ? "Create User" : "Edit User"}</div>
        </div>
      </div>
      <div className="card">
        <div className="body">
          <Form>
            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">User Role</span>
              <div className="grid grid-cols-3">
                <div className="form-group">
                  <RadioInput name="isAdmin" options={adminOptions} selectedValue={selectedAdminOption.value} onChange={handleAdminOptionChange} label="Is Admin*" />
                </div>
                <div className="form-group">
                  <RadioInput name="isLeader" options={leaderOptions} selectedValue={selectedLeaderOption.value} onChange={handleLeaderOptionChange} label="Is Leader*" />
                </div>
                <div className="form-group">
                  <RadioInput name="isPartner" options={partnerOptions} selectedValue={selectedPartnerOption.value} onChange={handlePartnerOptionChange} label="Is Partner*" />
                </div>
              </div>
            </div>
            
            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">User Personal Details</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <InputField type="text" name="firstName" placeholder="First Name*" label="First Name*" value={userFormData.firstName || ""} onChange={onFirstNameChangeHandler} onBlur={onFirstNameChangeHandler} error={userFormErrors.firstName} />
                </div>
                <div className="form-group">
                  <InputField type="text" name="lastName" placeholder="Last Name*" label="Last Name*" value={userFormData.lastName || ""} onChange={onLastNameChangeHandler} onBlur={onLastNameChangeHandler} error={userFormErrors.lastName} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Region*" options={allRegionData} selectedValue={regionSelectedValue} placeholder={"Select Region"} onChangeHandler={onRegionChangeHandler} />
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <InputField type="number" name="mobileNo" placeholder="Mobile No*" label="Mobile No*" value={userFormData.mobileNo || ""} onChange={onMobileNoChangeHandler} onBlur={onMobileNoChangeHandler} error={userFormErrors.mobileNo} />
                </div>
                <div className="form-group">
                  <InputField type="email" name="email" placeholder="Email*" label="Email*" value={userFormData.email || ""} onChange={onEmailChangeHandler} onBlur={onEmailChangeHandler} error={userFormErrors.email} disabled={userId !== "create"} />
                </div>
                <div className="form-group">
                  <InputField type="password" name="password" placeholder="Password*" label="Password*" value={userFormData.password || ""} onChange={onPasswordChangeHandler} onBlur={onPasswordChangeHandler} error={userFormErrors.password} disabled={userId !== "create"} />
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">User Designation Details</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <InputField type="text" name="department" placeholder="Department" label="Department" value={userFormData.department || ""} onChange={onDepartmentChangeHandler} error={userFormErrors.department} />
                </div>
                <div className="form-group">
                  <InputField type="text" name="designation" placeholder="Designation" label="Designation" value={userFormData.designation || ""} onChange={onLastNameChangeHandler} error={userFormErrors.designation} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Reporting Manager" options={allReportingManagerData} selectedValue={reportingManagerSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select Reporting Manager"} onChangeHandler={onReportingManagerChangeHandler} />
                </div>
              </div>

              <div className="grid grid-cols-3">
              
                <div className="form-group">
                  <DropdownInputField label="Reportee" options={allReporteeData} selectedValue={reporteeSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select Reportee"} onChangeHandler={onReporteeChangeHandler} />
                </div>
                
              </div>
            </div>
            
           
            
            
            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/user")}>
                Back to all users
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler}>
                {userId === "create" ? "Create User" : "Update User"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserForm;
