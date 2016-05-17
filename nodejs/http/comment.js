var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	'content':'一起期待下一期的课程',
	'cid':348
})

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'post',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=c8f741fa-9077-4106-8520-9b6bb7d7371e; imooc_isnew_ct=1447726433; IMCDNS=0; PHPSESSID=du1kj8l9dk1rstcla5qfv72sd6; jwplayer.volume=100; loginstate=1; apsid=Q2MGUwNjMyZGZjMDhhNTZlOGU4MWIyNTJmM2I1OTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzI0ODE3OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5MTM5MjIwNDFAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGM0ODFiMTZlOWJmMmRjYzdjNmFhMWFhZWNmMThhOTljcGwcV3BsHFc%3DOT; last_login_username=913922041%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1460963513,1460985776,1461328552,1461461908; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1461481092; cvde=571c238bce0e7-48; imooc_isnew=2'
		'Host':'www.imooc.com'
		'Origin':'http://www.imooc.com'
		'Referer':'http://www.imooc.com/video/8837'
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36 QQBrowser/9.0.2315.400'
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('Status:' +res.statusCode)
	console.log('headers:'+JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})

	res.on('end',function(){
		console.log('评论完毕！')
	})	
})

req.on('error',function(e){
	console.log('Error:'+e.message)
})

req.write(postData)
req.end()