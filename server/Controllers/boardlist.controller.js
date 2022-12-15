import { pool } from '../db.js'

export const getBoardlist = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (!error) {
      console.log('succes')
    } else {
      console.log('error')
    }
  })
  try {
    const [results] = await pool.query('SELECT * FROM boardlists')
    res.json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBoardlistid = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM boardlists WHERE id = ?', [req.params.id])
    if (results.length === 0) return res.status(404).json({ message: 'Task not found' })
    res.json(results[0])
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const postBoardlist = async (req, res) => {
  try {
    const { listtitle, numtask } = req.body
    const [results] = await pool.query('INSERT INTO boardlists(listtitle, numtask) VALUES (?, ?)', [listtitle, numtask])
    res.json({
      id: results.insertId,
      listtitle,
      numtask,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteBoardlist = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM boardlists WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tasks not found' })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const putBoardlist = async (req, res) => {
  try {
    const result = await pool.query('UPDATE boardlists SET ? WHERE id = ?', [req.body, req.params.id])
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
