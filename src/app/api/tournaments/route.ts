import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
     const tournaments = await prisma.tournament.findMany();
     return NextResponse.json(tournaments);
    }
    catch(error){
        console.error("Error fetching tournaments:", error);
        return NextResponse.json({ error: "Failed to fetch tournaments" }, { status: 500 });
    }
    

}
export async function POST(request: Request){

    try{
        const body= await request.json();
        const tournament = await prisma.tournament.create({
            data: {
                name: body.name,
                sport: body.sport,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate)


            }
        });
        return NextResponse.json(tournament);
    }catch(error){
        console.error("Error creating tournament:", error);
        return NextResponse.json({ error: "Failed to create tournament" }, { status: 500 });
    }

}

