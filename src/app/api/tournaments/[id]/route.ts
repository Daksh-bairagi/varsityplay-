import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteParams = {
    params : {
        id: string;
    }
}

export async function GET(request: Request, { params }: RouteParams) {
    
    const { id } = params;

    if(!id || typeof id !='string'){
        return NextResponse.json({error : 'Invalid tournament ID'}, {status: 400});
    }
    try {
       const tournament = await prisma.tournament.findUnique({
        where: {
            id
        },
        include: {
            matches: true,
            teams: true
        }
       });
       if(!tournament){
        return NextResponse.json({error : 'Tournament not found'}, {status: 404});
       }
       return NextResponse.json(tournament, {status: 200});

    } catch (error) {
        console.log('Error fetching tournament:', error);

        return NextResponse.json({error : 'Internal Server Error'}, {status: 500}); 


    }


}
