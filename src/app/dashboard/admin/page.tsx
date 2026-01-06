import { admin_dashboard_service } from "@/lib/admin_dashboard_services";
import Link from "next/link";


export default async function AdminDashboardPage() {
   
    const { upcomingmatches, playercount, tournamentcount } = await admin_dashboard_service();
    return (
        <div>
            <h1>Dashboard</h1>
            <section>
                <h2>Upcoming Matches</h2>
                {upcomingmatches.length === 0 ? (
                    <p>No upcoming matches.</p>
                ) :
                upcomingmatches.map((match) => (
                    <div key={match.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <p><strong>{match.teamA.name}</strong> vs <strong>{match.teamB.name}</strong></p>

                        <p>Tournament: {match.tournament?.name || "Independent Match"}</p>
                        <p>Date: {new Date(match.date).toLocaleString()}</p>
                        
                    </div>
                    


                ))}
                
            </section>
            <div>
                    <p>Total Players: {playercount}</p>
                        <p>Total Tournaments: {tournamentcount}</p>
                </div>
                <div>
                    <ul>
                        <li><Link href="/admin/tournaments">Manage Tournaments</Link></li>
                        <li><Link href="/admin/players">Manage Players</Link></li>
                        <li><Link href="/admin/matches">Manage Matches</Link></li>
                    </ul>
                </div>
        </div>


    )



}