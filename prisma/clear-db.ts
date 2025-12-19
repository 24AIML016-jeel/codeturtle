import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
config()
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
async function clearDatabase() {
  console.log('🗑️  Clearing database...')
  try {
    await prisma.verification.deleteMany()
    console.log('✓ Cleared verifications')
    await prisma.session.deleteMany()
    console.log('✓ Cleared sessions')
    await prisma.account.deleteMany()
    console.log('✓ Cleared accounts')
    await prisma.user.deleteMany()
    console.log('✓ Cleared users')
    console.log('\n✅ Database cleared successfully!')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}
clearDatabase()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
