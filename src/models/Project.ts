import {Schema,Document, model} from "mongoose"

interface IProject extends Document{
    name : String,
    description : String,
    status : String,
    createdAt : Date
}

const projectSchema = new Schema<IProject>( {
    name : {
        type:String,
        required:true
    },
    description : {
        type:String
    },
    status : {
        type: String,
        default:"planned"
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
})

const Project = model<IProject>('Project',projectSchema)
export default Project 