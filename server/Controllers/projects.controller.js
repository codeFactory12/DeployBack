import { pool } from '../db.js'

export const getProjects = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (!error) {
      console.log('succes')
    } else {
      console.log('error')
    }
  })
  try {
    const [results] = await pool.query('SELECT * FROM tasks')
    res.json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getProjectsid = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id])
    if (results.length === 0) return res.status(404).json({ message: 'Task not found' })
    res.json(results[0])
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const postProject = async (req, res) => {
  try {
    const { title, description } = req.body
    const [results] = await pool.query('INSERT INTO tasks(title, description) VALUES (?, ?)', [title, description])
    res.json({
      id: results.insertId,
      title,
      description,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tasks not found' })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const putProject = async (req, res) => {
  try {
    const result = await pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id])
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
