import { PrismaClient } from "@prisma/client";

// Log outbound IP on startup to help diagnose Supabase network restrictions
if (process.env.NODE_ENV === "production") {
  fetch("https://api.ipify.org?format=json")
    .then((r) => r.json())
    .then((d) => console.log("[RENDER_OUTBOUND_IP]", d.ip))
    .catch(() => {});
}

if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
}

const prisma = global.prismaGlobal ?? new PrismaClient();

export default prisma;
