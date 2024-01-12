"use client";
import Button from "@components/button/button";
import useApi from "@components/hooks/useApi";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import editIcon from "../../public/assets/icons/edit.svg"
import deleteIcon from "../../public/assets/icons/delete.svg"

const Categorys = () => {
  const allDataRecordsAPI = useApi();
  const deleteRecordAPI = useApi();
  const router = useRouter();

  // GET ALL MODULES DATA
  let allCategorys = "Loading...";

  if (allDataRecordsAPI.apiStatus.isLoading) {
    allCategorys = "Loading...";
  }

  if (allDataRecordsAPI.apiStatus.error) {
    allCategorys = "Something went wrong!";
  }

  if (!allDataRecordsAPI.apiStatus.isLoading && allDataRecordsAPI.apiStatus.isLoaded) {
    if (allDataRecordsAPI.data === null || allDataRecordsAPI.data.data === undefined || allDataRecordsAPI.data.data === null || allDataRecordsAPI.data.data.length === 0) {
      allCategorys = "No data available";
    } else {
      allCategorys = allDataRecordsAPI.data.data.map((category, categoryIndex) => (
        <tr key={categoryIndex}>
          <td>{category.name}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(category._id)} disabled={category.name.toLowerCase() === "other" ? true : false}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(category._id)} disabled={category.name.toLowerCase() === "other" ? true : false}>
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
    allDataRecordsAPI.fetchData("category/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT MODULE
  const onEditBtnClickHandler = (selectedCategory) => {
    router.push(`/category/${selectedCategory}`);
  };

  // DELETE MODULE
  const onDeleteBtnClickHandler = async (selectedCategory) => {
    deleteRecordAPI.deleteData(`category/${selectedCategory}`, "Category Deleted Successfully!");
  };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>

        <div className="w-50">
          <Link href={"/category/create"}>Create Category</Link>
        </div>
      </div>
      
      
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
          {allCategorys}
        </table>
      </div>
    </div>
  );
};
export default Categorys;
