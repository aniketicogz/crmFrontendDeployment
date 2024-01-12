"use client";

import Wrapper from "@components/helpers/wrapper";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const SidebarContext = createContext();

export function Sidebar() {
  const [isOpen, setIsOpen] = useState();

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <SidebarNav />
    </SidebarContext.Provider>
  );
}

function SidebarNav() {
  let { isOpen } = useContext(SidebarContext);
  const auth = useSelector((state) => state.persistedReducer.auth.value);
  return (
    <Wrapper>
      <div className="w-100">
        <Link href={"/"}>Home</Link>
      </div>
      {(auth.isSuperAdmin || auth.isAdmin) && (
        <Wrapper>
          <div className="w-100">
            <Link href={"/product"}>Products</Link>
          </div>
          <div className="w-100">
            <Link href={"/module"}>Modules</Link>
          </div>
          <div className="w-100">
            <Link href={"/user"}>Users</Link>
          </div>
          <div className="w-100">
            <Link href={"/category"}>Category</Link>
          </div>
          <div className="w-100">
            <Link href={"/salesstage"}>Sales Stage</Link>
          </div>
          <div className="w-100">
            <Link href={"/currencyconversionrates"}>Currency Conversion Rates</Link>
          </div>
        </Wrapper>
      )}
      <div className="w-100">
        <Link href={"/lead"}>Leads</Link>
      </div>
    </Wrapper>
  );
}
