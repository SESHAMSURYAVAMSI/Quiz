import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DashboardContent from "@/components/dashboard/DashboardContent";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-black">
      
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />
        <DashboardContent />
      </main>
    </div>
  );
};

export default DashboardPage;