import dotenv from 'dotenv';
dotenv.config({ path: './.env' })



import { app } from './src/App'

const port = process.env.PORT || 10010

// mongoose
//     .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.uziolnl.mongodb.net/?retryWrites=true&w=majority`)
//     .then(() => {
app.listen(port, () => console.log(`🚀App running on port: ${port}`))
    // })
    // .catch(err => console.log(err))
