import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';


import { prisma } from '../../App';


const login = async (req: Request, res: Response) => {
  const main = async () => {
    const { email, password } = req.body;


    // validation
    if (!email) {
      return res.status(422).json({ status: 'error', error: "O email é obrigatório" })
    }
    if (!password) {
      return res.status(422).json({ status: 'error', error: "A senha é obrigatória" })
    }


    const user = await prisma.users.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(422).json({ status: 'error', error: "Usuário não encontrado" })
    }

    // check if password match
    const checkPassword = (password === user.password)

    if (!checkPassword) {
      return res.status(422).json({ status: 'error', error: "Senha inválida" })
    }

    try {
      const secret = process.env.SECRET;

      const token = sign({
        id: user.id
      },
        String(secret))


      return res.status(200).send({ msg: "Autenticação realizada com sucesso!", token })

    } catch (error) {

      return res.status(404).send({ status: 'error', error: error })

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

export { login }
