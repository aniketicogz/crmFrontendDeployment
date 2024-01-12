"use client";
import Button from "@components/button/button";
import DropdownInputField from "@components/form/DropdownField";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import { getSelectedValueObjectFromArrayOfObjectsUsingKey } from "@lib/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const moduleDefaultData = {
  fromCurrency: "",
  toCurrency: "",
  rate: 1,
};

const moduleDefaultErrors = {
  fromCurrency: null,
  toCurrency: null,
  rate: null,
};

const CurrencyConversionRateForm = ({ params }) => {
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const router = useRouter();
  const currencyconversionrateId = params.currencyconversionrateId;

  // MODULE FORM DATA & ERRORS
  const [formData, setFormData] = useState(moduleDefaultData);
  const [formErrors, setFormErrors] = useState(moduleDefaultErrors);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const CurrencyDropdownOptions = [
    {
      label: "India Rupee",
      value: "INR",
    },
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "Canadian Dollar",
      value: "CAD",
    },
    {
      label: "Euro",
      value: "EUR",
    },
    {
      label: "Saudi Riyal",
      value: "SAR",
    },
    {
      label: "Kuwaiti Dinar",
      value: "KWD",
    },
    {
      label: "British Pound",
      value: "GBP",
    },
    {
      label: "UAE Dirhams",
      value: "AED",
    },
  ];
  // FROM CURRENCY
  const [fromCurrencyData, setFromCurrencyData] = useState(CurrencyDropdownOptions);
  const [fromCurrencySelectedValue, setFromCurrencySelectedValue] = useState(null);
  const onFromCurrencyChangeHandler = (selectedOptions) => {
    setFromCurrencySelectedValue(selectedOptions);
    updateFields({ fromCurrency: selectedOptions.value });
  };

  // TO CURRENCY
  const [toCurrencyData, setToCurrencyData] = useState(CurrencyDropdownOptions);
  const [toCurrencySelectedValue, setToCurrencySelectedValue] = useState(null);
  const onToCurrencyChangeHandler = (selectedOptions) => {
    setToCurrencySelectedValue(selectedOptions);
    updateFields({ toCurrency: selectedOptions.value });
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
    if (currencyconversionrateId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`currencyconversion/${currencyconversionrateId}`, formData, "Currency Conversion Rate Updated Successfully");
  };

  const handleCreateRecord = async () => {
    await createRecordAPI.postData("currencyconversion", formData, "Currency Conversion Rate Created Successfully");
  };

  // ROUTE TO ALL MODULES TABLE IF MODULE IS CREATED SUCCESSFULLY
  useEffect(() => {
    if (createRecordAPI.data === "success") {
      router.push("/currencyconversionrates");
    }
  }, [createRecordAPI.apiStatus.isLoaded]);

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (currencyconversionrateId !== "create") {
      getSingleRecordAPI.fetchData(`currencyconversion/${currencyconversionrateId}`);
    }
  }, [currencyconversionrateId]);

  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      updateFields({ fromCurrency: getSingleRecordAPI.data.data.fromCurrency, toCurrency: getSingleRecordAPI.data.data.toCurrency, rate: getSingleRecordAPI.data.data.rate });
      setFromCurrencySelectedValue(getSelectedValueObjectFromArrayOfObjectsUsingKey(getSingleRecordAPI.data.data.fromCurrency, fromCurrencyData));
      setToCurrencySelectedValue(getSelectedValueObjectFromArrayOfObjectsUsingKey(getSingleRecordAPI.data.data.toCurrency, toCurrencyData));
    }
  }, [getSingleRecordAPI.data]);

  // ROUTE TO ALL CURRENCY RATES TABLE IF UPDATE IS SUCCESSFULL
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/currencyconversionrates");
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
                <DropdownInputField label="From Currency*" options={fromCurrencyData} selectedValue={fromCurrencySelectedValue} placeholder={"Select from currency"} onChangeHandler={onFromCurrencyChangeHandler} />
              </div>
              <div className="form-group">
                <DropdownInputField label="To Currency*" options={toCurrencyData} selectedValue={toCurrencySelectedValue} placeholder={"Select from currency"} onChangeHandler={onToCurrencyChangeHandler} />
              </div>
              <div className="form-group">
                <InputField type="number" name="rate" placeholder="Currency Conversion Rate" label="Currency Conversion Rate*" value={formData.rate || ""} onChange={handleInputChange} onBlur={handleInputChange} error={formErrors.rate} />
              </div>
            </div>
            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/currencyconversionrates")}>
                Back to all Currency Conversions
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler} disabled={isSubmitBtnDisabled}>
                {currencyconversionrateId === "create" ? "Create Currency Conversion Rate" : "Update Currency Conversion Rate"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrencyConversionRateForm;
