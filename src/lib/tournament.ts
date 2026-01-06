import {prisma} from "@/lib/prisma";

export async function tournament_count(){

    try{
        const count= await prisma.tournament.count();
        return count;
    }catch(error){
        console.error("Failed to fetch tournament count:", error);
        throw error;
    }}