"use server"
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function AllDoctors()
{
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find doctors"};
    }
    try{
        const doctors=await db.user.findMany({
            where:{
                role:"DOCTOR"
            }
        })
        return doctors;
    }
    catch(error)
    {
        return {error:"Error finding doctors"};
    }
}

export default AllDoctors;