export const isAdmin = async (request, response, next) => {
	try {
		if (request.authUser.type === 'Admin') {
			next()
		} else {
			response.status(401).json({ success: false, error: 'You do not have sufficient privileges!' })
		}
	} catch (error) {
		response.status(500).json({ success: false, error: error.message })
	}
}
