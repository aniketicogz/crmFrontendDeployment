const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HEADERS = JSON.parse(process.env.NEXT_PUBLIC_API_HEADERS);

// GET ALL MODULES DATA
export const getAllModulesData = async () => {
  try {
    const URL = `${API_URL}module/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

// GET ALL MODULES DATA
export const getAllSubmodulesData = async () => {
  try {
    const URL = `${API_URL}submodule/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

export const getModuleByID = async (moduleId) => {
  try {
    const URL = `${API_URL}module/${moduleId}`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

// GET ALL LEADERS DATA
export const getAllLeadershipData = async () => {
  try {
    const URL = `${API_URL}user/leader/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

// GET ALL USERS DATA
export const getAllUsersData = async () => {
  try {
    const URL = `${API_URL}user/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

// GET ALL USERS DATA
export const getAllCategoryData = async () => {
  try {
    const URL = `${API_URL}category/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};

// GET ALL SALES STAGE DATA
export const getAllSalesStageData = async () => {
  try {
    const URL = `${API_URL}salesstage/all`;

    const headers = HEADERS;

    const response = await fetch(URL, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (data.error) {
      return []
    } else {
      return data
    }
  } catch (error) {
    return []
  }
};