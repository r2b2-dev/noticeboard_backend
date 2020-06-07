import mongoose from 'mongoose'

mongoose
	.connect('mongodb://127.0.0.1:27017/notice_board', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected...'))
	.catch((error) => console.log(error))
