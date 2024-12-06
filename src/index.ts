import express,{Request,Response} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import projectRoutes from "./routes/projectRoutes"
import taskRoutes from "./routes/taskRoutes"

dotenv.config()

const app = express()
const PORT = 3000;

app.use(express.json())


mongoose.connect(process.env.MONGO_URI as string)
    .then(()=>{
        console.log("Connexion à MongoDB Reussi !")
    })
    .catch((error)=>{
        console.log("Erreur : Impossible de se connecter" , error)
    })

app.use("/api",projectRoutes,taskRoutes)

app.get("/",(req:Request,res:Response)=>{
    res.send("Page d'acceuil")
})



app.listen(PORT,()=>{
    console.log("Application écoute sur le PORT", PORT)
})