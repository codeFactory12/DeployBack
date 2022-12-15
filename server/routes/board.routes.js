import { Router } from 'express'
import {
  getBoardid,
  getBoards,
  postBoard,
  putBoard,
  deleteBoard,

} from '../Controllers/board.controller.js'

const router = Router()

router.get('/board', getBoards)

router.get('/board/:id', getBoardid)

router.post('/board', postBoard)

router.delete('/board/:id', deleteBoard)

router.put('/board/:id', putBoard)

export default router