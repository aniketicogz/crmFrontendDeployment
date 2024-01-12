"use client";
import Button from "@components/button/button";
import useApi from "@components/hooks/useApi";
import Link from "next/link";
import Image from "next/image";
import editIcon from "../../public/assets/icons/edit.svg";
import deleteIcon from "../../public/assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Salesstage = () => {
  const allDataRecordsAPI = useApi();
  const deleteRecordAPI = useApi();
  const router = useRouter();

  // GET ALL MODULES DATA
  let allModules = "Loading...";

  if (allDataRecordsAPI.apiStatus.isLoading) {
    allModules = "Loading...";
  }

  if (allDataRecordsAPI.apiStatus.error) {
    allModules = "Something went wrong!";
  }

  if (!allDataRecordsAPI.apiStatus.isLoading && allDataRecordsAPI.apiStatus.isLoaded) {
    if (allDataRecordsAPI.data === null || allDataRecordsAPI.data.data === undefined || allDataRecordsAPI.data.data === null || allDataRecordsAPI.data.data.length === 0) {
      allModules = "No data available";
    } else {
      allModules = allDataRecordsAPI.data.data.map((salesstage, moduleIndex) => (
        <tr key={moduleIndex}>
          <td>{salesstage.name}</td>
          <td>{salesstage.stage}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(salesstage._id)}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(salesstage._id)}>
              <Image src={deleteIcon} alt="icogz logo" className="iconImg" /> Delete
              </Button>
            </span>
          </td>
        </tr>
      ));
    }
  }

  // UPDATE ALL MODULES DATA IF ANY MODULE IS DELETED
  useEffect(() => {
    allDataRecordsAPI.fetchData("salesstage/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT MODULE
  const onEditBtnClickHandler = (selectedSalesstage) => {
    router.push(`/salesstage/${selectedSalesstage}`);
  };

  // DELETE MODULE
  const onDeleteBtnClickHandler = async (selectedSalesstage) => {
    deleteRecordAPI.deleteData(`salesstage/${selectedSalesstage}`, "Sales stage Deleted Successfully!");
  };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>
        <div className="w-50">
          <Link href={"/salesstage/create"}>Create Sales Stage</Link>
        </div>
      </div>
      
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>Name</th>
            <th>Stage</th>
            <th>Action</th>
          </tr>
          {allModules}
        </table>
      </div>
    </div>
  );
};
export default Salesstage;
