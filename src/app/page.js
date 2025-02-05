import AdminDashboard from "@/components/AdminDashboard";
import Articles from "@/components/Articles";
import Banner from "@/components/Banner";
import { Component } from "@/components/chart";
import Diseases from "@/components/Diseases";
import { checkUser } from "@/lib/checkUser";
import AllUsers from '@/app/actions/getAllUsers';
import LocationFinder from "@/components/Maps/NearestHos";

export default async function Home() {
  const user = await checkUser();


  if(!user)
  {
    return null;
  }
  
  const getUserCounts = async () => {
    try {
      const users = await AllUsers();

      if (!Array.isArray(users)) {
        return {
          admins: 0,
          patients: 0,
          doctors: 0,
        };
      }

      const counts = {
        admins: 0,
        patients: 0,
        doctors: 0,
      };

      users.forEach((user) => {
        if (user.role === "ADMIN") counts.admins++;
        else if (user.role === "DOCTOR") counts.doctors++;
        else if (user.role === "PATIENT") counts.patients++;
      });

      return counts;
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        admins: 0,
        patients: 0,
        doctors: 0,
      };
    }
  };

  const userCounts = await getUserCounts();

  return (
    <div className="">
      {user?.role !== "ADMIN" && 
          <Banner />
      }
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl md:text-2xl text-stone-500">Hello, {user.name}</h1>
        <h1 className="text-base md:text-xl  text-gray-600"> {user.role}</h1>
      </div>
      {user?.role !== "ADMIN" && (
        <div>
          <LocationFinder />
          <Diseases />
          <Articles />
        </div>
      )}
      {user?.role === "ADMIN" && (
        <div>
          <AdminDashboard />
          <Component
            adminCount={userCounts.admins}
            doctorCount={userCounts.doctors}
            patientCount={userCounts.patients}
          />
        </div>
      )}
    </div>
  );
}
