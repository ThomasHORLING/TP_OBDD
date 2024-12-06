import {Schema,Document, model} from "mongoose"

interface ITask extends Document{
    projectId:Schema.Types.ObjectId,
    title:String,
    done:Boolean,
    dueDate:Date
}

const taskSchema = new Schema<ITask>(
    {
        projectId :{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Project'
        },
        title:{
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            default:  false
        },
        dueDate : {
            type:Date,
            default:Date.now
        }
    }
)

const Task = model<ITask>('Task',taskSchema)
export default Task