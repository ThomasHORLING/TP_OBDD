import { Router } from "express";
import { TaskDateFilter,createTask,getAllTasks,getTask,putTask,delTask,taskDone } from "../controllers/taskController";

const router = Router()

router.post("/tasks",createTask)
router.get("/tasks",getAllTasks)
router.get("/tasks/due-before",TaskDateFilter)
router.post("/tasks/:id/mark-done",taskDone)
router.get("/tasks/:id",getTask)
router.put("/tasks/:id",putTask)
router.delete("/tasks/:id",delTask)

export default router