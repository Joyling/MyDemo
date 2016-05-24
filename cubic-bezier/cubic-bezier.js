function getByClass(clsName,parent){
	var oParent = parent?document.getElementById(parent):document,
	eles=[],
	elements=oParent.getElementsByTagName('*');

	for(var i=0,l=elements.length;i<l;i++){
		if (elements[i].className == clsName) {
			eles.push(elements[i]);
		}
	}
	return eles;
}

function hasClass(element,cName){        //检查class是否存在
    return !!element.className.match(new RegExp('(\\s|^)'+cName+'(\\s|$)'));
}

function addClass(element,cName){        //添加一个class
    if(!hasClass(element,cName)){
        element.className +=' '+cName;
    }
}
function removeClass(element,cName){        //移除一个class
    if(hasClass(element,cName)){
        element.className = element.className.replace(new RegExp('(\\s|^)'+cName+'(\\s|$)'),' ');
    }
}


function Bessel(){
	this.init = function(canvas,width,height,x0,y0,x1,y1,c1,c2,lw1,lw2){
		this.context = canvas.getContext("2d");
		canvas.width=width;
		canvas.height=height;
		this.position ={w:width,h:height,beginx:0,beginy:0,x0:x0,y0:y0,x1:x1,y1:y1,endx:width,endy:height,color1:c1,color2:c2,lineWidth1:lw1,lineWidth2:lw2};
		
		
		
	}
	this.draw = function(){
		
		this.context.clearRect(0,0,this.position.w,this.position.h);
		
		this.context.beginPath();
		this.context.lineWidth=this.position.lineWidth2;
		this.context.moveTo(this.position.beginx,this.position.beginy);
		this.context.lineTo(this.position.x0,this.position.y0);
		this.context.strokeStyle=this.position.color2;
		this.context.stroke();
		this.context.closePath();

		this.context.lineWidth = this.position.lineWidth1;
		this.context.bezierCurveTo(this.position.x0,this.position.y0,this.position.x1,this.position.y1,this.position.endx,this.position.endy);
		this.context.strokeStyle=this.position.color1;
		this.context.stroke();
		
		this.context.moveTo(this.position.endx,this.position.endy);
		this.context.lineTo(this.position.x1,this.position.y1);
		this.context.strokeStyle=this.position.color2;
		this.context.stroke();
	}
}

// 背景绘制
function Background(){
	this.draw = function(){
		var flag=0;
		var colors = ['#F0F0F0','#fff'];

		for(i=0;i<15;i++){
			
			this.context.beginPath();
			if(flag==0){
				this.context.fillStyle=colors[flag];
				flag=1;
			}else{
				this.context.fillStyle=colors[flag];
				flag=0;
			}
			
			this.context.fillRect(0,i*20,300,20);
			
			this.context.closePath();

		}
		this.context.beginPath();
		this.context.lineWidth=10;
		this.context.moveTo(0,300);
		this.context.lineTo(300,0);
		this.context.strokeStyle="#D9D9D9";
		this.context.stroke();
		
	}
}
Background.prototype = new Bessel();
// END背景绘制

//贝塞尔曲线绘制
function Operate(){
	
}
Operate.prototype = new Bessel();
//END贝塞尔曲线绘制

function Current(){
	this.parms = {x0:0,y0:0,x1:1,y1:1};
}
Current.prototype = new Bessel();

function Compare () {
	this.parms = {x0:.25,y0:.1,x1:.25,y1:1};
}
Compare.prototype = new Bessel();

function Library(){

	var libraryData = {
		"ease":".25,.1,.25,1",
		"linear":"0,0,1,1",
		"ease-in":".42,0,1,1",
		"ease-out":"0,0,.58,1",
		"ease-in-out":".42,0,.58,1"	
	}

	this.init = function(){
		
		render();
	}


	function render(){

		var x="";
		var i=0;

		for(key in libraryData){

			if(i==0){
				x+="<a href='#' class='selected'><canvas data-key="+key+"></canvas><span>"+key+"</span><button class='del' title='Remove from library'>×</button>";
			}else{
				x+="<a href='#'><canvas data-key="+key+"></canvas><span>"+key+"</span><button class='del' title='Remove from library'>×</button>";
			}
				i++;		
		}


		document.getElementById("canvas-wrap").innerHTML = x;


		var canvas = document.getElementById("canvas-wrap").getElementsByTagName("canvas");

		
		var arr = [],i=0;

		for(key in libraryData){
			arr[i]=new Bessel();
			var libraryArr = libraryData[key].split(",");
	
			arr[i].init(canvas[i],100,100,100*libraryArr[0],100*libraryArr[1],100*libraryArr[2],100*libraryArr[3],"#fff","#fff",1,1)
			
			arr[i++].draw();
		}


		document.getElementById("canvas-wrap").onmouseover=function(e){
			
			e=e||window.event;
			var target = e.target||e.srcElement;

			if(target.nodeName.toLowerCase()  == "canvas"){
				
				target.parentNode.lastElementChild.style.display='block';

			}

		}


		document.getElementById("canvas-wrap").onmouseout=function(e){
			
			e=e||window.event;
			var target = e.target||e.srcElement;
			

			if(target.nodeName.toLowerCase()  == "a"){

				target.lastElementChild.style.display='none';

			}

		}
	}


	//删除方块按钮添加点击事件
	document.getElementById("canvas-wrap").addEventListener("click",del);

	function del(e){
		e=e||window.event;
		var target = e.target||e.srcElement;

		if(target.nodeName.toLowerCase()=="button"){
			if (confirm("您确认要删除该条信息吗？")){
				var key = target.parentNode.firstElementChild.dataset.key;
				
				delete libraryData[key];
				
			    render();
			


				} 
				else{
					target.style.display="none";
				}
		}

		//给library每一个方块添加点击事件
		
			
			if(target.nodeName.toLowerCase()=="canvas"){
				var alis = document.getElementById("canvas-wrap").getElementsByTagName('a');
				for(var i=0;i<alis.length;i++){
					removeClass(alis[i],'selected');
				}
				addClass(target.parentNode,'selected'); 
				var key = getNowKey(),libraryArr = libraryData[key].split(",");
				main.compare.init(main.compareCanvas,60,60,60*libraryArr[0],60*libraryArr[1],60*libraryArr[2],60*libraryArr[3],"#fff","#fff");
				main.compare.parms=libraryArr;
				
				main.compare.draw();	
			 }
		
		

		 function getNowKey(){
		 	var alis = document.getElementById("canvas-wrap").getElementsByTagName('a');
		 	for(var i=0;i<alis.length;i++){
		 		if(hasClass(alis[i],'selected')){
		 			return(alis[i].firstElementChild.dataset.key);
		 		}
		 		
		 	}
		 }
		
	}


	//SAVE按钮
	document.getElementById("save").onclick=function(){
		addlibraryData();
		render();
	}

	function promptFun(){
		var arr=[];
		var x = getValues();
		var name=prompt("if you want,you can give it a short name",x);
		if (name!=null && name!="")
		{
			arr.push(x);
		   	arr.push(name);
		   	return arr;
		}else{
			return false;
		}
		
	}
	function getValues(){
		var returnVal="";
		var str="";
		var spanlis = document.getElementById('values').getElementsByTagName('span');
		for(var i=0;i<spanlis.length-1;i++){
			str = spanlis[i].innerHTML+",";
			returnVal+=str;
		}
		returnVal+=spanlis[spanlis.length-1].innerHTML;
		return returnVal;
	}

	function addlibraryData(){
		var temp = promptFun();
		if(temp){
			var newVal = temp;
		libraryData[newVal[1]]=newVal[0];
		}
		
	}
	//EXPORT功能
	document.getElementById("export").onclick = function(e){
		e.stopPropagation();
		document.getElementById("exPanel").style.display="block";
		document.getElementById("exJson").innerHTML = JSON.stringify(libraryData);;
	}
	//CLOSE按钮
	document.getElementById("ExCbtn").onclick = function(){
		document.getElementById("exPanel").style.display="none";
		
	}
	//IMIPORT功能
	document.getElementById("import").onclick = function(e){
		e.stopPropagation();
		document.getElementById("imPanel").style.display="block";
		document.getElementById("imJson").innerHTML = "";
	}
	//CLOSE按钮
	document.getElementById("ImCbtn").onclick = function(){
		document.getElementById("imPanel").style.display="none";
		
	}
	document.getElementById("imbtn").onclick=function(){
		var overwrite = confirm('Add to current curves? Clicking “Cancel” will overwrite them with the new ones.');
		
		try {
			var newCurves = JSON.parse(document.getElementById("imJson").value);
			

		} 
		catch(e) { 

			alert('Sorry mate, this doesn’t look like valid JSON so I can’t do much with it :('); 

			return false;
		}
		
		if(overwrite) {
			for(key in newCurves){
				libraryData[key]=newCurves[key];
			}
			render();

		}
	}


}

function animate(flag,obj1,obj2,time,parm1,parm2){
	if(flag){
		obj1.style.transform="translateX(400px)";
		obj2.style.transform="translateX(400px)";
		
	}else if(!flag){
		obj1.style.transform="translateX(0px)";
		obj2.style.transform="translateX(0px)";
		
	}

	obj1.style.transition="all,cubic-bezier("+parm1+")"+time+"s";
	obj2.style.transition="all,cubic-bezier("+parm2+")"+time+"s";
}

function objtoArr(obj){
	var arr=[];
	for(key in obj){
		arr.push(obj[key]);
	}
	return arr;
}

function  setCubic (p) {
	document.getElementById("P0x").innerHTML=p[0].toFixed(2);
	document.getElementById("P0y").innerHTML=p[1].toFixed(2);
	document.getElementById("P1x").innerHTML=p[2].toFixed(2);
	document.getElementById("P1y").innerHTML=p[3].toFixed(2);
}


// 主函数入口
function Main(){
	this.init = function(){

		this.bgCanvas = document.getElementById("bg");
		this.operateCanvas = document.getElementById("operate");
		this.compareCanvas = document.getElementById("compare");
		this.currentCanvas = document.getElementById("current");
		this.go = document.getElementById("go");
		

		if (this.bgCanvas.getContext) {
			return true;
		}else{
			return false;
		}
	}

	this.star = function(){
		this.bg = new Background();
		this.bg.init(this.bgCanvas,300,300);
		this.bg.draw();
		
		this.operate = new Operate();
		this.operate.init(this.operateCanvas,300,300,0,0,300,300,"#000000","#797979",4,2);

		
		this.operate.draw();

		this.cur = new Current();
		this.cur.init(this.currentCanvas,60,60,0,0,60,60,"#fff","#fff",2,1);
		this.cur.draw();


		this.compare = new Compare();
		this.compare.init(this.compareCanvas,60,60,15,6,15,60,"#fff","#fff",2,1);
		this.compare.draw();

		this.library = new Library();
		this.library.init();


		document.getElementById("duration").onmousemove=function  () {
			
			document.getElementById('result').innerHTML=document.getElementById("duration").value+"seconds";
		}
		var flag = false;

		this.go.onclick= function(){
			flag=!flag;
			var t=document.getElementById("duration").value;

			animate(flag,main.currentCanvas,main.compareCanvas,t,objtoArr(main.cur.parms).join(","),objtoArr(main.compare.parms).join(","));
			
		
			
		}
		
	
	}

}
// END主函数入口

var main = new Main();
if(main.init()){
	main.star();
}



document.onmousedown = function(e) {
   event = event || window.event;
	var target = event.target||event.srcElement;
	if(target.id=="btn1"||target.id=="btn2"){
		funDown(event);
	}
}

function funDown(event){
		
	event = event || window.event;
	var target = event.target||event.srcElement;
	if(target.id=="btn1"||target.id=="btn2"){
		var oDrag = document.getElementById(target.id),
		//光标按下时，光标和面板之间的距离
		disX = event.clientX - oDrag.offsetLeft,
		disY = event.clientY - oDrag.offsetTop;
		document.onmousemove = function(event){
			event = event||window.event;
			fnMove(event,disX,disY);
		}
		//释放鼠标
		document.onmouseup = function(){

			document.onmousemove = null;
			document.onmouseup = null;
	
		}
	}
			
}
function fnMove(e,posX,posY){
	var target=e.target||e.srcElement;
	var oDrag = target;
	if(oDrag.id=="btn1"||oDrag.id=="btn2"){
		l = e.clientX-posX,
		t = e.clientY-posY;

		oDrag.style.left = l+'px';
		oDrag.style.top = t+'px';

		if(oDrag.id=="btn1"){
			main.operate.position.x0=l+10;
			main.operate.position.y0=t+10;

			main.cur.position.x0=(main.operate.position.x0)/5;
			main.cur.position.y0=(main.operate.position.y0)/5;

			main.cur.parms.x0 = (main.cur.position.x0)/60;
			main.cur.parms.y0 = (main.cur.position.y0)/60;

			setCubic(objtoArr(main.cur.parms));

			main.operate.draw();
			main.cur.draw();
		}else if(oDrag.id=="btn2"){
			main.operate.position.x1=l+10;
			main.operate.position.y1=t+10;

			main.cur.position.x1=(main.operate.position.x1)/5;
			main.cur.position.y1=(main.operate.position.y1)/5;

			main.cur.parms.x1 = (main.cur.position.x1)/60;
			main.cur.parms.y1 = (main.cur.position.y1)/60;
			setCubic(objtoArr(main.cur.parms));
			main.operate.draw();
			main.cur.draw();
		}
	}
	
}
