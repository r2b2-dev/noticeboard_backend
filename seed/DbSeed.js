require('dotenv').config()
import mongoose from 'mongoose'
import { seedSemester } from './SemesterSeed'
import { seedAdmin } from './AdminSeed'

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
})

const seedDatabase = async () => {
	try {
		await seedSemester()
		let adminSeeded = await seedAdmin()
		if (adminSeeded) {
			console.log('Admin seeded successfully...')
			mongoose.disconnect()
		}
	} catch (error) {
		console.error('Error seeding database...', error.message)
	}
}

seedDatabase()
