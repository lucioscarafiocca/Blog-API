require("dotenv").config()
const { PrismaClient } = require("../generated/prisma")
const { PrismaPg } = require("@prisma/adapter-pg")

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const post = await prisma.post.findMany()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
