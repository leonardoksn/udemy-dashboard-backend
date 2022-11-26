import { Request, Response } from 'express'
import { prisma } from '../../App'


async function expenses(req: Request, res: Response) {
  const main = async () => {


    try {

      const expenses = await prisma.expenses.findMany()

      return res.status(200).send(expenses)
    } catch (error) {
      return res.status(404).send({ status: 'error', error: error })
    } finally {
      await prisma.$disconnect()
    }
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
}

export default expenses
