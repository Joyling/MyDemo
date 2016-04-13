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



window.onload=function(){


	var go = document.getElementById('go');
	var current =document.getElementById('current');
	var compare = document.getElementById('compare');
	var compareCxt = compare.getContext('2d');
	var library = document.getElementById('library');
	var duration =document.getElementById('duration');
	var curve = document.getElementById('curve');
	var curveCxt = curve.getContext('2d');
	var redX = 0,redY=0,blueX=300,blueY=300,x0=0,y0=300,x3=300,y3=0;
	var srX=0,srY=0,sbX=60,sbY=60,sx0=0,sy0=60,sx3=60,sy3=0;
	
	var canvasWrap = getByClass('canvas-wrap')[1];
	var btnList = getByClass('del');
	var flag=0;

	//开始滚动
	go.onclick=function(){
		compare.style.transition="all,10s,cubic-bezier("+srX+","+srY+","+sbX+","+sbY+"),0.1s;"
		
		if(flag==0){
			current.style.transform="translateX(600px)"
			compare.style.transform="translateX(600px)"
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

		drawBezier(cxt1,50,10,50,10,10,50,10,50,'white');
		drawBezier(cxt2,50,10,50,10,10,50,10,50,'white');

		var canvasLis = canvasWrap.getElementsByTagName('canvas');
		for(var i=0;i<canvasLis.length;i++){
			canvasLis[i].width=100;
			canvasLis[i].height=100;

		}

		
		curve.width = 300;
		curve.height = 600;
		
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

		var oTitle1 = document.getElementById('btn1');
		var oTitle2 = document.getElementById('btn2');
		//拖曳
		
		oTitle1.onmousedown = funDown;
		oTitle2.onmousedown = funDown;
	}

	function drawGround(){
		var flag1=0;
		var colors = ['#fff','#F0F0F0'];
		
		
		curveCxt.translate(0,200);
		

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
		var btnList = getByClass('del');

		if(target.nodeName.toLowerCase()  == "canvas"){
			//var i = parseInt(target.dataset.count);
			
			//btnList[i].style.display="block";
			target.parentNode.lastElementChild.style.display='block';

		}

	}
	canvasWrap.onmouseout=function(e){
		
		e=e||window.event;
		var target = e.target||e.srcElement;
		

		if(target.nodeName.toLowerCase()  == "canvas"){
			//var i = parseInt(target.dataset.count);
			
			//btnList[i].style.display="none";
			target.parentNode.lastElementChild.style.display='none';

		}

	}



	//给x按钮添加点击事件
	canvasWrap.onclick=function(e){
		e=e||window.event;
		var target = e.target||e.srcElement;

		if(target.nodeName.toLowerCase()=="button"){
			if (confirm("您确认要删除该条信息吗？")){
				   target.parentNode.remove();
				} 
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
					
					curveCxt.clearRect(0,0,curveCxt.canvas.width,curveCxt.canvas.height);

					drawBezier(curveCxt,x0,y0,redX,redY,blueX,blueY,x3,y3,'black');
					srX=redX/5,srY=redY/5,sbX=blueX/5,sbY=blueY/5,sx0=0,sy0=60,sx3=60,sy3=0;
					compareCxt.clearRect(0,0,compareCxt.canvas.width,compareCxt.canvas.height);
					drawBezier(compareCxt,sx0,sy0,srX,srY,sbX,sbY,sx3,sy3,'white');

					
				
					document.onmousemove = null;
					document.onmouseup = null;
					
				}
			}

			
		}


	function fnMove(e,posX,posY){
		var target=e.target||e.srcElement;
		var oDrag = target;
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
		

	}


	function init(){
		initCurve();
	}
	init();
	

}





