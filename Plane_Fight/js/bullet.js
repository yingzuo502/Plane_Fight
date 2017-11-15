
//构造函数，可创建多个子弹对象
class Bullet extends Base{
	//属性
	constructor(){
		super();
		this.ele = document.createElement("div");
	}
	
	
	//初始化
	init(){
		gameEngnie.ele.appendChild(this.ele);
		
		//当页面添加一个子弹时，将当前的子弹对象this保存到数组当中
		gameEngnie.allBullets.push(this)
		
		this.ele.className = "bullet";
		
		this.ele.style.left =myPlan.ele.offsetLeft + myPlan.ele.offsetWidth/2 +this.ele.offsetWidth/2-5+"px";
		this.ele.style.top = myPlan.ele.offsetTop-this.ele.offsetHeight+"px";
		return this;
	};
	
	move(){
		let that = this;
		this.timer = setInterval(()=>{
			if(that.ele.offsetTop<-18){
				clearInterval(that.timer);
				//移除节点
				gameEngnie.ele.removeChild(that.ele);
				
				//在页面上移除子弹节点的同时，将该子弹对象从allBullets中移除
				gameEngnie.allBullets.splice(gameEngnie.allBullets.indexOf(that),1);// 数组splice删除方法，（数组下表，删除长度）
	
				   
				
//				var arr = [];
//				arr.push(that.ele)
//				console.log(arr);
				
			}
			else{that.ele.style.top = that.ele.offsetTop - 10+"px";}
		},30)
	}
	
	
	//子弹爆炸
	boom (){
		let that = this;
		clearInterval(this.timer)
		//碰到飞机后爆炸动画
		this.ele.className = "bullet-die";
	
		const img = ["images2/die1.png","images2/die2.png"];
		let i = 0;
		let dieTimer = setInterval(()=>{
			if(i >1){
				clearInterval(dieTimer);
				that.ele.remove(that.ele);//爆炸后移除爆炸节点
			}
			
			else{
				that.ele.style.background = `url(${img[i++]}) no-repeat`
			}
		
		},200)
		 
	}
}
