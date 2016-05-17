var stream = require('stream');
var util = require('util');

function ReadStream(){
	stream.Readable.call(this);
}

util.inherits(ReadStream,stream.Readable);

ReadStream.prototype._read = function(){
	readStream.push('I ');
	readStream.push('Love ');
	readStream.push('Imooc\n');
	readStream.push(null);
}

function WriteStream(){
	stream.Writable.call(this);
	this._cached = new Buffer('');
}

util.inherits(WriteStream,stream.Writable);

WriteStream.prototype._write = function(chunk,enconde,cb){
		console.log(chunk.toString());
		cb();
	}

function TransformStream(){
	stream.Transform.call(this);
}

util.inherits(TransformStream,stream.Transform);

TransformStream.prototype._transform = function(chunk,enconde,cb){
	this.push(chunk);
	cb();
}

TransformStream.prototype._flush = function(cb){
	this.push('oh yeah');
	cb();
}

var rs = new ReadStream();
var ws = new WriteStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);