var fs = require('fs')

var dbPath = './db.json'

exports.find = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)
		callback(null,JSON.parse(data))
	})
} 

exports.findById = function(sid,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		var students = JSON.parse(data).students

		var ret = students.find(function(item){
			return item.id === parseInt(sid)
		})

		callback(null,ret)
	})
}

exports.save = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		var students = JSON.parse(data).students

		student.id = students[students.length-1].id + 1

		students.push(student)

		var fileData = JSON.stringify({
			students:students
		})

		fs.writeFile(dbPath,fileData,function(err){
			if(err) return callback(err)
			callback(null)
		})
	})
}


exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		var students = JSON.parse(data).students

		var sid = parseInt(student.id)

		var ret = students.find(function(item){
			return item.id === sid
		})

		student.id = parseInt(student.id)

		for(var key in ret){
			ret[key] = student[key]
		}

		var fileData = JSON.stringify({
			students:students
		})

		fs.writeFile(dbPath,fileData,function(err){
			if(err) return callback(err)
			callback(null)
		})
	})
}

exports.deleteById = function(sid,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) return callback(err)

		var students = JSON.parse(data).students

		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(sid)
		}) 

		students.splice(deleteId,1)

		var fileData = JSON.stringify({
			students:students
		})

		fs.writeFile(dbPath,fileData,function(err){
			if(err) return callback(err)

			callback(null)
		})
	})
}
