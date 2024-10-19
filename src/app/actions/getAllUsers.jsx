"use server"
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function AllUsers()
{
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find users"};
    }
    try{
        const doctors=await db.user.findMany({})
        return doctors;
    }
    catch(error)
    {
        return {error:"Error finding doctors"};
    }
}

export default AllUsers;