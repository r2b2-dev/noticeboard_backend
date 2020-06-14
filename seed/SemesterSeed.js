import Semester from '../models/Semester'

let levels = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

var count = 0

export const seedSemester = async () => {
	levels.forEach(async (level) => {
		let semester = new Semester({
			level: level,
		})
		try {
			let seeded = await semester.save()
			if (seeded) {
				count = count + 1
			}
			if (count === levels.length) {
				console.log('Semester seeded successfully....')
			}
		} catch (error) {
			console.error('Error seeding semesters...', error.message)
		}
	})
}
