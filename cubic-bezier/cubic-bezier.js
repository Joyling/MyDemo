// 背景类
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
		
	}
}
// END背景类


// 主函数入口
function Main(){
	this.init = function(){

		this.bgCanvas = document.getElementById("bg");

		this.bgCanvas.width=300;
		this.bgCanvas.height=300;

		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext("2d");
			Background.prototype.context = this.bgContext;

			return true;
		}else{
			return false;
		}
	}
	this.star = function(){
		var ba = new Background();
		ba.draw();
	}

}
// END主函数入口



var main = new Main();
if(main.init()){
	main.star();
}


