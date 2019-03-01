
nodejs 基础的练习

模拟数据，列表数据的 增、删、改、查 功能操作

所需要安装的第三方包：
	express     			---node.js Web应用框架
	art-template			---模板引擎  即使用render()
	express-art-template	---模板引擎渲染 即使用 app.engine('html',require('express-art-template'))
	body-parser				---第三方核心模块的中间件 解析 post 数据
	bootstrap@3.3.7  		---根据静态页面模板，加载指定的插件 （当前页面用的是bootstrap 3.3.7版）

操作步骤如下：

1.先创建好目录

	studentInfo   ---  项目总文件夹
	public		  ---  公共文件夹，存放 js,css,img
	views         ---  视图文件夹，存放html页面
	app.js        ---  项目入口文件

2.在项目总文件夹目录下打开 node 终端 
	2.1 初始化项目
		npm init --y
	2.1 安装第三方包 （简写）注意加上 -S ，后面用@是安装指定版本
		npm i -S express art-template express-art-template body-parser bootstrap@3.3.7

3.设计模拟数据 db.json文件

4.设置入口文件 app.js
	
	var express = require('express')
	var path = require('path') //nodejs中的 path 模块
	var bodyParser = require('body-parser')//express中没有内置获取表单post请求的API，这里需要用第三方包：body-parser
	
	var router = require('./router.js') //引入路由文件
	var app = express()//创建app

	//开放资源   推荐使用第一种
	app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
	app.use('/public/',express.static(path.join(__dirname,'./public/')))
	
	//配置使用 art-template 模板引擎  第一个参数为模板引擎的文件格式
	app.engine('html',require('express-art-template'))
	//设置模板引擎目录，其中默认就是 ./views 目录
	app.set('views', path.join(__dirname, './views/'))
	
	//配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended:false }))
	// parse application/json
	app.use(bodyParser.json())
	
	// 把路由挂载到 app 中
	app.use(router)
	
	//设置端口监听
	app.listen(3000,function(){
		console.log('port:3000 is running......')
	})

5.编辑路由文件 router.js

	var express = require('express')

	var Student = require('./student.js') //引入 student操作模块

	var router = express.Router() //创建路由容器
	
	//设置路由，并渲染静态页面
	router.get('/index',function(req,res){
		Student.find(function(err,data){
			var students = data.students
			res.render('./index.html',{students:students})
		})
	})
	
	//导出路由容器
	module.exports = router

6.编辑操作模块文件 student.js 
	
	var fs = require('fs')	//引入node fs模块，文件模块

	var dbPath = './db.json'  //引入 模拟数据文件
	
	//在 module.exports 上添加对象  此处使用了回调函数
	exports.find = function(callback){
		fs.readFile(dbPath,'utf8',function(err,data){
			if(err) return callback(err)
			callback(null,JSON.parse(data))
		})
	} 

	注：如果操作模块有不同的分类，可创建一个文件夹，将每个不同的模块放入不同的文件中。


