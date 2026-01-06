import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {Sport} from "@prisma/client";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sportparam = searchParams.get("sport");
    const sport = sportparam?.toUpperCase();
    const isvalid = Object.values(Sport).includes(sport as Sport);
    
    if(!sport){

     const players = await prisma.player.findMany();
     return NextResponse.json(players, { status: 200 });
    }
    if( !isvalid) {
        return NextResponse.json({ error: "Invalid sports parameter" }, { status: 400 });
    }
    try{
        const players = await prisma.player.findMany({
            where: {
                sports: {
                    some: {
                        sport: sport as Sport
                    }
                }
            }});
        return NextResponse.json(players, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
