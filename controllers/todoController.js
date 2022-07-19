const path = require('path')
const todoModel = require('../models/todoModel')

exports.getAll = async (req, res, next) => {
  let curTodoList = await todoModel.findAll()
  let unCompletedNum = curTodoList.filter(x=>!x.completed).length
  let completedNum = curTodoList.filter(x=>x.completed).length
  let dataType = 'all'
  let haveCompleted = completedNum>0
  res.render('index', {curTodoList,unCompletedNum,dataType,haveCompleted} )
}

exports.getActive = async (req, res, next) => {
  let curTodoList = await todoModel.findAll()
  let unCompletedNum = curTodoList.filter(x=>!x.completed).length
  let completedNum = curTodoList.filter(x=>x.completed).length
  curTodoList = curTodoList.filter(x=>!x.completed)
  let dataType = 'active'
  let haveCompleted = completedNum>0
  res.render('index', {curTodoList,unCompletedNum,dataType,haveCompleted} )
}

exports.getCompleted = async (req, res, next) => {
  let curTodoList = await todoModel.findAll()
  let unCompletedNum = curTodoList.filter(x=>!x.completed).length
  let completedNum = curTodoList.filter(x=>x.completed).length
  curTodoList = curTodoList.filter(x=>x.completed)
  let dataType = 'completed'
  let haveCompleted = completedNum>0
  res.render('index', {curTodoList,unCompletedNum,dataType,haveCompleted} )
}

exports.delete = async (req, res, next) => {
  let {id} = req.body
  await todoModel.remove(id)
  res.redirect('back'); 
}

exports.deleteAllCompleted = async (req,res,next) => {
  let result = await todoModel.findAll()
  for(let i=0;i<result.length;i++){
    if(result[i].completed===true){
      await todoModel.remove(result[i].id)
    }
  }
  res.redirect('back'); 
}

exports.add = async (req,res,next) => {
  let {content} = req.body
  content = content.trim()
  if(content.length===0){
    return
  }
  await todoModel.add(content)
  res.redirect('back'); 
}

exports.update = async (req,res,next) => {
  let body = req.body
  if(("content" in body)&&(body.content.trim().length===0)){
    let {id} = req.body
    await todoModel.remove(id)
  }else{
    let saveItem = {...body,completed: body.completed? true: false}
    await todoModel.replace(saveItem)
  }
  res.redirect('back'); 
}

exports.updateAllCompleted = async (req,res,next) => {
  let result = await todoModel.findAll()
  let noAllCompleted = result.some(x=>!x.completed)
  if(noAllCompleted){
    todoModel.replaceAllCompleted(true)
  }else{
    todoModel.replaceAllCompleted(false)
  }
  res.redirect('back'); 
}

