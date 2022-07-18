const express = require('express')
const todoRouter = express.Router()
const todoController = require('../controllers/todoControllerjs')

todoRouter.get('/', (req, res) => {
    res.redirect('/all')
  })
todoRouter.get('/all', todoController.getAll) //查所有
todoRouter.get('/active', todoController.getActive) //查未完成的
todoRouter.get('/completed', todoController.getCompleted) //查查完成的

todoRouter.post('/add', todoController.add)  //增加一条todo
todoRouter.post('/update', todoController.update) //修改一条todo
todoRouter.post('/updateAllCompleted', todoController.updateAllCompleted) //将所有todo修改为已完成或未完成
todoRouter.post('/delete', todoController.delete)  //删除一条todo
todoRouter.post('/deleteAllCompleted', todoController.deleteAllCompleted) //删除所以已完成todo

module.exports = todoRouter