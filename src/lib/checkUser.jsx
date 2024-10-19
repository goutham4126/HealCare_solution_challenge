import { db } from "./database";
import { currentUser } from "@clerk/nextjs/server";

export const checkUser=async()=>{
    const user=await currentUser();
    if(!user)
        {
            return null;
        }
    try
    {
        const loggedInUser= await db.user.findUnique(
            {
                where:{
                    clerkUserId:user.id
                }
            }
        );
        if(loggedInUser)
        {
            return loggedInUser;
        }
        const newuser=await db.user.create(
            {
                data:{
                    clerkUserId:user.id,
                    name:user.fullName,
                    imageUrl:user.imageUrl,
                    email:user.emailAddresses[0].emailAddress
                }
            }
        )
        return newuser;
    }
    catch(error)
    {
        return {error:"error creating user"}
    }

}

