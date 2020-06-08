import jwt from 'jsonwebtoken'
import User from '../models/User'

export const checkAuth = async (request, response, next) => {
	try {
		const token = await request.headers.authorization.split(' ')[1]
		const decoded = await jwt.verify(token, process.env.SECRET_KEY)
		const authUser = await User.findOne({ _id: decoded.id, 'authTokens.token': token })
		if (!authUser) {
			response.status(404).json({ success: false, error: 'User does not exist!' })
		} else {
			request.token = token
			request.authUser = authUser
			next()
		}
	} catch (error) {
		console.log('auth.js', error.message)
		response.status(401).json({ success: false, error: 'Unauthorized. Token Missing!' })
	}
}
