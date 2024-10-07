import UserCard from "@/components/UserCard";



const AdminPage = () => {
    return (
      <div className="p-2 flex flex-col gap-3 md:flex-row">
        <div className="w-full md:w-2/3">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <UserCard type="Student"/>
                <UserCard type="Student"/>
                <UserCard type="Student"/>
                <UserCard type="Student"/>
            </div>
        </div>
        <div className="w-full md:w-1/3">
            right
        </div>
      </div>
    );
  };
  
  export default AdminPage;