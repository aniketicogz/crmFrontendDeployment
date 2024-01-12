"use client";
import Button from "@components/button/button";
import useApi from "@components/hooks/useApi";
import Link from "next/link";
import Image from "next/image";
import editIcon from "../../public/assets/icons/edit.svg";
import deleteIcon from "../../public/assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Modules = () => {
  const allDataRecordsAPI = useApi();
  const productAllDataRecordsAPI = useApi();
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
      productAllDataRecordsAPI?.data?.data?.map((product) => {
        allDataRecordsAPI?.data?.data?.map((module) => {
          if (module.product === product._id) {
            module.product = product.name;
          }
        });
      });

      allModules = allDataRecordsAPI?.data?.data.map((module, moduleIndex) => (
        <tr key={moduleIndex}>
          <td>{module.product}</td>
          <td>{module.name}</td>
          <td>{module.defaultCost}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(module._id)}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit 
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(module._id)}>
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
    allDataRecordsAPI.fetchData("module/all");
    productAllDataRecordsAPI.fetchData("product/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT MODULE
  const onEditBtnClickHandler = (selectedModule) => {
    router.push(`/module/${selectedModule}`);
  };

  // DELETE MODULE
  const onDeleteBtnClickHandler = async (selectedModule) => {
    deleteRecordAPI.deleteData(`module/${selectedModule}`, "Module Deleted Successfully!");
  };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>
        <div className="w-50">
          <Link href={"/module/create"}>Create Module</Link>
        </div>
      </div>
      
      
      <div className="w-100">
        <table className="tableWrapper">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Default Cost</th>
            <th>Action</th>
          </tr>
          {allModules}
        </table>
      </div>
    </div>
  );
};
export default Modules;
