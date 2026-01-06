import { matches_upcoming } from "@/lib/matches"
import { playerscount } from "@/lib/player";
import { tournament_count } from "@/lib/tournament";
import type { upcomingmatch } from "@/lib/type";
import type { dashboard_data } from "@/lib/type";

export  async function admin_dashboard_service(): Promise<dashboard_data> {
    try{
     const [upcomingmatches, playercount, tournamentcount] = await Promise.all([
  matches_upcoming(), 
  playerscount(),
  tournament_count()
]);

return { upcomingmatches, playercount, tournamentcount };}
    
   catch (error) {
    console.error("Failed to load admin dashboard data:", error);
    throw error;
   }    
}

