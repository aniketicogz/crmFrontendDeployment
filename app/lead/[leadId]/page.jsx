"use client";
import { DatepickerCalendar } from "@components/datepicker/datepicker";
import CheckboxGroupInput from "@components/form/CheckboxGroupInput";
import CheckboxInput from "@components/form/CheckboxInput";
import Form from "@components/form/Form";
import InputField from "@components/form/InputField";
import RadioInput from "@components/form/RadioInput";
import Wrapper from "@components/helpers/wrapper";
import useApi from "@components/hooks/useApi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropdownInputField from "@components/form/DropdownField";
import Button from "@components/button/button";
import deleteIcon from "../../../public/assets/icons/delete.svg";

const defaultData = {
  date: new Date(),
  name: "",
  leadership: "",
  source: "",
  owner: "",
  supports: [],
  clientName: "",
  clientCategory: "",
  clienOthertCategory: "",
  clientCountry: "",
  clientState: "",
  clientCity: "",
  keyContact: [],
  managementBoardOfDirectors: [],
  managementIndependentDirectors: [],
  managementAgencies: [],
  revenue: [],
  spendsMarketingMediaSpends: [],
  spendsMediaSpends: [],
  spendsDigitalMediaSpends: [],
  projectType: "New",
  projectStatus: "",
  projectSalesCycle: "",
  projectProdcts: [],
  currency: "",
  projectValue: [],
  projectProdctsModules: [],
  projectEstimationCost: 0,
  projectDuration: 0,
  projectFinalPO: 0,
  projectEstimatedGoLiveDate: new Date(),
  projectGoLiveDate: new Date(),
  comments: [],
};

const defaultErrors = {
  date: null,
  name: null,
  leadership: null,
  source: null,
  owner: null,
  clientName: null,
  clientCategory: null,
  clienOthertCategory: null,
  clientCountry: null,
  clientCity: null,
  projectType: null,
  projectStatus: null,
  projectProdcts: null,
  projectProdctsModules: null,
  currency: null,
  projectEstimationCost: null,
  projectDuration: null,
  projectFinalPO: null,
  projectEstimatedGoLiveDate: null,
  comments: null,
};

const LeadForm = ({ params }) => {
  const leadId = params.leadId;
  const router = useRouter();
  const auth = useSelector((state) => state.persistedReducer.auth.value);

  // API CALLS
  const createRecordAPI = useApi();
  const getSingleRecordAPI = useApi();
  const updateRecordAPI = useApi();
  const getAllUsersRecordAPI = useApi(); // GET ALL USER DATA
  const getAllCategoryRecordAPI = useApi(); // GET ALL CATEGORIES DATA CREATED BY ADMIN
  const getAllCountryRecordAPI = useApi(); // GET ALL COUNTRIES DATA
  const getAllStateRecordAPI = useApi(); // GET ALL STATES DATA
  const getAllCityRecordAPI = useApi(); // GET ALL CITIES DATA
  const getAllStatusStatesRecordAPI = useApi(); // GET ALL SALES STATES DATA
  const getAllProductRecordAPI = useApi(); // GET ALL PRODUCTS DATA
  const getAllModuleRecordAPI = useApi(); // GET ALL MODULES DATA
  const getAllCurrencyRecordAPI = useApi(); // GET ALL CURRENCY DATA
  const getAllCurrencyRateRecordAPI = useApi(); // GET ALL CURRENCY RATES DATA

  // FORM DATA
  const [formData, setFormData] = useState(defaultData);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // FORM ERRORS
  const [formErrors, setFormErrors] = useState(defaultErrors);

  // UPDATE FORM ERRORS
  const updateErrors = (fields) => {
    setFormErrors((prev) => {
      return { ...prev, ...fields };
    });
  };

  // TEXT INPUT FIELD VALUE UPDATE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFields({ ...formData, [name]: value });
    if (value === "") {
      setFormErrors({ ...formErrors, [name]: "This field is required" });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  // LEAD DATE
  const [openLeadDatepicker, setLeadDatepickerOpen] = useState(false);
  const onLeadDatepickerClickHandler = (date) => {
    updateFields({ date: date });
  };

  // PROJECT ESTIMATION GO LIVE DATE
  const [openEstimationDatepicker, setEstimationDatepickerOpen] = useState(false);
  const onProjectEstimationGoLiveDatepickerClickHandler = (date) => {
    updateFields({ projectEstimatedGoLiveDate: date });
  };

  // LEADER
  const [allLeadershipData, setAllLeadershipData] = useState([]);
  const [leadershipSelectedValue, setLeadershipSelectedValue] = useState(null);
  const onLeadershipChangeHandler = (selectedOptions) => {
    setLeadershipSelectedValue(selectedOptions);
    updateFields({ leadership: selectedOptions.value });
  };

  // SOURCE / PARTNER
  const [allSourceData, setAllSourceData] = useState([]);
  const [sourceSelectedValue, setSourceSelectedValue] = useState(null);
  const onSourceChangeHandler = (selectedOptions) => {
    setSourceSelectedValue(selectedOptions);
    updateFields({ source: selectedOptions.value });
  };

  // LEAD OWNERS
  const [allLeadOwnersData, setAllLeadOwnersData] = useState([]);
  const [leadOwnersSelectedValue, setLeadOwnersSelectedValue] = useState(null);

  const onLeadOwnersChangeHandler = (selectedOptions) => {
    setLeadOwnersSelectedValue(selectedOptions);
    updateFields({ ...formData, owner: selectedOptions.value });
  };

  // LEAD OWNERS
  const [allLeadSupportsData, setAllLeadSupportsData] = useState([]);
  const [leadSupportsSelectedValue, setLeadSupportsSelectedValue] = useState(null);
  const [allLeadSupportsTable, setAllLeadSupportsTable] = useState([]);

  const onLeadSupportsChangeHandler = (selectedOptions) => {
    setLeadSupportsSelectedValue(selectedOptions);
  };

  const addLeadSupportsEntries = () => {
    if (leadSupportsSelectedValue) {
      setAllLeadSupportsTable([...allLeadSupportsTable, leadSupportsSelectedValue]);
      setAllLeadSupportsData(allLeadSupportsData.filter((option) => option.value !== leadSupportsSelectedValue.value));
      setLeadSupportsSelectedValue(null);
    }
  };

  const onDeleteLeadSupportsEntriesClickHandler = (removedOption) => {
    setAllLeadSupportsTable(allLeadSupportsTable.filter((option) => option.value !== removedOption.value));
    setAllLeadSupportsData([...allLeadSupportsData, removedOption]);
  };

  useEffect(() => {
    if (allLeadSupportsTable.length !== 0) {
      const valuesOnly = allLeadSupportsTable.map((item) => item.value);
      updateFields({ ...formData, supports: valuesOnly });
    }
  }, [allLeadSupportsTable]);

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
      let allLeadersData = [];
      let allPartnersData = [];
      let allUsersData = [];

      allData.map((user) => {
        if (user.isLeader) {
          allLeadersData.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user._id,
          });
        }
      });
      setAllLeadershipData(allLeadersData);

      allData.map((user) => {
        if (user.isPartner) {
          allPartnersData.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user._id,
          });
        }
      });
      setAllSourceData(allPartnersData);

      allData.map((user) => {
        if (!user.isLeader || !user.isPartner) {
          allUsersData.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user._id,
          });
        }
      });
      setAllLeadOwnersData(allUsersData);
      setAllLeadSupportsData(allUsersData);
    }
  }, [getAllUsersRecordAPI.data]);

  // CATEGORY
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [categorySelectedValue, setCategorySelectedValue] = useState(null);
  const onCategoryChangeHandler = (selectedOptions) => {
    setCategorySelectedValue(selectedOptions);
    updateFields({ clientCategory: selectedOptions.value });
    if (selectedOptions?.value.toLowerCase() !== "other") {
      updateFields({ otherCategory: "" });
    }
  };

  // GET ALL CATEGORIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllCategoryRecords();
  }, []);

  const getAllCategoryRecords = useCallback(async () => {
    await getAllCategoryRecordAPI.fetchData(`category/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllCategoryRecordAPI.apiStatus.isLoading && getAllCategoryRecordAPI.apiStatus.isLoaded && getAllCategoryRecordAPI.data !== null) {
      let allData = getAllCategoryRecordAPI.data.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
        });
      });
      setAllCategoryData(allFormattedRecords);
    }
  }, [getAllCategoryRecordAPI.data]);

  // COUNTRY
  let dummyCountry = [
    {
      label: "India",
      value: "india",
    },
  ];
  const [allCountryData, setAllCountryData] = useState(dummyCountry);
  const [countrySelectedValue, setCountrySelectedValue] = useState(null);
  const onCountryChangeHandler = (selectedOptions) => {
    setCountrySelectedValue(selectedOptions);
    updateFields({ clientCountry: selectedOptions.value });
  };

  // GET ALL COUNTRIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllCountryRecords();
  }, []);

  const getAllCountryRecords = useCallback(async () => {
    await getAllCountryRecordAPI.fetchData(`country/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllCountryRecordAPI.apiStatus.isLoading && getAllCountryRecordAPI.apiStatus.isLoaded && getAllCountryRecordAPI.data !== null) {
      let allData = getAllCountryRecordAPI.data.country;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
        });
      });
      setAllCategoryData(allFormattedRecords);
    }
  }, [getAllCountryRecordAPI.data]);

  // STATE
  let dummyStates = [
    {
      label: "Maharashtra",
      value: "maharashtra",
    },
  ];
  const [allStateData, setAllStateData] = useState(dummyStates);
  const [stateSelectedValue, setStateSelectedValue] = useState(null);
  const onStateChangeHandler = (selectedOptions) => {
    setStateSelectedValue(selectedOptions);
    updateFields({ clientState: selectedOptions.value });
  };

  // GET ALL STATES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllStateRecords();
  }, []);

  const getAllStateRecords = useCallback(async () => {
    await getAllStateRecordAPI.fetchData(`state/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllStateRecordAPI.apiStatus.isLoading && getAllStateRecordAPI.apiStatus.isLoaded && getAllStateRecordAPI.data !== null) {
      let allData = getAllStateRecordAPI.data.state;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
        });
      });
      setAllCategoryData(allFormattedRecords);
    }
  }, [getAllStateRecordAPI.data]);

  // CITY
  let dummyCities = [
    {
      label: "Mumbai",
      value: "mumbai",
    },
  ];
  const [allCityData, setAllCityData] = useState(dummyCities);
  const [citySelectedValue, setCitySelectedValue] = useState(null);
  const onCityChangeHandler = (selectedOptions) => {
    setCitySelectedValue(selectedOptions);
    updateFields({ clientCity: selectedOptions.value });
  };

  // GET ALL CATEGORIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllCityRecords();
  }, []);

  const getAllCityRecords = useCallback(async () => {
    await getAllCityRecordAPI.fetchData(`city/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllCityRecordAPI.apiStatus.isLoading && getAllCityRecordAPI.apiStatus.isLoaded && getAllCityRecordAPI.data !== null) {
      let allData = getAllCityRecordAPI.data.city;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
        });
      });
      setAllCategoryData(allFormattedRecords);
    }
  }, [getAllCityRecordAPI.data]);

  // KEY CONTACT
  const [allKeyContactEntries, setAllKeyContactEntries] = useState([]);

  const addKeyContactContactEntries = (entry) => {
    setAllKeyContactEntries([...allKeyContactEntries, entry]);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      keyContact: allKeyContactEntries,
    });
  }, [allKeyContactEntries]);

  const onDeleteEntriesClickHandler = (index) => {
    const updatedEntries = [...allKeyContactEntries];
    updatedEntries.splice(index, 1);
    setAllKeyContactEntries(updatedEntries);
  };

  // BOARD OF DIRECTORS
  const [allBoardOfDirectorsData, setAllBoardOfDirectorsData] = useState([]);

  const addBoardOfDirectorEntries = (entry) => {
    setAllBoardOfDirectorsData([...allBoardOfDirectorsData, entry]);
  };

  const onDeleteBoardOfDirectorEntriesClickHandler = (index) => {
    const updatedEntries = [...allBoardOfDirectorsData];
    updatedEntries.splice(index, 1);
    setAllBoardOfDirectorsData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      managementBoardOfDirectors: allBoardOfDirectorsData,
    });
  }, [allBoardOfDirectorsData]);

  // INDEPENDENT DIRECTORS
  const [allIndependentDirectorsData, setAllIndependentDirectorsData] = useState([]);

  const addIndependentDirectorEntries = (entry) => {
    setAllIndependentDirectorsData([...allIndependentDirectorsData, entry]);
  };

  const onDeleteIndependentDirectorEntriesClickHandler = (index) => {
    const updatedEntries = [...allIndependentDirectorsData];
    updatedEntries.splice(index, 1);
    setAllIndependentDirectorsData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      managementIndependentDirectors: allIndependentDirectorsData,
    });
  }, [allIndependentDirectorsData]);

  // AGENCY
  const [allAgenciesData, setAllAgenciesData] = useState([]);

  const addAgencyEntries = (entry) => {
    setAllAgenciesData([...allAgenciesData, entry]);
  };

  const onDeleteAgencyEntriesClickHandler = (index) => {
    const updatedEntries = [...allAgenciesData];
    updatedEntries.splice(index, 1);
    setAllAgenciesData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      managementAgencies: allAgenciesData,
    });
  }, [allAgenciesData]);

  // REVENUE
  const [allRevenueData, setAllRevenueData] = useState([]);

  const addRevenueEntries = (entry) => {
    setAllRevenueData([...allRevenueData, entry]);
  };

  const onDeleteRevenueEntriesClickHandler = (index) => {
    const updatedEntries = [...allRevenueData];
    updatedEntries.splice(index, 1);
    setAllRevenueData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      revenue: allRevenueData,
    });
  }, [allRevenueData]);

  // MARKETING MEDIA SPENDS
  const [allMarketingMediaSpendsData, setAllMarketingMediaSpendsData] = useState([]);

  const addMarketingMediaSpendsEntries = (entry) => {
    setAllMarketingMediaSpendsData([...allMarketingMediaSpendsData, entry]);
  };

  const onDeleteMarketingMediaSpendsEntriesClickHandler = (index) => {
    const updatedEntries = [...allMarketingMediaSpendsData];
    updatedEntries.splice(index, 1);
    setAllMarketingMediaSpendsData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      spendsMarketingMediaSpends: allMarketingMediaSpendsData,
    });
  }, [allMarketingMediaSpendsData]);

  // MEDIA SPENDS
  const [allMediaSpendsData, setAllMediaSpendsData] = useState([]);

  const addMediaSpendsEntries = (entry) => {
    setAllMediaSpendsData([...allMediaSpendsData, entry]);
  };

  const onDeleteMediaSpendsEntriesClickHandler = (index) => {
    const updatedEntries = [...allMediaSpendsData];
    updatedEntries.splice(index, 1);
    setAllMediaSpendsData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      spendsMediaSpends: allMediaSpendsData,
    });
  }, [allMediaSpendsData]);

  // DIGITAL MEDIA SPENDS
  const [allDigitalMediaSpendsData, setAllDigitalMediaSpendsData] = useState([]);

  const addDigitalMediaSpendsEntries = (entry) => {
    setAllDigitalMediaSpendsData([...allDigitalMediaSpendsData, entry]);
  };

  const onDeleteDigitalMediaSpendsEntriesClickHandler = (index) => {
    const updatedEntries = [...allDigitalMediaSpendsData];
    updatedEntries.splice(index, 1);
    setAllDigitalMediaSpendsData(updatedEntries);
  };

  useEffect(() => {
    updateFields({
      ...formData,
      spendsDigitalMediaSpends: allDigitalMediaSpendsData,
    });
  }, [allDigitalMediaSpendsData]);

  // SALES STATUS STATES
  const [allProjectStatusStatesData, setAllProjectStatusStatesData] = useState([]);
  const [projectStatusSelectedValue, setProjectStatusStatesSelectedValue] = useState(null);
  const onProjectStatusStatesChangeHandler = (selectedOptions) => {
    setProjectStatusStatesSelectedValue(selectedOptions);
    updateFields({ projectStatus: selectedOptions.value });
    updateFields({ projectSalesCycle: selectedOptions.stage });
  };

  // GET ALL CATEGORIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllProjectStatusStatesRecords();
  }, []);

  const getAllProjectStatusStatesRecords = useCallback(async () => {
    await getAllStatusStatesRecordAPI.fetchData(`salesstage/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllStatusStatesRecordAPI.apiStatus.isLoading && getAllStatusStatesRecordAPI.apiStatus.isLoaded && getAllStatusStatesRecordAPI.data !== null) {
      let allData = getAllStatusStatesRecordAPI.data.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
          stage: record.stage,
        });
      });
      setAllProjectStatusStatesData(allFormattedRecords);
    }
  }, [getAllStatusStatesRecordAPI.data]);

  // PRODUCT
  const [allProductData, setAllProductData] = useState([]);
  const [productSelectedValue, setProductSelectedValue] = useState(null);
  const onProductChangeHandler = (selectedOptions) => {
    setProductSelectedValue(selectedOptions);
    const valuesOnly = selectedOptions.map((item) => item.value);
    updateFields({ projectProdcts: valuesOnly });
  };

  // GET ALL CATEGORIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllProductRecords();
  }, []);

  const getAllProductRecords = useCallback(async () => {
    await getAllProductRecordAPI.fetchData(`product/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllProductRecordAPI.apiStatus.isLoading && getAllProductRecordAPI.apiStatus.isLoaded && getAllProductRecordAPI.data !== null) {
      let allData = getAllProductRecordAPI.data.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
        });
      });
      setAllProductData(allFormattedRecords);
    }
  }, [getAllProductRecordAPI.data]);

  // MODULE
  const [allModuleData, setAllModuleData] = useState([]);
  const [selectedProductsModuleData, setSelectedProductsModuleData] = useState([]);
  const [moduleSelectedValue, setModuleSelectedValue] = useState(null);
  const onModuleChangeHandler = (selectedOptions) => {
    setModuleSelectedValue(selectedOptions);
    const valuesOnly = selectedOptions.map((item) => item.value);
    updateFields({ projectProdctsModules: valuesOnly });
  };

  // GET ALL CATEGORIES DATA CREATED BY ADMIN
  useEffect(() => {
    getAllModuleRecords();
  }, []);

  const getAllModuleRecords = useCallback(async () => {
    await getAllModuleRecordAPI.fetchData(`module/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllModuleRecordAPI.apiStatus.isLoading && getAllModuleRecordAPI.apiStatus.isLoaded && getAllModuleRecordAPI.data !== null) {
      let allData = getAllModuleRecordAPI.data.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record.name,
          value: record._id,
          cost: record.defaultCost,
          product: record.product,
        });
      });
      setAllModuleData(allFormattedRecords);
    }
  }, [getAllModuleRecordAPI.data]);

  // UPDATE THE DROPDOWN OF MODULES AS PER THE PRODUCTS SELECTED
  useEffect(() => {
    let selectedModules = [];

    if (productSelectedValue !== null) {
      // Use filter and some for a more concise and readable approach
      selectedModules = allModuleData.filter((entry) => productSelectedValue.some((product) => product.value === entry.product));
    }

    // Update the state using setAllModuleData
    setSelectedProductsModuleData(selectedModules);
  }, [productSelectedValue]);

  // PROJECT TYPE
  const projectTypeDefaultData = [
    {
      label: "New",
      value: "new",
    },
    {
      label: "Renew",
      value: "renew",
    },
  ];
  const [projectTypeAllData, setProjectTypeAllData] = useState(projectTypeDefaultData);
  const [projectTypeSelectedValue, setProjectTypeSelectedValue] = useState(projectTypeDefaultData[0]);
  const onProjectTypeChangeHandler = (selectedOption) => {
    setProjectTypeSelectedValue(selectedOption);
    updateFields({ projectType: selectedOption.value });
  };

  // PROJECT CURRENCY
  const [currencyAllData, setCurrencyAllData] = useState([]);
  const [currencySelectedValue, setCurrencySelectedValue] = useState(null);
  const onCurrencyChangeHandler = (selectedOption) => {
    setCurrencySelectedValue(selectedOption);
    updateFields({ currency: selectedOption.value });
  };

  // GET ALL CURRENCY DATA CREATED BY ADMIN
  useEffect(() => {
    getAllCurrencyRecords();
  }, []);

  const getAllCurrencyRecords = useCallback(async () => {
    await getAllCurrencyRecordAPI.fetchData(`currencyconversion/currency/all`);
  });

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllCurrencyRecordAPI.apiStatus.isLoading && getAllCurrencyRecordAPI.apiStatus.isLoaded && getAllCurrencyRecordAPI.data !== null) {
      let allData = getAllCurrencyRecordAPI.data.data;
      let allFormattedRecords = [];

      allData.map((record) => {
        allFormattedRecords.push({
          label: record,
          value: record,
        });
      });
      setCurrencyAllData(allFormattedRecords);

      allFormattedRecords.map((data) => {
        if (data.value === "INR") {
          setCurrencySelectedValue(data);
          updateFields({ currency: data.value });
        }
      });

      let allCurrencies = [];
      allData.map((data) => {
        allCurrencies.push({
          label: data,
          value: 0,
        });
      });
      updateFields({ projectValue: allCurrencies });
    }
  }, [getAllCurrencyRecordAPI.data]);

  // PROJECT ESTIMATION COST
  const [defaultCost, setDefaultCost] = useState(0);
  const [projectEstimationCost, setProjectEstimationCost] = useState(defaultCost);

  // GET ALL CURRENCY DATA CREATED BY ADMIN
  useEffect(() => {
    getAllCurrencyRatesRecords();
  }, []);

  const getAllCurrencyRatesRecords = useCallback(async () => {
    await getAllCurrencyRateRecordAPI.fetchData(`currencyconversion/all`);
  });

  const [allCurrencyRatesData, setAllCurrencyRatesData] = useState();

  // UPDATE THE FORM FIELDS WHEN DATA IS AVAILABLE
  useEffect(() => {
    if (!getAllCurrencyRateRecordAPI.apiStatus.isLoading && getAllCurrencyRateRecordAPI.apiStatus.isLoaded && getAllCurrencyRateRecordAPI.data !== null) {
      let allData = getAllCurrencyRateRecordAPI.data.data;
      setAllCurrencyRatesData(allData);
    }
  }, [getAllCurrencyRateRecordAPI.data]);

  // GET THE DEFAULT COST OF SELECTED MODULES
  useEffect(() => {
    if (moduleSelectedValue !== null && defaultCost === projectEstimationCost) {
      let allModulesCost = 0;
      let fromCurrency = leadId === "create" ? "INR" : formData.currency;

      moduleSelectedValue.forEach((entry) => {
        allModulesCost = allModulesCost + entry.cost;
      });

      allCurrencyRatesData.forEach((rate) => {
        if (currencySelectedValue.value === fromCurrency) {
          allModulesCost = allModulesCost * 1;
        } else if (fromCurrency === rate.fromCurrency && currencySelectedValue.value === rate.toCurrency) {
          allModulesCost = allModulesCost * rate.rate;
        }
      });

      // Update the default cost
      setDefaultCost(allModulesCost);

      // Update the projectEstimationCost
      setProjectEstimationCost(allModulesCost);

      // Update projectValue based on currency rates
      formData.projectValue.forEach((data, dataIndex) => {
        allCurrencyRatesData.forEach((rate) => {
          if (fromCurrency === data.label) {
            formData.projectValue[dataIndex].value = allModulesCost * 1;
          } else if (fromCurrency === rate.fromCurrency && data.label === rate.toCurrency) {
            formData.projectValue[dataIndex].value = allModulesCost * rate.rate;
          }
        });
      });
    }
  }, [currencySelectedValue, moduleSelectedValue, formData.currency]);

  useEffect(() => {
    if (projectEstimationCost !== defaultCost) {
      let fromCurrency = formData.currency;

      let allModulesCost = projectEstimationCost;

      allCurrencyRatesData.forEach((rate) => {
        if (currencySelectedValue.value === fromCurrency) {
          allModulesCost = allModulesCost * 1;
        } else if (fromCurrency === rate.fromCurrency && currencySelectedValue.value === rate.toCurrency) {
          allModulesCost = allModulesCost * rate.rate;
        }
      });

      console.log("allModulesCost", allModulesCost, formData.projectValue);

      // Update the projectEstimationCost
      setProjectEstimationCost(allModulesCost);

      // Update projectValue based on currency rates
      formData.projectValue.forEach((data, dataIndex) => {
        allCurrencyRatesData.forEach((rate) => {
          if (fromCurrency === data.label) {
            formData.projectValue[dataIndex].value = projectEstimationCost * 1;
          } else if (fromCurrency === rate.fromCurrency && data.label === rate.toCurrency) {
            formData.projectValue[dataIndex].value = projectEstimationCost * rate.rate;
          }
        });
      });

      console.log("allModulesCost 1", allModulesCost, formData.projectValue);
    }
  }, [projectEstimationCost, formData.currency]);

  const handleProjectEstimationCostNoInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormErrors({ ...formErrors, [name]: "This field is required" });
    } else {
      setFormErrors({ ...formErrors, [name]: null });
    }
    setProjectEstimationCost(e.target.value);
    updateFields({ projectEstimationCost: Number(e.target.value) });
  };

  console.log("projectEstimationCost", projectEstimationCost, defaultCost);

  // PROJECT DURATION
  const handleProjectDurationNoInputChange = (e) => {
    const { name, value } = e.target;
    updateFields({ ...formData, [name]: value });
  };

  // PROJECT FINAL PO
  const handleProjectFinalPONoInputChange = (e) => {
    const { name, value } = e.target;
    updateFields({ ...formData, [name]: value });
  };

  // PROJECT ESTIMATED GO LIVE DATE
  const handleProjectEstimatedGoLiveDateNoInputChange = (e) => {
    const { name, value } = e.target;
    updateFields({ ...formData, [name]: value });
  };

  const onSubmitBtnClickHandler = () => {
    if (leadId !== "create") {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  console.log();

  const handleUpdateRecord = async () => {
    await updateRecordAPI.putData(`lead/${leadId}`, formData, "Lead Updated Successfully");
  };

  const handleCreateRecord = async () => {
    await createRecordAPI.postData("lead", formData, "Lead Created Successfully");
  };

  // ROUTE TO ALL MODULES TABLE IF MODULE IS CREATED SUCCESSFULLY
  useEffect(() => {
    if (createRecordAPI.data === "success") {
      router.push("/lead");
    }
  }, [createRecordAPI.apiStatus.isLoaded]);

  // GET MODULE DATA IF USER WANT TO UPDATE/EDIT THE MODULE DATA
  useEffect(() => {
    if (leadId !== "create") {
      getSingleRecordAPI.fetchData(`lead/${leadId}`);
    }
  }, [leadId]);

  // UPDATE THE FORM FIELDS WHEN DATE IS AVAILABLE
  useEffect(() => {
    if (!getSingleRecordAPI.apiStatus.isLoading && getSingleRecordAPI.apiStatus.isLoaded) {
      updateFields({ name: getSingleRecordAPI.data.data.name });
    }
  }, [getSingleRecordAPI.data]);

  // ROUTE TO ALL MODULES TABLE IF MODULE IS UPDATED SUCCESSFULLY
  useEffect(() => {
    if (updateRecordAPI.data === "success") {
      router.push("/lead");
    }
  }, [updateRecordAPI.apiStatus.isLoaded]);

  console.log("formData", formData);

  return (
    <Wrapper>
      <div className="page-header">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link href="/">Home</Link>
          </div>
          <div className="breadcrumb-item">
            <Link href="/lead">Lead</Link>
          </div>
          <div className="breadcrumb-item active">Create</div>
        </div>
        <div className="page-title-wrapper">
          <div className="page-title">Create Lead</div>
        </div>
      </div>
      <div className="card">
        <div className="body">
          <Form>
            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">New Lead Details</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DatepickerCalendar label={"Lead Date*"} open={openLeadDatepicker} setOpen={setLeadDatepickerOpen} onClickHandler={onLeadDatepickerClickHandler} />
                </div>
                <div className="form-group">
                  <InputField type="text" name="name" placeholder="Lead Name" label="Lead Name*" value={formData.name || ""} onChange={handleInputChange} error={formErrors.name} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Source" options={allSourceData} selectedValue={sourceSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select source"} onChangeHandler={onSourceChangeHandler} />
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DropdownInputField label="Leadership*" options={allLeadershipData} selectedValue={leadershipSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select leadership"} onChangeHandler={onLeadershipChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Lead Owner*" options={allLeadOwnersData} selectedValue={leadOwnersSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select lead owner"} onChangeHandler={onLeadOwnersChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Lead Support" options={allLeadSupportsData} selectedValue={leadSupportsSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select lead support"} onChangeHandler={onLeadSupportsChangeHandler} btnLabel="Add Lead Support" onClick={addLeadSupportsEntries} />
                  {allLeadSupportsTable.length !== 0 && (
                    <div className="grid col-span-1">
                      <table className="tableWrapper">
                        <tr>
                          <th>Lead Support's Name</th>
                          <th>Action</th>
                        </tr>
                        {allLeadSupportsTable.map((leadSupport, leadSupportIndex) => (
                          <tr key={leadSupportIndex}>
                            <td>{leadSupport.label}</td>
                            <td>
                              <Button variant="error-primary" classProps={"deleteBtWrapper"} size="small" onClick={() => onDeleteLeadSupportsEntriesClickHandler(leadSupport)}>
                                <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Company Details</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <InputField type="text" name="clientName" placeholder="Company Name" label="Company Name*" value={formData.clientName || ""} onChange={handleInputChange} error={formErrors.clientName} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Company Category*" options={allCategoryData} selectedValue={categorySelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select category/vertical"} onChangeHandler={onCategoryChangeHandler} />
                </div>
                {categorySelectedValue?.label.toLowerCase() === "other" && (
                  <div className="form-group">
                    <InputField type="text" name="otherCategory" placeholder="Add Other Category Name" label="Other Category Name" value={formData.otherCategory || ""} onChange={handleInputChange} error={formErrors.otherCategory} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DropdownInputField label="Country*" options={allCountryData} selectedValue={countrySelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select category/vertical"} onChangeHandler={onCountryChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="State" options={allStateData} selectedValue={stateSelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select state"} onChangeHandler={onStateChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="City*" options={allCityData} selectedValue={citySelectedValue} loading={getAllUsersRecordAPI.apiStatus.isLoading} placeholder={"Select city"} onChangeHandler={onCityChangeHandler} />
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Client's Side Key Contact</span>

              <div className="grid grid-cols-3">
                <ClientKeyContactMultiRecordsForm addbtnLabel={"add Contact Details"} onAddEntry={addKeyContactContactEntries} />
                {allKeyContactEntries.length !== 0 && (
                  <Wrapper>
                    <KeyContactMultiRecordsTable entries={allKeyContactEntries} onRemoveEntry={onDeleteEntriesClickHandler} />
                  </Wrapper>
                )}
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Management</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <MultiRecordsForm name="managementBoardOfDirectors" placeholder="Board of Director" btnLabel="Add Board of Director" onAddEntry={addBoardOfDirectorEntries} />
                  {allBoardOfDirectorsData.length !== 0 && <MultiRecordsTable entries={allBoardOfDirectorsData} onRemoveEntry={onDeleteBoardOfDirectorEntriesClickHandler} />}
                </div>
                <div className="form-group">
                  <MultiRecordsForm name="managementIndependentDirectors" placeholder="Independent Director" btnLabel="Add Independent Director" onAddEntry={addIndependentDirectorEntries} />
                  {allIndependentDirectorsData.length !== 0 && <MultiRecordsTable entries={allIndependentDirectorsData} onRemoveEntry={onDeleteIndependentDirectorEntriesClickHandler} />}
                </div>
                <div className="form-group">
                  <MultiRecordsForm name="managementAgencies" placeholder="Agency name" btnLabel="Add Agency" onAddEntry={addAgencyEntries} />
                  {allAgenciesData.length !== 0 && <MultiRecordsTable entries={allAgenciesData} onRemoveEntry={onDeleteAgencyEntriesClickHandler} />}
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Revenue</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <MultiRecordWithYearDropdownForm name={"revenue"} placeholder="Sales revenue" label={"Sales revenue"} onAddEntry={addRevenueEntries} addbtnLabel="Add revenue" />
                  {allRevenueData.length !== 0 && (
                    <Wrapper>
                      <MultiRecordsWithYearTable label="Revenue" entries={allRevenueData} onRemoveEntry={onDeleteRevenueEntriesClickHandler} />
                    </Wrapper>
                  )}
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Spends</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <MultiRecordWithYearDropdownForm name={"spendsMarketingMediaSpends"} placeholder="Marketing Media Spends" label={"Marketing Media Spends"} onAddEntry={addMarketingMediaSpendsEntries} addbtnLabel="Add spend" />
                  {allMarketingMediaSpendsData.length !== 0 && (
                    <Wrapper>
                      <MultiRecordsWithYearTable label="spend" entries={allMarketingMediaSpendsData} onRemoveEntry={onDeleteMarketingMediaSpendsEntriesClickHandler} />
                    </Wrapper>
                  )}
                </div>
                <div className="form-group">
                  <MultiRecordWithYearDropdownForm name={"spendsMediaSpends"} placeholder="Media Spends" label={"Media Spends"} onAddEntry={addMediaSpendsEntries} addbtnLabel="Add spend" />
                  {allMediaSpendsData.length !== 0 && (
                    <Wrapper>
                      <MultiRecordsWithYearTable label="spend" entries={allMediaSpendsData} onRemoveEntry={onDeleteMediaSpendsEntriesClickHandler} />
                    </Wrapper>
                  )}
                </div>
                <div className="form-group">
                  <MultiRecordWithYearDropdownForm name={"spendsDigitalMediaSpends"} placeholder="Digital Media Spends" label={"Digital Media Spends"} onAddEntry={addDigitalMediaSpendsEntries} addbtnLabel="Add spend" />
                  {allDigitalMediaSpendsData.length !== 0 && (
                    <Wrapper>
                      <MultiRecordsWithYearTable label="spend" entries={allDigitalMediaSpendsData} onRemoveEntry={onDeleteDigitalMediaSpendsEntriesClickHandler} />
                    </Wrapper>
                  )}
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Product Details</span>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DropdownInputField label="Product*" ismulti={true} options={allProductData} selectedValue={productSelectedValue} loading={getAllStatusStatesRecordAPI.apiStatus.isLoading} placeholder={"Select product"} onChangeHandler={onProductChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Modules*" ismulti={true} options={selectedProductsModuleData} selectedValue={moduleSelectedValue} loading={getAllStatusStatesRecordAPI.apiStatus.isLoading} placeholder={"Select module"} onChangeHandler={onModuleChangeHandler} />
                </div>
              </div>
            </div>

            <div className="formSectionWrapper">
              <span className="sectionTitleWrapper">Project Details</span>
              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DropdownInputField label="Project Type*" options={projectTypeAllData} selectedValue={projectTypeSelectedValue} placeholder={"Select project type"} onChangeHandler={onProjectTypeChangeHandler} />
                </div>
                <div className="form-group">
                  <DropdownInputField label="Status" options={allProjectStatusStatesData} selectedValue={projectStatusSelectedValue} loading={getAllStatusStatesRecordAPI.apiStatus.isLoading} placeholder={"Select status"} onChangeHandler={onProjectStatusStatesChangeHandler} />
                </div>
                <div className="form-group">
                  <InputField type="text" name="projectSalesCycle" placeholder="Sales Cycle %" label="Sales Cycle %" value={`${projectStatusSelectedValue?.stage === undefined ? "" : projectStatusSelectedValue.stage}`} disabled={true} />
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DropdownInputField label="Currency*" options={currencyAllData} selectedValue={currencySelectedValue} placeholder={"Select project currency"} onChangeHandler={onCurrencyChangeHandler} />
                </div>
                <div className="form-group">
                  <InputField type="number" name="projectEstimationCost" placeholder="Project Estimation Cost" label="Project Estimation Cost*" value={projectEstimationCost} onChange={handleProjectEstimationCostNoInputChange} error={formErrors.projectEstimationCost} />
                </div>
                <div className="form-group">
                  <InputField type="number" name="projectDuration" placeholder="Project duration" label="Project Duration*" value={formData.projectDuration || ""} onChange={handleProjectDurationNoInputChange} error={formErrors.projectDuration} />
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="form-group">
                  <DatepickerCalendar label={"Project Estimation Go Live Date*"} open={openEstimationDatepicker} setOpen={setEstimationDatepickerOpen} onClickHandler={onProjectEstimationGoLiveDatepickerClickHandler} />
                </div>
                {projectStatusSelectedValue?.label.toLowerCase() === "po" && (
                  <Wrapper>
                    <div className="form-group">
                      <InputField type="number" name="projectFinalPO" placeholder="Project final PO" label="Project Final PO*" value={formData.projectFinalPO || ""} onChange={handleProjectFinalPONoInputChange} error={formErrors.projectFinalPO} />
                    </div>
                  </Wrapper>
                )}
              </div>
            </div>

            <div className="w-100 flex justify-between items-center">
              <Button variant={"secondary"} onClick={() => router.push("/lead")}>
                Back to all leads
              </Button>
              <Button variant={"primary"} onClick={onSubmitBtnClickHandler}>
                {leadId === "create" ? "Create Lead" : "Update Lead"}
              </Button>
            </div>

            {/* <br />
            <div className="grid grid-cols-3">
              <div className="form-section-title">Monthly Revenue Bifurcation</div>
            </div>
            <hr /> */}
            {/* <div className="form-group">
                <RadioInput name="gender" options={genderOptions} selectedValue={selectedGender} onChange={handleGenderChange} label="Gender" />
              </div>
              <div className="form-group">
                <CheckboxInput label="Accept Terms and Conditions" value="terms" checked={isChecked} onChange={handleCheckboxChange} />
                <CheckboxGroupInput title="Select Options" options={options} onChange={handleCheckboxGroupChange} />
              </div> */}
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};
export default LeadForm;

const ClientKeyContactMultiRecordsForm = ({ addbtnLabel, onAddEntry }) => {
  const defaultData = {
    name: "",
    designation: "",
    email: "",
    contactNo: "",
  };

  // MODULE FORM DATA
  const [formData, setFormData] = useState(defaultData);

  // UPDATE FORM DATA
  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFields({ ...formData, [name]: value });
  };

  const handleAddEntry = () => {
    onAddEntry(formData);
    setFormData(defaultData);
  };

  return (
    <div>
      <InputField type="text" name={"name"} placeholder={"Please enter name"} label={"Name"} value={formData.name} onChange={handleInputChange} />
      <InputField type="text" name={"designation"} placeholder={"Please enter designation"} label={"Designation"} value={formData.designation} onChange={handleInputChange} />
      <InputField type="text" name={"email"} placeholder={"Please enter email"} label={"Email"} value={formData.email} onChange={handleInputChange} />
      <InputField type="text" name={"contactNo"} placeholder={"Please enter contact no"} label={"Contact No"} value={formData.contactNo} onChange={handleInputChange} />
      <Button onClick={handleAddEntry}>{addbtnLabel}</Button>
    </div>
  );
};

const KeyContactMultiRecordsTable = ({ entries, onRemoveEntry }) => {
  return (
    <div className="grid col-span-1">
      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.designation}</td>
              <td>{entry.email}</td>
              <td>{entry.contactNo}</td>
              <td>
                <Button variant="error-primary" classProps={"deleteBtWrapper"} size="small" onClick={() => onRemoveEntry(index)}>
                  <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MultiRecordsForm = ({ name, placeholder, btnLabel, onAddEntry }) => {
  const [entry, setEntry] = useState("");

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

  const handleAddEntry = () => {
    onAddEntry(entry);
    setEntry("");
  };

  return (
    <div>
      <InputField type="text" name={name} placeholder={placeholder} label="Name of Board of Director" value={entry} onChange={handleInputChange} btnLabel={btnLabel} onClick={handleAddEntry} />
    </div>
  );
};

const MultiRecordsTable = ({ entries, onRemoveEntry }) => {
  return (
    <div className="grid col-span-1">
      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Entry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry}</td>
              <td>
                <Button variant="error-primary" classProps={"deleteBtWrapper"} size="small" onClick={() => onRemoveEntry(index)}>
                  <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MultiRecordWithYearDropdownForm = ({ name, placeholder, label, onAddEntry, addbtnLabel }) => {
  const [entry, setEntry] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleAddEntry = () => {
    const newEntry = {
      year: selectedYear.value,
      value: entry,
    };
    onAddEntry(newEntry);
    setEntry("");
  };

  // You can customize the list of years as needed
  const yearOptions = [
    { value: "2022-23", label: "2022-23" },
    { value: "2021-22", label: "2021-22" },
    { value: "2020-21", label: "2020-21" },
  ];

  return (
    <Wrapper>
      <DropdownInputField label="Year" options={yearOptions} selectedValue={selectedYear} placeholder={"Select year"} onChangeHandler={handleYearChange} />
      <InputField type="text" name={name} placeholder={placeholder} label={label} value={entry} onChange={handleInputChange} />
      <Button onClick={handleAddEntry}>{addbtnLabel}</Button>
    </Wrapper>
  );
};

const MultiRecordsWithYearTable = ({ label, entries, onRemoveEntry }) => {
  return (
    <div className="grid col-span-1">
      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Year</th>
            <th>{label}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.year}</td>
              <td>{entry.value}</td>
              <td>
                <Button variant="error-primary" classProps={"deleteBtWrapper"} size="small" onClick={() => onRemoveEntry(index)}>
                  <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
