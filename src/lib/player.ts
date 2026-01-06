import {prisma} from "@/lib/prisma";
export async function playerscount(){

    try{
        const count= await prisma.player.count();
        return count;
    }catch(error){
        console.error("Failed to fetch players count:", error);
        throw error;
    }
}