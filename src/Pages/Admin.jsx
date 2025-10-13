import React from "react";
import "../css/Admin.css";
import AdminHeader from "../Components/AdminHeader/AdminHeader";
import AdminTabs from "../Components/AdminTabs/AdminTabs";

const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <AdminTabs />
    </div>
  );
};

export default Admin;
