var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()
life.setMaxListeners(11)

life.on('求安慰',function(who){
	console.log('给' +who+'倒水')
})

life.on('求安慰',function(who){
	console.log('给' +who+'揉肩')
})
life.on('求安慰',function(who){
	console.log('给' +who+'做饭')
})
life.on('求安慰',function(who){
	console.log('给' +who+'洗衣服')
})
life.on('求安慰',function(who){
	console.log('给' +who+'。。。')
})
life.on('求安慰',function(who){
	console.log('给' +who+'你想累死我呀')
})
life.on('求安慰',function(who){
	console.log('给' +who+'揉肩')
})
life.on('求安慰',function(who){
	console.log('给' +who+'做饭')
})
life.on('求安慰',function(who){
	console.log('给' +who+'洗衣服')
})
life.on('求安慰',function(who){
	console.log('给' +who+'。。。')
})
life.on('求安慰',function(who){
	console.log('给' +who+'你想累死我呀')
})
life.on('求溺爱',function(who){
	console.log('给' +who+'交工资')
})

var hasConforListener = life.emit('求安慰','汉子')
life.emit('求溺爱','妹子')

console.log(hasConforListener)