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
import { useSelector } from "react-redux";

const Products = () => {
  const allDataRecordsAPI = useApi();
  const deleteRecordAPI = useApi();
  const router = useRouter();

  // GET ALL MODULES DATA
  let allProducts = "Loading...";

  if (allDataRecordsAPI.apiStatus.isLoading) {
    allProducts = "Loading...";
  }

  if (allDataRecordsAPI.apiStatus.error) {
    allProducts = "Something went wrong!";
  }

  if (!allDataRecordsAPI.apiStatus.isLoading && allDataRecordsAPI.apiStatus.isLoaded) {
    if (allDataRecordsAPI.data === null || allDataRecordsAPI.data.data === undefined || allDataRecordsAPI.data.data === null || allDataRecordsAPI.data.data.length === 0) {
      allProducts = "No data available";
    } else {
      allProducts = allDataRecordsAPI.data.data.map((product, productIndex) => (
        <tr key={productIndex}>
          <td>{product.name}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(product._id)}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(product._id)}>
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
    allDataRecordsAPI.fetchData("product/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT RECORD
  const onEditBtnClickHandler = (selectedProduct) => {
    router.push(`/product/${selectedProduct}`);
  };

  // DELETE RECORD
  const onDeleteBtnClickHandler = async (selectedProduct) => {
    deleteRecordAPI.deleteData(`product/${selectedProduct}`, "Product Deleted Successfully!");
  };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>
            Home
          </Link>
        </div>
        <div className="w-50">
          <Link href={"/product/create"}>Create Product</Link>
        </div>
      </div>
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
          {allProducts}
        </table>
      </div>
    </div>
  );
};
export default Products;
