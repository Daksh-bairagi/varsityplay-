import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { upcomingmatch } from "@/lib/type";

export async function matches_upcoming(): Promise<upcomingmatch[]> {
     try{
        const date = new Date(Date.now());
        const matches = await prisma.match.findMany({
            where: {
                date: {
                    gte: date
                }},
                orderBy:{
                    date: 'asc'
                },
                take: 3,
                include: {
                    teamA: true,
                    teamB: true,
                    tournament: true
                
            }
        });
        return matches;
     }
     catch (error) {
        console.error("Failed to fetch upcoming matches:", error);
        throw error;
     }
}