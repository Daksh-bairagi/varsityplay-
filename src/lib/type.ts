import type { Match, Team, Tournament } from "@prisma/client";

export type upcomingmatch = Match & {
    teamA: Team;
    teamB: Team;
    tournament ?: Tournament;
};
export type dashboard_data= {
    upcomingmatches: upcomingmatch[];
    playercount: number;
    tournamentcount: number;
}