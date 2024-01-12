"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/button/button";
import useApi from "@components/hooks/useApi";
import Link from "next/link";
import Image from "next/image";
import editIcon from "../../public/assets/icons/edit.svg";
import deleteIcon from "../../public/assets/icons/delete.svg";


const Leads = () => {
  const allDataRecordsAPI = useApi();
  const deleteRecordAPI = useApi();
  const router = useRouter();

  // GET ALL MODULES DATA
  let allLeads = "Loading...";

  if (allDataRecordsAPI.apiStatus.isLoading) {
    allLeads = "Loading...";
  }

  if (allDataRecordsAPI.apiStatus.error) {
    allLeads = "Something went wrong!";
  }

  if (!allDataRecordsAPI.apiStatus.isLoading && allDataRecordsAPI.apiStatus.isLoaded) {
    if (allDataRecordsAPI.data === null || allDataRecordsAPI.data.data === undefined || allDataRecordsAPI.data.data === null || allDataRecordsAPI.data.data.length === 0) {
      allLeads = "No data available";
    } else {
      allLeads = allDataRecordsAPI.data.data.map((lead, leadIndex) => (
        <tr key={leadIndex}>
          <td>{lead?.client?.name}</td>
          <td>{lead?.client?.projectDetails?.salesCycle}</td>
          <td>
            <span>
              <Button variant={"secondary"} classProps={"editBtWrapper"} onClick={() => onEditBtnClickHandler(lead._id)}>
              <Image src={editIcon} alt="icogz logo" className="iconImg" /> Edit
              </Button>
            </span>
            <span>
              <Button variant={"error-primary"} classProps={"deleteBtWrapper"} onClick={() => onDeleteBtnClickHandler(lead._id)}>
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
    allDataRecordsAPI.fetchData("lead/all");
  }, [deleteRecordAPI.apiStatus]);

  // EDIT MODULE
  const onEditBtnClickHandler = (selectedLead) => {
    router.push(`/lead/${selectedLead}`);
  };

  // DELETE MODULE
  const onDeleteBtnClickHandler = async (selectedLead) => {
    deleteRecordAPI.deleteData(`lead/${selectedLead}`, "Lead Deleted Successfully!");
  };

  return (
    <div>
      <div className="subHeaderWrapper">
        <div className="w-50">
          <Link href={"/home"}>Home</Link>
        </div>

        <div className="w-50">
          <Link href={"/lead/create"}>Create Lead</Link>
        </div>
      </div>
      
      
      <div className="w-100">
      <table className="tableWrapper">
          <tr>
            <th>Name</th>
            <th>Sales Stage %</th>
            <th>Action</th>
          </tr>
          {allLeads}
        </table>
      </div>
    </div>
  );
};
export default Leads;
