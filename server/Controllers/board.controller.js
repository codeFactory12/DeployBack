import { pool } from '../db.js'

export const getBoards = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (!error) {
      console.log('succes')
    } else {
      console.log('error')
    }
  })
  try {
    const [results] = await pool.query('SELECT * FROM board')
    res.json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBoardid = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM board WHERE id = ?', [req.params.id])
    if (results.length === 0) return res.status(404).json({ message: 'Task not found' })
    res.json(results[0])
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const postBoard = async (req, res) => {
  try {
    const { boardtitle, numlist } = req.body
    const [results] = await pool.query('INSERT INTO board(boardtitle, numlist) VALUES (?, ?)', [boardtitle, numlist])
    res.json({
      id: results.insertId,
      boardtitle,
      numlist,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteBoard = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM board WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tasks not found' })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const putBoard = async (req, res) => {
  try {
    const result = await pool.query('UPDATE board SET ? WHERE id = ?', [req.body, req.params.id])
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
