import Link from "next/link"
export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <aside>
                <nav>
                    <ul>
                        <li><Link href="/dashboard/">Overview</Link></li>
                        <li><Link href="/dashboard/player">Players</Link></li>
                        <li><Link href="/dashboard/tournament">Tournaments</Link></li>
                        <li><Link href="/dashboard/matche">Matches</Link></li>
                        
                    </ul>
                </nav>
            </aside>
            <main>{children}</main>
        </div>
    )
}