// REMOVE THE SELECTED VALUE FROM THE ARRAY OF OBJECTS
export const removeOptionsFromDropdown = (itemToRemove, options) => {
    const newData = options.filter((item) => item.value !== itemToRemove.value);
    return newData
}

// GET SELECTED VALUE OBJECT FROM ARRAY OF OBJECTS
export const getSelectedValueObjectFromArrayOfObjectsUsingKey = (selectedValue, options) => {
    if (options.length === 0) {
        return null;
    }

    let formattedValue = null;

    options.forEach((data) => {
        if (data.value === selectedValue) {
            formattedValue = data;
        }
    });
    return formattedValue;
};

// GET ARRAY OF SELECTED VALUES FROM THE ARRAY OF OBJECTS
export const getMultiSelectedValueObjectFromArrayOfObjectsUsingKey = (selectedValues, options) => {
    if (options.length === 0) {
        return null;
    }

    let formattedValue = [];

    options.forEach((data) => {
        selectedValues.forEach((selectedValue) => {
            if (data.value === selectedValue) {
                formattedValue.push(data);
            }
        })
    });
    return formattedValue;
};

export const numberFormatter = (number, currency) => {

    let numberValue = Number(number);

    if (currency === "INR") {
        numberValue = numberValue.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    } else {
        numberValue = numberValue.toLocaleString("en-US", { maximumFractionDigits: 2 });
    }



    return numberValue;
};
