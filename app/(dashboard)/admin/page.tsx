import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";



const AdminPage = () => {
    return (
      <div className="p-2 flex flex-col gap-3 md:flex-row">
        <div className="flex flex-col gap-6 w-full md:w-2/3 ">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <UserCard type="Student"/>
                <UserCard type="Parents"/>
                <UserCard type="Teacher"/>
                <UserCard type="Staff"/>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
                <div className="">
                    <CountChart />
                </div>
            </div>
        </div>
        <div className="w-full md:w-1/3">
            right
        </div>
      </div>
    );
  };
  
  export default AdminPage;