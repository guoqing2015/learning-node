const Todolist = require('../models/todolist')

exports.getTodolist = async (ctx) => {
    const user_id = ctx.param.id;

}

exports.createTodolist = async (ctx) => {
    const data = ctx.request.body
    try {
        const todolist = new Todolist({
            user_id: data.user_id,
            content: data.content,
            status: data.status
        })
        await todolist.save()
        ctx.body = {
            code: 200,
            message: '创建成功！'
        }
    } catch (err) {
        ctx.throw(err)
    }

}

exports.updateTodolist = async (ctx) => {

}

exports.removeTodolist = async (ctx) => {

}