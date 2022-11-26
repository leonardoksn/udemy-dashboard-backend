import { Request, Response } from 'express'
import { prisma } from '../../App'

async function gains(req: Request, res: Response) {

  const main = async () => {
    try {

      const gains = await prisma.gains.findMany()


      return res.status(200).send(gains)
    } catch (error) {
      return res.status(400).send({ status: 'error', error: error })
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

export default gains
