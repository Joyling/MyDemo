window.onload=function(){
	var start = document.getElementById('start');
	var order = document.getElementById('order');
	var btnOrder = document.getElementById('btnOrder');

	var table = document.getElementsByTagName('table')[0];
	//初始状态
	var dir = 0;

	var total = 0;

	//初始的left和top

	var x=0,y=0;
	//初始小方块的位置坐标
	var initX=5,initY=5;
	setBlock(initX,initY);

	
	document.getElementById('current').style.transition="all,1s,ease";

	function setBlock(c,r){
		
		table.childNodes.item(1).childNodes.item(c*2+1).childNodes.item(r*2+1).innerHTML="<div id='current'></div>";
		
	}
	start.onclick=function(){
		var i=0
		var timer = setInterval(function(){
			if(i<strtoArr().length){
				command(i);
				i++;
			}else{
				clearInterval(timer);
			}
			
		},500)

	}
	function command(i){
		var arr = strtoArr();
		var divs = document.getElementById('row').getElementsByTagName('div');

			switch(arr[i]){
				case 'go':
				go();
				break;
				case 'go 3':
				go();
				go();
				go();
				break;
				case 'tun lef':
				dir=-1;
				turn(dir);
				break;
				case 'tun rig':
				dir = 1;
				turn(dir);
				
				break;
				case 'tun bac':
				dir=2;
				turn(dir);
				break;
				
				case 'mov lef':
				total = 0;
				movelef();
				break;
				case 'mov rig':
				total = 2;
				moverig();
				break;
				case 'mov rig 4':
				total = 2;
				moverig();
				moverig();
				moverig();
				moverig();
				break;
				case 'mov top':
				total = 1;
				movetop();
				break;
				case 'mov bot':
				total = 3;
				movebottom();
				break;
				case 'tra lef':
				goleft();
				break;
				case 'tra rig':
				goright();
				case 'tra top':
				gotop();
				break;
				case 'tra top 2':
				gotop();
				gotop();
				break;
				case 'tra bot':
				gobottom();
				break;
				default:
				divs[i].style.backgroundColor="red";
				

			
		}

	}
	document.getElementById('order').onkeyup=function(){
		rowChange();
	}
	document.getElementById('order').onscroll=function(){
		var top = this.scrollTop;
		document.getElementById('row').scrollTop = top;
	}

	function rowChange(){
		var rowArr = strtoArr();
		var text = "";
		for(var i=0;i<rowArr.length;i++){
			text+="<div>"+i+"</div>";
		}
		document.getElementById('row').innerHTML=text;

	}
	function strtoArr(){
				var inputCon = document.getElementById('order').value.toLowerCase();
				inputCon=inputCon.replace(/\r\n/g,"<BR>")  
				 inputCon=inputCon.replace(/\n/g,"<BR>");
				var inputArr = inputCon.split("<BR>");
				if(inputArr.reverse()[0]==''){
					inputArr.splice(0,1);
				}
				
				return inputArr.reverse();
			}


	function goleft(){
		x=x-60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		move(x,y);
	}
	function goright(){
		x=x+60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		move(x,y);
	}
	function gotop(){
		y=y-60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		move(x,y);
	}
	function gobottom(){
		y=y+60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		move(x,y);
	}
	function movelef(){
		x=x-60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		turn(dir);
		move(x,y);
	}
	function moverig(){
		x=x+60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		turn(dir);
		move(x,y);
	}
	function movetop(){
		y=y-60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		turn(dir);
		move(x,y);
	}
	function movebottom(){
		y=y+60;
		var arr=imWall(x,y);
		x=arr[0];y=arr[1];
		turn(dir);
		move(x,y);
	}


	function turn(dir){
		total = parseInt(total) + parseInt(dir);
		if(Math.abs(total)>=4){
			total = total%4;
		}

		document.getElementById('current').style.transform="rotate("+parseInt(total)*90+"deg)";
	}

	function move(x,y){
		var arr= imWall(x,y);
		current.style.left=arr[0]+"px";
		current.style.top=arr[1]+"px";
	}
	function imWall(x,y){
		if(x<-(initX-1)*60){
			x=-(initX-1)*60;
		}
		if(x>(10-initX)*60){
			x=(10-initX)*60;
		}
		if(y<-(initY-1)*60){
			y=-(initY-1)*60;
		}
		if(y>(10-initY)*60){
			y=(10-initY)*60;
		}
		if(y==-0){y=0;}
		if(x==-0){x=0;}
		var arr = [x,y]; 
		return arr;
	}

	function go(){
		
		switch (total){
			case 0:
			x=x-60;
			break;
			case -1:
			case 3:
			y=y+60;
			break;
			case -2:
			case 2:
			x=x+60;
			break;
			case -3:
			case 1:
			y=y-60;
			break;
		}
		if(x<-(initX-1)*60){
			x=-(initX-1)*60;
		}
		if(x>(10-initX)*60){
			x=(10-initX)*60;
		}
		if(y<-(initY-1)*60){
			y=-(initY-1)*60;
		}
		if(y>(10-initY)*60){
			y=(10-initY)*60;
		}
		if(y==-0){y=0;}
		if(x==-0){x=0;}

		current.style.left=x+"px";
		current.style.top=y+"px";
		
	}

}
