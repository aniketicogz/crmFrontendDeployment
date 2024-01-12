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

const CurrencyConversionRate = () => {
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
          <td>{product.fromCurrency}</td>
          <td>{product.toCurrency}</td>
          <td>{product.rate}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(product._id)}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            {/* <span>
              <Button variant={"error-primary"} onClick={() => onDeleteBtnClickHandler(product._id)}>
                Delete
              </Button>
            </span> */}
          </td>
        </tr>
      ));
    }
  }

  // UPDATE ALL RECORDS DATA IF ANY RECORD IS DELETED
  useEffect(() => {
    allDataRecordsAPI.fetchData("currencyconversion/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT RECORD
  const onEditBtnClickHandler = (selectedProduct) => {
    router.push(`/currencyconversionrates/${selectedProduct}`);
  };

  // DELETE RECORD
  // const onDeleteBtnClickHandler = async (selectedProduct) => {
  //   deleteRecordAPI.deleteData(`currencyconversion/${selectedProduct}`, "Currency Conversion Rate Deleted Successfully!");
  // };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>
        <div className="w-50">
          <Link href={"/currencyconversionrates/create"}>Create Currency Conversion Rate</Link>
        </div>
      </div>
      
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>From Currency</th>
            <th>To Currency</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
          {allProducts}
        </table>
      </div>
    </div>
  );
};
export default CurrencyConversionRate;
