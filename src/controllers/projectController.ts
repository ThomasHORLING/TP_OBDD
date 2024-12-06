import Project from "../models/Project";
import { Request,Response } from "express";

export const createProject = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {name, description} = req.body
        if (!name){
            return res.status(400).json({
                message:"Le nom et une description doit être donné"
            })
        }
        const newProject = new Project({name, description})
        const saveProject = await newProject.save()
        res.status(201).json({
            message: "Projet crée avec succès !",
            project:saveProject,
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getAllProject = async (req:Request,res:Response):Promise<any>=>{
    try{
        const projects = await Project.find()
        res.status(200).json({
            message:"Projets récuperer avec succès",
            projets : projects
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getProject = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id} = req.params 
        const project = await Project.findById(id)
        if (!project){
            return res.status(404).json({
                message:"Projet introuvable"
            })
        }
        res.status(200).json({
            message:"Projet récuperer avec succès",
            projet : project
        })
    }catch(error:any){
        res.status(500).json({ 
            message:error.message
        })
    }
}

export const putProject = async (req:Request, res:Response):Promise<any> =>{
    try{
        const {id} = req.params
        if(req.body.status || req.body.status == ""){
            if (!(req.body.status =="planned" || req.body.status=="in-progress"|| req.body.status== "completed")){
                    return res.status(400).json({
                        message:"Valeur invalide pour status"
                })
            }
        }
        const update= req.body
        const updatedProject = await Project.findByIdAndUpdate(id,update,{new:true})
        if(!updatedProject){
            return res.status(404).json({
                message:"Error : Projet non trouvé"
            })
        }
        res.status(200).json({
            message:"Projet mis a jour avec succès !",
            projet:updatedProject
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const delProject = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id} = req.params
        const del = await Project.findByIdAndDelete(id)
        if (!del){
            return res.status(404).json({
                message:"Projet non existant"
            })
        }
        res.status(200).json({
            message:"Projet supprimé avec succès !",
            projet : del
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}
export const completeProject = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {id} = req.params
        const status = {status:"completed"}
        const completed = await Project.findByIdAndUpdate(id,status,{new:true})
        if (!completed){
            return res.status(404).json({
                message:"Projet introuvable"
            })
        }
        res.status(200).json({
            message:"Statut du projet mis a jour",
            projet : completed
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}

export const filterStatus = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {status} = req.query
        const filter:Record<string,any>={}
        if(status){
            if (!(status=="planned" || status=="in-progress" || status=="completed")){
                return res.status(400).json({
                    message:"Valeur de statut invalide. Valeur de statut valides sont planned, in-progress ou completed"
                })
            }
            filter.status = status
        }
        const projets = await Project.find(filter)
        res.status(200).json({
            message:"Recherche executée avec succès !",
            projets:projets
        })
    }catch(error:any){
        res.status(500).json({
            message:error.message
        })
    }
}