const Router = require('koa-router')

const authController = require("../controllers/auth");
const todolistController = require("../controllers/todolist");



module.exports = function (app) {
  const router = new Router()

  // router.use(async function (next) {
  //   this.type = "json";
  // });
  
  router.get("/", async (ctx, next) => {
    // this.type = "html";
    // await indexController.index.apply(this);
    await ctx.render('home.html', {
      title: 'hello 32243!'
    })
  });


  // router.get("/auth", authController.getCurrentUser);
  // router.post("/auth", authController.signIn);

  // router.all("/signout", authController.signOut);
  router.get("/register", async (ctx, next) => {
    await ctx.render('register.html', { })
  });

  router.get("/login", async (ctx, next) => {
    await ctx.render('login.html', { })
  });

  router.get("/member", async (ctx, next) => {
    await ctx.render('member.html', { })
  });

  router.post("/api/register", authController.createUser);
  router.post("/api/login", authController.signIn);
  router.post("/api/userinfo", authController.getUsrInfo);


  router.get('/todolist', async (ctx, next) => {
    await ctx.render('todolist.html')
  })

  router.get('/api/todolist/:id', todolistController.getTodolist)
  router.post('/api/todolist', todolistController.createTodolist)
  router.put('/api/todolist/:userId/:id/:status', todolistController.updateTodolist)
  router.delete('/api/todolist/:userId/:id', todolistController.removeTodolist)

  app.use(router.routes());
}
