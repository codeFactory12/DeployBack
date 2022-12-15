import { Router } from 'express'
import {
  getBoardlist,
  getBoardlistid,
  postBoardlist,
  putBoardlist,
  deleteBoardlist,

} from '../Controllers/boardlist.controller.js'

const router = Router()

router.get('/lists', getBoardlist)

router.get('/lists/:id', getBoardlistid)

router.post('/lists', postBoardlist)

router.delete('/lists/:id', deleteBoardlist)

router.put('/lists/:id', putBoardlist)

export default router