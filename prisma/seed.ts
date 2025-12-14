import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ================= USERS ================= */

  const admin = await prisma.user.upsert({
    where: { email: "admin@college.edu" },
    update: {},
    create: {
      email: "admin@college.edu",
      name: "Admin",
      role: "ADMIN",
    },
  });

  const coach = await prisma.user.upsert({
    where: { email: "coach@college.edu" },
    update: {},
    create: {
      email: "coach@college.edu",
      name: "Coach Sharma",
      role: "COACH",
    },
  });

  const scorer = await prisma.user.upsert({
    where: { email: "scorer@college.edu" },
    update: {},
    create: {
      email: "scorer@college.edu",
      name: "Scorer",
      role: "SCORER",
    },
  });

  console.log("✅ Users created");

  /* ================= PLAYERS ================= */

  const p1 = await prisma.player.upsert({
    where: { rollNumber: "23CSE001" },
    update: {},
    create: {
      rollNumber: "23CSE001",
      name: "Daksh",
      email: "daksh@college.edu",
      department: "CSE",
      userId: admin.id, // example link
    },
  });

  const p2 = await prisma.player.upsert({
    where: { rollNumber: "23CSE002" },
    update: {},
    create: {
      rollNumber: "23CSE002",
      name: "Rohan",
      email: "rohan@college.edu",
      department: "CSE",
    },
  });

  const p3 = await prisma.player.upsert({
    where: { rollNumber: "23ECE010" },
    update: {},
    create: {
      rollNumber: "23ECE010",
      name: "Aman",
      email: "aman@college.edu",
      department: "ECE",
    },
  });

  console.log("✅ Players created");

  /* ================= PLAYER SPORTS ================= */

  await prisma.playerSport.createMany({
    data: [
      { playerId: p1.id, sport: "CRICKET" },
      { playerId: p1.id, sport: "FOOTBALL" },
      { playerId: p2.id, sport: "CRICKET" },
      { playerId: p3.id, sport: "VOLLEYBALL" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Player sports assigned");

  /* ================= TOURNAMENT ================= */

  const tournament = await prisma.tournament.create({
    data: {
      name: "Inter-Department Cricket Cup 2025",
      sport: "CRICKET",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-20"),
      status: "UPCOMING",
    },
  });

  console.log("✅ Tournament created");

  /* ================= TEAMS ================= */

  const teamA = await prisma.team.create({
    data: {
      name: "CSE Warriors",
      sport: "CRICKET",
      budget: 100,
      tournamentId: tournament.id,
    },
  });

  const teamB = await prisma.team.create({
    data: {
      name: "ECE Titans",
      sport: "CRICKET",
      budget: 100,
      tournamentId: tournament.id,
    },
  });

  console.log("✅ Teams created");

  /* ================= AUCTION ================= */

  const auction = await prisma.auction.create({
    data: {
      tournamentId: tournament.id,
      budgetPerTeam: 100,
      status: "SCHEDULED",
    },
  });

  console.log("✅ Auction created");

  await prisma.auctionPlayerPool.createMany({
    data: [
      { auctionId: auction.id, playerId: p1.id, basePrice: 10 },
      { auctionId: auction.id, playerId: p2.id, basePrice: 12 },
      { auctionId: auction.id, playerId: p3.id, basePrice: 8 },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Auction player pool created");

  /* ================= AUCTION RESULT (SIMULATED) ================= */

  await prisma.auctionResult.create({
    data: {
      auctionId: auction.id,
      playerId: p1.id,
      teamId: teamA.id,
      soldPrice: 20,
    },
  });

  await prisma.teamRoster.create({
    data: {
      teamId: teamA.id,
      playerId: p1.id,
      role: "All-Rounder",
      isCaptain: true,
    },
  });

  console.log("✅ Auction result + team roster created");

  /* ================= MATCH ================= */

  const match = await prisma.match.create({
    data: {
      tournamentId: tournament.id,
      sport: "CRICKET",
      teamAId: teamA.id,
      teamBId: teamB.id,
      date: new Date("2025-02-05"),
      venue: "Main Ground",
      status: "SCHEDULED",
    },
  });

  console.log("✅ Match created");

  await prisma.matchLineup.createMany({
    data: [
      {
        matchId: match.id,
        teamId: teamA.id,
        playerId: p1.id,
        position: "Batsman",
      },
      {
        matchId: match.id,
        teamId: teamB.id,
        playerId: p2.id,
        position: "Bowler",
      },
    ],
  });

  console.log("✅ Match lineup created");

  await prisma.matchEvent.create({
    data: {
      matchId: match.id,
      sport: "CRICKET",
      eventType: "RUNS",
      payload: { runs: 4, over: 2, ball: 3 },
    },
  });

  console.log("✅ Match event added");

  console.log("🎉 Database seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
