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



window.onload=function(){

	var go = document.getElementById('go'),savebtn = document.getElementById('save');
	var current =document.getElementById('current');
	var compare = document.getElementById('compare');
	var compareCxt = compare.getContext('2d');
	var currentCxt = current.getContext('2d');
	var library = document.getElementById('library');
	var duration =document.getElementById('duration');
	var time = duration.value;
	var im = document.getElementById('import');
	var ex = document.getElementById('export');
	var importexport = document.getElementById('importexport');
	var imbtn = document.getElementById('imbtn');
	var closebtn =document.getElementById('closebtn');
	var json =document.getElementById('json');
	var curve = document.getElementById('curve');
	var curveCxt = curve.getContext('2d');
	var redX = 0,redY=0,blueX=300,blueY=300,x0=0,y0=300,x3=300,y3=0;
	var srX=0,srY=0,sbX=60,sbY=60,sx0=0,sy0=60,sx3=60,sy3=0;
	
	var canvasWrap = getByClass('canvas-wrap')[1];
	var btnList = getByClass('del');
	var flag=0;

	var libraryData = {
		"ease":".25,.1,.25,1",
		"linear":"0,0,1,1",
		"ease-in":".42,0,1,1",
		"ease-out":"0,0,.58,1",
		"ease-in-out":".42,0,.58,1"	
	};
	document.getElementById('result').innerHTML=time+"seconds";


	closebtn.onclick=function(){

		importexport.style.display="none";
		imbtn.style.display="inline-block";



		
	}
	ex.onclick=function(e){

		importexport.style.display="block";
		imbtn.style.display="none";

		var x="";
		
		for(key in libraryData){
			x += "div\r{-webkit-transition:all 600ms cubic-bezier(";
				
				
			x+=libraryData[key];
				
			
			x+=");transition:all 600ms cubic-bezier(";
			
			x+=libraryData[key];
			
			x+=")\r";
		}
		
		json.innerHTML = x;

	}
	im.onclick=function(){
		importexport.style.display="block";
		imbtn.style.display="inline-block";


	}
	imbtn.onclick=function(){
		var overwrite = confirm('Add to current curves? Clicking “Cancel” will overwrite them with the new ones.');
		
		try {
			var newCurves = JSON.parse(json.value);

		} 
		catch(e) { 
			alert('Sorry mate, this doesn’t look like valid JSON so I can’t do much with it :('); 
			return false;
		}
		
		if(overwrite) {
			for(key in newCurves){
				libraryData[key]=newCurves[key];
			}
			renderLibrary();

		}
	}

	
	savebtn.onclick=function(){
		addlibraryData();
		renderLibrary();
	}

	duration.onmousemove=function  () {
		time=duration.value;
		document.getElementById('result').innerHTML=time+"seconds";
	}

	
	
	function promptFun()
	{
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

	function changeValues(){
		var spanlis = document.getElementById('values').getElementsByTagName('span');
		var arr=[redX/300,redY/300,blueX/300,blueY/300];
		for(var i=0;i<4;i++){
			if(arr[i]!=0&&arr[i]!=1){
				arr[i]=arr[i].toFixed(2);
			}
			spanlis[i].innerHTML = arr[i];
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
		if(promptFun()){
			var newVal = promptFun();
		libraryData[newVal[1]]=newVal[0];
		}
		
		
	}
	function deletebraryData(key){
		delete libraryData[key];
		renderLibrary();
	}

	function renderLibrary(){
		var x = "";
		var i=0;
		for(key in libraryData){
		if(i==0){
			x+="<a href='#' class='selected'><canvas data-key="+key+"></canvas><span>"+key+"</span><button class='del' title='Remove from library'>×</button>";
		}else{
			x+="<a href='#'><canvas data-key="+key+"></canvas><span>"+key+"</span><button class='del' title='Remove from library'>×</button>";
		}
		i++;		
		}
		canvasWrap.innerHTML=x;	
		drawLibrary();	
		getNowKey();
		

	}
	function drawLibrary(){
		var arr = libraryToArr();
		console.log(arr);
		var canvasLis = canvasWrap.getElementsByTagName('canvas');
		for(var i=0;i<canvasLis.length;i++){
			canvasLis[i].style.transition="all,"+2+"s,cubic-bezier("+libraryData[canvasLis[i].dataset.key]+")";
			console.log("all,"+2+"s,cubic-bezier("+libraryData[canvasLis[i].dataset.key]+")");
			
			var cxt = canvasLis[i].getContext('2d');
			
			drawBezier(cxt,0,0,parseInt(arr[i][0]*100),parseInt(arr[i][1]*100),parseInt(arr[i][2]*100),parseInt(arr[i][3]*100),parseInt(arr[i][2]*100),parseInt(arr[i][3]*100),'white');
			
			//canvasLis[i].style.transition="all,10s,cubic-bezier("+arr[i][0]+","+arr[i][1]+","+arr[i][2]+","+arr[i][3]+"),10s;"
			//console.log("all,10s,cubic-bezier("+arr[i][0]+","+arr[i][1]+","+arr[i][2]+","+arr[i][3]+"),10s;");
		}
		
	}

	function libraryToArr(){
		var arr = [];
		var i=0;
		for(key in libraryData){
			
			arr[i]=libraryData[key].split(",");
			i++;
			//canvasLis[item].drawBezier(cxt,0,0,1,1);
			//drawBezier(cxt2,60,0,60,0,0,60,0,60,'white');
		}
		return arr;
	}



	//开始滚动
	go.onclick=function(){
		current.style.transition="all,"+time+"s,cubic-bezier("+(srX/60).toFixed(2)+","+(srY/60).toFixed(2)+","+(sbX/60).toFixed(2)+","+parseInt(sbY/60).toFixed(2)+")";
		compare.style.transition="all,"+time+"s,cubic-bezier("+libraryData[getNowKey()]+")";

		if(flag==0){
			current.style.transform="translateX(240px)";
			compare.style.transform="translateX(240px)";
			flag=1;
		}else if(flag==1){
			current.style.transform="translateX(0px)"
			compare.style.transform="translateX(0px)"
			flag=0;
		}
		
	}


	//绘制curve的底色
	function initCurve(){
		current.width=60;
		current.height=60;
		compare.width=60;
		compare.height=60;
		var cxt1 = current.getContext('2d');
		var cxt2 = compare.getContext('2d');

		drawBezier(cxt2,60,0,60,0,0,60,0,60,'white');

		//var canvasLis = canvasWrap.getElementsByTagName('canvas');
		//for(var i=0;i<canvasLis.length;i++){
		//	canvasLis[i].width=100;
		//	canvasLis[i].height=100;

		//}

		
		curve.width = 300;
		curve.height = 600;
		
	 	
		curveCxt.translate(0,200);
		drawGround();
		curveCxt.beginPath();
		curveCxt.moveTo(0,0);
		curveCxt.lineTo(0,300);
		curveCxt.lineTo(300,300);
		strokeStyle="black";
		curveCxt.stroke();


		curveCxt.beginPath();
		curveCxt.strokeStyle="#D9D9D9";
		curveCxt.lineWidth=10;
		curveCxt.moveTo(0,300);
		curveCxt.lineTo(300,0);
		
		
		curveCxt.stroke();

		curveCxt.beginPath();
		curveCxt.fillStyle='black';	
		drawBezier(curveCxt,x0,y0,redX,redY,blueX,blueY,x3,y3,'black');
		//currentCxt.clearRect(0,0,currentCxt.canvas.width,currentCxt.canvas.height);
		drawBezier(currentCxt,sx0,sy0,srX,srY,sbX,sbY,sx3,sy3,'white');


		var oTitle1 = document.getElementById('btn1');
		var oTitle2 = document.getElementById('btn2');
		//拖曳
		
		oTitle1.onmousedown = funDown;
		oTitle2.onmousedown = funDown;
	}

	function drawGround(){
		var flag1=0;
		var colors = ['#fff','#F0F0F0'];
		
		
		//curveCxt.translate(0,200);
		

		for(i=0;i<15;i++){
			curveCxt.beginPath();
			if(flag1==0){
				curveCxt.fillStyle=colors[flag1];
				flag1=1;
			}else{
				curveCxt.fillStyle=colors[flag1];
				flag1=0;
			}
			
			curveCxt.fillRect(0,i*20,300,20);
			
			curveCxt.closePath();

		}

	}


function createBackgroundCanvas () {
		var flag1=0;
		var colors = ['#fff','#F0F0F0'];
		var backCanvas = document.createElement('canvas');
		backCanvas.width = 300;
		backCanvas.height = 300;
		var backCanvasContext = backCanvas.getContext('2d');
		for(i=0;i<15;i++){
			backCanvasContext.beginPath();
			if(flag1==0){
				backCanvasContext.fillStyle=colors[flag1];
				flag1=1;
			}else{
				backCanvasContext.fillStyle=colors[flag1];
				flag1=0;
			}
			
			backCanvasContext.fillRect(0,i*20,300,20);
			
			backCanvasContext.closePath();

		}
		return backCanvas;
		// body...
	}


	//绘制贝塞尔曲线
	function drawBezier (cxt,x0,y0,x1,y1,x2,y2,x3,y3,color) {
		cxt.beginPath();
		cxt.lineWidth=2;
		cxt.moveTo(x0,y0);
		cxt.lineTo(x1,y1);
		cxt.moveTo(x0,y0);
		cxt.bezierCurveTo(x1,y1,x2,y2,x3,y3);
		cxt.lineTo(x2,y2);

		cxt.strokeStyle=color;
		cxt.stroke();

	}




	//canvas鼠标移入移出事件
	canvasWrap.onmouseover=function(e){
		
		e=e||window.event;
		var target = e.target||e.srcElement;
		// var btnList = getByClass('del');

		if(target.nodeName.toLowerCase()  == "canvas"){
			//var i = parseInt(target.dataset.count);
			
			//btnList[i].style.display="block";
			target.parentNode.lastElementChild.style.display='block';

		}

	}


	canvasWrap.onmouseout=function(e){
		
		e=e||window.event;
		var target = e.target||e.srcElement;
		

		if(target.nodeName.toLowerCase()  == "a"){
			//var i = parseInt(target.dataset.count);
			
			//btnList[i].style.display="none";

			target.lastElementChild.style.display='none';

		}

	}


	function getNowKey(){
		var alis = canvasWrap.getElementsByTagName('a');
		for(var i=0;i<alis.length;i++){
			if(hasClass(alis[i],'selected')){
				return(alis[i].firstElementChild.dataset.key);
				// return alis[i].firstElementChild.dataset.key;
			}
			
		}
	}



	//给x按钮添加点击事件
	canvasWrap.onclick=function(e){
		e=e||window.event;
		var target = e.target||e.srcElement;

		if(target.nodeName.toLowerCase()=="button"){
			if (confirm("您确认要删除该条信息吗？")){

				deletebraryData(target.parentNode.firstElementChild.dataset.key);
			    target.parentNode.remove();

				} 
				else{
					target.style.display="none";
				}
		}
		//给library每一个方块添加点击事件
	
	
		
		if(target.nodeName.toLowerCase()=="canvas"){
			var alis = canvasWrap.getElementsByTagName('a');
			for(var i=0;i<alis.length;i++){
				removeClass(alis[i],'selected');
			}
			addClass(target.parentNode,'selected');
			getNowKey();

			
		 	
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
				//移动
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
			//winW = document.documentElement.clientWidth||document.body.clientWidth,
			//winH = document.documentElement.clientHeight||document.body.clientHeight,
			//maxW = winW - oDrag.offsetWidth-5,
			//maxH=winH -oDrag.offsetHeight;
			if(l<-10){
				l=-10;
			}else if(l>290){
				l=290;
			}
			if(t<190){
				t=190;
			}else if(t>490){
				t=490;
			}
			oDrag.style.left = l+'px';
			oDrag.style.top = t+'px';

			if (target.id=="btn1") {
				redX = l+10;
				redY = t-190;
			}else if(target.id=="btn2"){
				blueX = l+10;
				blueY = t-190;
			}

			changeValues();
			curveCxt.clearRect(0,0,curveCxt.canvas.width,curveCxt.canvas.height);
			drawGround();
			drawBezier(curveCxt,x0,y0,redX,redY,blueX,blueY,x3,y3,'black');
			srX=redX/5,srY=redY/5,sbX=blueX/5,sbY=blueY/5,sx0=0,sy0=60,sx3=60,sy3=0;
			currentCxt.clearRect(0,0,currentCxt.canvas.width,currentCxt.canvas.height);
			drawBezier(currentCxt,sx0,sy0,srX,srY,sbX,sbY,sx3,sy3,'white');


		}
		
		

	}


	function init(){
		initCurve();
		renderLibrary();
	}
	init();
	

}





