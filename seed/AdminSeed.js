import User from '../models/User'

export const seedAdmin = async () => {
	let admin = new User({
		firstName: 'Admin',
		lastName: 'Admin',
		email: 'admin@noticeboard.com',
		type: 'Admin',
		password: 'password',
	})
	try {
		return await admin.save()
	} catch (error) {
		console.error('Error seeding admin...', error.message)
	}
}
