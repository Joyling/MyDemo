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
//IE10之前不支持getElementsByClassName，必须参数写在前面，parent不一定需要

window.onload=drag;

	function drag(){
		var oTitle = getByClass('login_logo_webqq','loginPanel')[0];
		//拖曳
		oTitle.onmousedown = funDown;
		//onmousedown只要鼠标按下就会触发
		//关闭
		var oClose = document.getElementById('ui_boxyClose');
		oClose.onclick = function(){
			document.getElementById('loginPanel').style.display = 'none';

		}

		//切换状态
		var loginState = document.getElementById('loginState'),
		 stateList = document.getElementById('loginStateShow'),
		 lis = stateList.getElementsByTagName('li'),
		 stateTxt = document.getElementById('login2qq_state_txt'),
		 loginStateShow=document.getElementById('loginStateShow');

		 loginState.onclick=function(){
		 	stateList.style.display="block";
		 }

		 //鼠标滑过、离开和点击状态列表时

		 for(var i= 0,l=lis.length;i<l;i++){
		 	lis[i].onmouseover = function(){
		 		this.style.background = '#567';
		 	}
		 	lis[i].onmouseout =function(){
		 		this.style.background = '#FFF';
		 	}
		 	lis[i].onclick = function(e){
		 		e =e||window.event;
		 		if(e.stopPropagation){
		 			e.stopPropagation();
		 		}else{
		 			e.cancleBubble=true;
		 		}
		 		var id = this.id;
		 		stateList.style.display="none";
		 		stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
		 		loginStateShow.className = "";
		 		loginStateShow.className='loginStateShow'+''+id;
		 	}
		 }
	}

	function funDown(event){
		

			event = event || window.event;
			var oDrag = document.getElementById('loginPanel'),
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


	function fnMove(e,posX,posY){
		var oDrag = document.getElementById('loginPanel')
		l = e.clientX-posX,
		t = e.clientY-posY,
		winW = document.documentElement.clientWidth||document.body.clientWidth,
		winH = document.documentElement.clientHeight||document.body.clientHeight,
		maxW = winW - oDrag.offsetWidth-10,
		maxH=winH -oDrag.offsetHeight;
		if(l<0){
			l=0;
		}else if(l>maxW){
			l=maxW;
		}
		if(t<0){
			t=10;
		}else if(t>maxH){
			t=maxH;
		}
		oDrag.style.left = l+'px';
		oDrag.style.top = t+'px';


	}
	//document整个页面
	//mousemove当鼠标指针在元素内部移动时重复的触发
	