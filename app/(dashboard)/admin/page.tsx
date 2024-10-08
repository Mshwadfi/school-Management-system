import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";



const AdminPage = () => {
    return (
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-6 w-full md:w-2/3 ">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <UserCard type="Student"/>
                <UserCard type="Parent"/>
                <UserCard type="Teacher"/>
                <UserCard type="Staff"/>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="w-full lg:w-1/3 h-[450px]">
                    <CountChart />
                </div>
                <div className="w-full lg:w-2/3 h-[450px]">
                    <AttendanceChart />
                </div>
            </div>
            <div className="h-[500px] w-full">
                <FinanceChart />
            </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
            <EventCalendar />
        </div>
      </div>
    );
  };
  
  export default AdminPage;