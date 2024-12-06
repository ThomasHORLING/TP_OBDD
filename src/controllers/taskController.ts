import Task from "../models/Task";
import { Request,Response} from "express";


export const createTask = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {projectId,title}=req.body
        if (!projectId || !title){
            return res.status(400).json({
                message:"L'ID du projet et le titre sont obligatoire"
            })
        }
        const newTask = new Task({projectId,title})
        const savedTask = await newTask.save()
        res.status(201).json({
            message:"Tache crée avec succès",
            task:savedTask
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getAllTasks = async (req:Request,res:Response):Promise<any>=>{
    try{
        const tasks = await Task.find().populate("projectId")
        res.status(200).json({
            message:"Actions effectué avec succès !",
            tasks:tasks
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getTask = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id}=req.params
        const task = await Task.findById(id).populate("projectId")
        if (!task){
            res.status(404).json({
                message:"Tache introuvable"
            })
            return;
        }
        res.status(200).json({
            message:"Action effectué avec succès !",
            task:task
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const putTask = async (req:Request, res:Response):Promise<any> =>{
    try{
        const {id} = req.params
        const update= req.body
        const updatedTask = await Task.findByIdAndUpdate(id,update,{new:true})
        if(!updatedTask){
            return res.status(404).json({
                message:"Error : Tache non trouvé"
            })
        }
        res.status(200).json({
            message:"Tache mis a jour avec succès !",
            task:updatedTask
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const delTask = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id} = req.params
        const del = await Task.findByIdAndDelete(id)
        if (!del){
            return res.status(404).json({
                message:"Tache non existante"
            })
        }
        res.status(200).json({
            message:"Tache supprimée avec succès !",
            task : del
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const taskDone = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id} = req.params
        const done = {done:true}
        const completed = await Task.findByIdAndUpdate(id,done,{new:true})
        if (!completed){
            return res.status(404).json({
                message:"Tache introuvable"
            })
        }
        res.status(200).json({
            message:"Tache mis a jour",
            task : completed
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const TaskDateFilter = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {date} = req.query
        const filter:Record<string,any> ={}
        if (date){
            filter.dueDate = {}
            filter.dueDate.$lte = new Date(date as string)
        }
        const tasks = await Task.find(filter)
        res.status(200).json(tasks)
    }catch(error:any){
        res.send(500).json({
            message:error.message
        })
    }
}