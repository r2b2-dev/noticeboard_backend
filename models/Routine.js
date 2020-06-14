import mongoose from 'mongoose'
import Batch from './Batch'

const Schema = mongoose.Schema

const RoutineSchema = new Schema({
    day: {
        type: String,
        required: [true, 'Batch label is required'],
        trim: true,
    },
    subjectId: {
        type: String,
        required: [true, 'Batch label is required'],
        trim: true,
    },
    batchId: {
        type: Schema.Types.ObjectId,
        ref: Batch
    },
    duration: {
        type: String,
        required: [true, 'Batch label is required'],
        trim: true,
    },
})

RoutineSchema.methods.toJSON = function () {
    let routine = this.toObject()
    delete routine.__v
    return routine
}
const Routine = mongoose.model('routine', RoutineSchema)

export default Routine
