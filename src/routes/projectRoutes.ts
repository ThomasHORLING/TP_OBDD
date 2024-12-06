import { filterStatus,completeProject,createProject, getAllProject,getProject,putProject,delProject } from "../controllers/projectController";
import { Router } from "express";

const router= Router()

router.post("/projects", createProject)
router.get("/projects",getAllProject)
router.get("/projects/by-status",filterStatus)
router.get("/projects/:id",getProject)
router.post("/projects/:id/complete",completeProject)
router.put("/projects/:id",putProject)
router.delete("/projects/:id",delProject)

export default router
