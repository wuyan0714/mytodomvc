const path = require('path')
const {v4:uuid} = require('uuid')
const {readFileJSON, writeFileJSON} = require("../helper")

const dbs = 'dbs/todo.json'

class todoModel {
  constructor(list, completed) {
    this.list = list
    this.completed= completed
  }

  static findAll = async () => {
    let data = await readFileJSON(dbs)
    return data
  }

  static findOne = async (id) => {
    let data = await readFileJSON(dbs)
    return data.find(x => x.id === id)
  }

  static remove = async (id) => {
    let data = await readFileJSON(dbs)
    let del_id = data.findIndex(x=> x.id === id)
    let delItem = data.splice(del_id,1)
    await writeFileJSON(dbs, data)
    return delItem
  }

  static add = async (list) => {
    let data = await readFileJSON(dbs)
    let newTodo = {id: uuid(), list, completed: false}
    data.unshift(newTodo)
    await writeFileJSON(dbs, data)
    return newTodo
  }
  
  static replace = async (item) => {
    let data = await readFileJSON(dbs)
    let r_id = data.findIndex(x=> item.id === x.id)
    let result = {...data[r_id],...item}
    data[r_id] = result
    await writeFileJSON(dbs, data)
    return data[r_id]
  }


  static replaceAllCompleted = async (state) => {
    let data = await readFileJSON(dbs)
    data = data.map(x=> {
      x.completed=state
      return x
    })
    await writeFileJSON(dbs, data)
    return data
  }

}

module.exports = todoModel