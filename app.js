require('dotenv').config()
import express from 'express'
import cors from 'cors'
import './config/DbConnection'
import authRouter from './routes/api'

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', authRouter)

app.listen(PORT, () => {
	console.log('Server up and running at ' + `http://localhost:${PORT}/`)
})
