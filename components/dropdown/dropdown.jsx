import Select from "react-select";
import "./dropdown.scss";
import Wrapper from "@components/helpers/wrapper";

const Dropdown = ({ error, varient, isClearable, ismulti, dropdownOptions, placeholder, selectedOptions, dropdownLoading, onChange, onBlur, isDisabled }) => {
  if (ismulti === undefined) {
    ismulti = false;
  }

  if (isDisabled === undefined) {
    isDisabled = false;
  }

  if (isClearable === undefined) {
    isClearable = false;
  }

  if (varient === undefined) {
    varient = "default";
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "auto",
      height: 34,
      maxHeight: 34,
      minHeight: 34,
      padding: 0,
      margin: 0,
      marginTop: -4,
      padding: 0,
      fontSize: "12px", // Set your desired font size here
      fontWeight: "600",
      lineHeight: "1.5",
      borderColor: error ? "#ff5b57" : "#ced4da",
      // Add styles for hover and focus states
      "&:hover": {
        borderColor: error ? "#ff5b57" : "#ced4da", // Add your desired hover border color
        cursor: "pointer",
      },
      "&:focus-within": {
        borderColor: error ? "#ff5b57" : "#67abe9", // Add your desired border color when clicked
        boxShadow: error ? "0 0 0 0.25rem rgba(255, 91, 87, 0.25)" : "0 0 0 0.25rem rgba(52, 143, 226, 0.25)", // Add any additional styles for focus state
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px", // Set your desired font size here
      fontWeight: "600",
      lineHeight: "1.5",
      color: "#2d353c",
      backgroundColor: state.isFocused ? "#67abe9" : state.isSelected ? "gray" : "white",
      color: state.isFocused ? "white" : "black",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 0,
      borderRadius: 4,
      cursor: "pointer",

      // Add hover styles here
      ":hover": {
        backgroundColor: "#fff",
      },
    }),
  };

  // TO FILTER BY LABEL AND VALUE
  const customFilter = (option, inputValue) => {
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    const input = inputValue.toLowerCase();

    // Check if the label or value contains the input string
    return label.includes(input) || value.includes(input);
  };

  return (
    <Wrapper>
      <Select
        isDisabled={isDisabled}
        isClearable={isClearable}
        isMulti={ismulti}
        maxMenuHeight={200}
        backspaceRemovesValue={true}
        closeMenuOnSelect={true}
        isSearchable={true}
        hideSelectedOptions={true}
        placeholder={placeholder}
        value={selectedOptions}
        options={dropdownOptions}
        isLoading={dropdownLoading}
        onChange={(e) => onChange(e)}
        onBlur={(e) => (onBlur !== undefined ? onBlur(e) : null)}
        filterOption={customFilter} // TO FILTER BY LABEL AND VALUE
        styles={customStyles}
        components={{
          IndicatorSeparator: () => null, // Remove the vertical border beside the arrow icon
        }}
      />
    </Wrapper>
  );
};
export default Dropdown;

// export const CreatableDropdown = ({ error, varient, isClearable, ismulti, dropdownOptions, placeholder, selectedOptions, dropdownLoading, onChange, onBlur, isDisabled }) => {
//   if (ismulti === undefined) {
//     ismulti = false;
//   }

//   if (isDisabled === undefined) {
//     isDisabled = false;
//   }

//   if (isClearable === undefined) {
//     isClearable = false;
//   }

//   if (varient === undefined) {
//     varient = "default";
//   }

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       width: "auto",
//       height: 34,
//       maxHeight: 34,
//       minHeight: 34,
//       padding: 0,
//       margin: 0,
//       marginTop: -4,
//       padding: 0,
//       fontSize: "12px", // Set your desired font size here
//       fontWeight: "600",
//       lineHeight: "1.5",
//       borderColor: error ? "#ff5b57" : "#ced4da",
//       // Add styles for hover and focus states
//       "&:hover": {
//         borderColor: error ? "#ff5b57" : "#ced4da", // Add your desired hover border color
//         cursor: "pointer",
//       },
//       "&:focus-within": {
//         borderColor: error ? "#ff5b57" : "#67abe9", // Add your desired border color when clicked
//         boxShadow: error ? "0 0 0 0.25rem rgba(255, 91, 87, 0.25)" : "0 0 0 0.25rem rgba(52, 143, 226, 0.25)", // Add any additional styles for focus state
//       },
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       fontSize: "12px", // Set your desired font size here
//       fontWeight: "600",
//       lineHeight: "1.5",
//       color: "#2d353c",
//       backgroundColor: state.isFocused ? "#67abe9" : state.isSelected ? "gray" : "white",
//       color: state.isFocused ? "white" : "black",
//       cursor: "pointer",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       marginTop: 0,
//       borderRadius: 4,
//       cursor: "pointer",

//       // Add hover styles here
//       ":hover": {
//         backgroundColor: "#fff",
//       },
//     }),
//   };

//   // TO FILTER BY LABEL AND VALUE
//   const customFilter = (option, inputValue) => {
//     const label = option.label.toLowerCase();
//     const value = option.value.toLowerCase();
//     const input = inputValue.toLowerCase();

//     // Check if the label or value contains the input string
//     return label.includes(input) || value.includes(input);
//   };

//   return (
//     <Wrapper>
//       <CreatableSelect
//         isClearable
//         isMulti
//         isDisabled={isDisabled}
//         maxMenuHeight={200}
//         backspaceRemovesValue={true}
//         closeMenuOnSelect={true}
//         isSearchable={true}
//         hideSelectedOptions={true}
//         placeholder={placeholder}
//         value={selectedOptions}
//         options={dropdownOptions}
//         isLoading={dropdownLoading}
//         onChange={(e) => onChange(e)}
//         onBlur={(e) => (onBlur !== undefined ? onBlur(e) : null)}
//         filterOption={customFilter} // TO FILTER BY LABEL AND VALUE
//         styles={customStyles}
//         components={{
//           IndicatorSeparator: () => null, // Remove the vertical border beside the arrow icon
//         }}
//       />
//     </Wrapper>
//   );
// };
