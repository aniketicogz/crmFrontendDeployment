"use client";
import Button from "@components/button/button";
import useApi from "@components/hooks/useApi";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import Link from "next/link";
import Image from "next/image";
import editIcon from "../../public/assets/icons/edit.svg";
import deleteIcon from "../../public/assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Users = () => {
  const allDataRecordsAPI = useApi();
  const deleteRecordAPI = useApi();
  const router = useRouter();

  // GET ALL MODULES DATA
  let allRecords = "Loading...";

  if (allDataRecordsAPI.apiStatus.isLoading) {
    allRecords = "Loading...";
  }

  if (allDataRecordsAPI.apiStatus.error) {
    allRecords = "Something went wrong!";
  }

  if (!allDataRecordsAPI.apiStatus.isLoading && allDataRecordsAPI.apiStatus.isLoaded) {
    if (allDataRecordsAPI.data === null || allDataRecordsAPI.data.data === undefined || allDataRecordsAPI.data.data === null || allDataRecordsAPI.data.data.length === 0) {
      allRecords = "No data available";
    } else {
      allRecords = allDataRecordsAPI.data.data.map((record, recordIndex) => (
        <tr key={recordIndex}>
          <td>{record.firstName}</td>
          <td>{record.lastName}</td>
          <td>{record.email}</td>
          <td>{record.isSuperAdmin ? "Super Admin" : record.isAdmin ? "Admin" : record.isLeader ? "Leader" : record.isPartner ? "Partner" : "User"}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(record._id)}>
                <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(record._id)}>
                <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> Delete
              </Button>
            </span>
          </td>
        </tr>
      ));
    }
  }

  // UPDATE ALL RECORDS DATA IF ANY RECORD IS DELETED
  useEffect(() => {
    allDataRecordsAPI.fetchData("user/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT RECORD
  const onEditBtnClickHandler = (selectedRecord) => {
    router.push(`/user/${selectedRecord}`);
  };

  // DELETE RECORD
  const onDeleteBtnClickHandler = async (selectedRecord) => {
    deleteRecordAPI.deleteData(`user/${selectedRecord}`, "User Deleted Successfully!");
  };

  // const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const HEADERS = JSON.parse(process.env.NEXT_PUBLIC_API_HEADERS);

  // const [allUsersData, setAllUsers] = useState([]);
  // const [allUsersDataAPIStatus, setAllUsersDataAPIStatus] = useState({
  //   isLoading: false,
  //   isLoaded: false,
  //   null: null,
  // });

  // const fetchAllUsersData = useCallback(async () => {
  //   setAllUsers([]);
  //   setAllUsersDataAPIStatus((prevStatus) => ({
  //     ...prevStatus,
  //     isLoading: true,
  //     isLoaded: false,
  //     error: null,
  //   }));

  //   try {
  //     const url = `${API_URL}user/all`;

  //     const headers = HEADERS;

  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: headers,
  //     });

  //     const data = await response.json();
  //     console.log("data", data);
  //     if (data.error) {
  //       setAllUsers([]);
  //       setAllUsersDataAPIStatus((prevStatus) => ({
  //         ...prevStatus,
  //         isLoading: true,
  //         isLoaded: false,
  //         error: data.error,
  //       }));
  //     } else {
  //       setAllUsers(data.data);
  //       setAllUsersDataAPIStatus((prevStatus) => ({
  //         ...prevStatus,
  //         isLoading: false,
  //         isLoaded: true,
  //         error: null,
  //       }));
  //     }
  //   } catch (error) {
  //     setAllUsers([]);
  //     setAllUsersDataAPIStatus((prevStatus) => ({
  //       ...prevStatus,
  //       isLoading: true,
  //       isLoaded: false,
  //       error: error,
  //     }));
  //   }
  // }, []);

  // const [deleteUserAPIStatus, setDeleteUserAPIStatus] = useState({
  //   isLoading: false,
  //   isLoaded: false,
  //   null: null,
  // });

  // const deleteUser = useCallback(async (selectedUser) => {
  //   setDeleteUserAPIStatus((prevStatus) => ({
  //     ...prevStatus,
  //     isLoading: true,
  //     isLoaded: false,
  //     error: null,
  //   }));
  //   try {
  //     const url = `${API_URL}user/${selectedUser}`;

  //     const headers = HEADERS;

  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       headers: headers,
  //     });

  //     const data = await response.json();

  //     if (data.error) {
  //       errorNotify(data.error);
  //       setDeleteUserAPIStatus((prevStatus) => ({
  //         ...prevStatus,
  //         isLoading: true,
  //         isLoaded: false,
  //         error: data.error,
  //       }));
  //     } else {
  //       successNotify("User deleted successfully");
  //       setDeleteUserAPIStatus((prevStatus) => ({
  //         ...prevStatus,
  //         isLoading: false,
  //         isLoaded: true,
  //         error: null,
  //       }));
  //     }
  //   } catch (error) {
  //     errorNotify(error);
  //     setDeleteUserAPIStatus((prevStatus) => ({
  //       ...prevStatus,
  //       isLoading: true,
  //       isLoaded: false,
  //       error: error,
  //     }));
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchAllUsersData();
  // }, [deleteUserAPIStatus]);

  // const onEditUserBtnClickHandler = (selectedUser) => {
  //   router.push(`/user/${selectedUser}`);
  // };

  // const onDeleteUserBtnClickHandler = (selectedUser) => {
  //   deleteUser(selectedUser);
  // };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>
        <div className="w-50">
          <Link href={"/user/create"}>Create User</Link>
        </div>
      </div>
      
      
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {allRecords}
        </table>
      </div>
    </div>
  );
};
export default Users;
