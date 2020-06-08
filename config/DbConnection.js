require('dotenv').config()

import mongoose from 'mongoose'

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected...'))
	.catch((error) => console.log(error))
