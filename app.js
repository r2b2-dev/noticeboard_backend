import express from 'express'
import cors from 'cors'
import './config/DbConnection'
import router from './routes/api'

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
	console.log('Server up and running at ' + `http://localhost:${PORT}/`)
})
