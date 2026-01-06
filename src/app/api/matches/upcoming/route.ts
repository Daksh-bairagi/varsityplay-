import { NextResponse } from "next/server";
import { matches_upcoming } from "@/lib/matches";

export async function GET() {
    try {
        const matches = await matches_upcoming();

        return NextResponse.json(matches, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch matches:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}