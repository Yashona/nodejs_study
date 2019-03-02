var express = require('express')

var Student = require('./student.js')

var router = express.Router()

router.get('/index',function(req,res){
	Student.find(function(err,data){
		if(err) return res.status(500).send('Server Error')
		res.render('./index.html',{students:data.students})
	})
})

router.get('/add',function(req,res){
	res.render('./add.html')
})

router.post('/addStudent',function(req,res){
	Student.save(req.body,function(err,data){
		if(err) return res.status(500).send('Server Error')
		res.redirect('/index')
	})
})

router.get('/edit',function(req,res){
	Student.findById(req.query.id,function(err,data){
		if(err) return res.status(500).send('Server Error')
		res.render('./edit.html',{student:data})
	})
})

router.post('/editStudent',function(req,res){
	Student.updateById(req.body,function(err,data){
		if(err) return res.status(500).send('Server Error')
		res.redirect('/index')
	})
})

router.get('/delete',function(req,res){
	Student.deleteById(req.query.id,function(err,data){
		if(err) return res.status(500).send('Server Error')
		res.redirect('/index')
	})
})


module.exports = router
