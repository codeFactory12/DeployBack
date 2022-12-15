import { Router } from 'express'
import {
  getProjects,
  postProject,
  putProject,
  deleteProject,
  getProjectsid,
} from '../Controllers/projects.controller.js'

const router = Router()

router.get('/tasks', getProjects)

router.get('/tasks/:id', getProjectsid)

router.post('/tasks', postProject)

router.delete('/tasks/:id', deleteProject)

router.put('/tasks/:id', putProject)

export default router
