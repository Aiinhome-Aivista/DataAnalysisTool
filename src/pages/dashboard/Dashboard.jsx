import React from "react";
import DashboardMainContent from "../dashboard/components/DashboardMainContent";
import DashboardSidebar from "./components/DashboardSidebar";
import HowItWorks from "./components/HowItWorks";

function Dashboard() {
  return (
    <div className="min-h-[80vh] w-[100%] text-white flex flex-col">
      <div className="flex">
        <DashboardMainContent />
        <DashboardSidebar />
      </div>
      <div className="flex">
        <HowItWorks />
      </div>
    </div>
  );
}

export default Dashboard;
