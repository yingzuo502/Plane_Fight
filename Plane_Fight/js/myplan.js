

let myPlan = {
	//属性
	ele :null,
	firInterval:300,//子弹发射密集程度（数值越小，越密集 ）
	
	//初始化
	init(){
		this.ele = document.createElement("div");
		this.img = ["images2/me_die1.png","images2/me_die2.png","images2/me_die3.png","images2/me_die4.png"];
		this.ele.className = "myplan";
		gameEngnie.ele.appendChild(this.ele);
		this.ele.style.left = (gameEngnie.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = gameEngnie.ele.offsetHeight-this.ele.offsetHeight + "px";
		return myPlan;
	},
	  
	 //拖拽
	 move(){
	 	this.ele.onmousedown = function(e){
	 		e = e||event;
	 		e.preventDefault();
	 		let disx = e.offsetX;
	 		let disy = e.offsetY;
	 		
	 		document.onmousemove = function(e){
	 			e = e||event;
	 			//判断我的飞机边界
	 			let x =e.pageX - disx - gameEngnie.ele.offsetLeft;
				if(x<0){
					x =0;
				}
				else if(x>(gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth)){
					x =gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth;
				}
	 			else{myPlan.ele.style.left = x +"px";}		
	 			
	 			let y = e.pageY - disy
	 			if(y<0){
	 				y = 0
	 			}
	 			else{myPlan.ele.style.top = y +"px";}
	 			//拖拽清除
	 			document.onmouseup =function(){
	 				document.onmousemove = document.onmouseup =null;
	 			}
	 		}
	 	}
	 },
	
	//发射子弹
	fire(){
		this.timer = setInterval(()=>{
			let bullet = new Bullet();
			bullet.init().move();
		},this.fireInterval)
		
	},
	
	//自己飞机碰撞后爆炸
	boom(){
		let that = this;
		let i = 0;
		
		this.timer = setInterval(()=>{
			if(i>=that.img.length){
				clearInterval(that.timer);
				gameEngnie.ele.removeChild(that.ele)
			}
			else{

				that.ele.style.background = `url(${that.img[i++]}) no-repeat`;
			}
		},200)
		
		
	}
	
	
	
	//
}
