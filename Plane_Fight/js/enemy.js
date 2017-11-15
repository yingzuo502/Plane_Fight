
//创建敌方飞机，使用构造函数，需要创建 多个
class Enemy extends Base{//如果是同一种对象的不同类型，可以学会选择传入一个参数
	
	//属性
	constructor(type){
		super();
		this.ele = document.createElement("div");
		this.speed = 10;//飞机下落速度
		this.hp = 1;//血量
		this.dieImgs = [];//不同敌人飞机爆炸的图片
		this.score =10;//默认飞机分数10分
		this.type  =type;//为了使用参数type
	}
	
	
	
	//初始化
	init (){
		gameEngnie.ele.appendChild(this.ele);
		gameEngnie.allEnemys.push(this);
		
		switch(this.type){
			case this.Type_Largr:
				this.ele.className = "enemy_largr";
				this.speed = this.Speed_Largr;
				this.hp = this.Hp_Largr;
				
				this.dieImgs = ["images2/plane3_die1.png","images2/plane3_die2.png","images2/plane3_die3.png","images2/plane3_die4.png","images2/plane3_die5.png","images2/plane3_die6.png"];
				
				this.score =this.Score_Largr;
				break;
				
			case this.Type_Middle:
				this.ele.className = "enemy_middle";
				
				this.speed = this.Speed_Middle;
				this.hp = this.Hp_Middle;
				
				this.dieImgs = ["images2/plane2_die1.png","images2/plane2_die2.png","images2/plane2_die3.png","images2/plane2_die4.png"];
				
				this.score =this.Score_Middle;
				break;	
				
			case this.Type_Small:
				this.ele.className = "enemy_small";
				this.speed = this.Speed_Small;
				this.hp = this.Hp_Small;
				
				this.dieImgs = ["images2/plane1_die1.png","images2/plane1_die2.png","images2/plane1_die3.png"]
				
				this.score =this.Score_Small;
				break;					
				
		}
		
		
		this.ele.style.left = parseInt(Math.random()*(gameEngnie.ele.offsetWidth-this.ele.offsetWidth))+"px";
		this.ele.style.top =-this.ele.offsetHeight+"px";
		return this;
	}
	
	//敌人飞机掉落速度
	move (){
		let that = this;
		this.timer = setInterval(()=>{
			if(that.ele.offsetTop > gameEngnie.ele.offsetHeight){
				clearInterval(that.timer);
				gameEngnie.ele.removeChild(that.ele);
				
				//在页面上移除敌人飞机节点的同时，将该敌人飞机allEnemys对象从中移除
				gameEngnie.allEnemys.splice(gameEngnie.allEnemys.indexOf(that),1)
//				var arr = [];
//				console.log(arr.push(that.ele));
			}
			else{
				that.ele.style.top = that.ele.offsetTop +that.speed +"px";
			}
		},30)
	}
	
	//被子弹打击后血量减少，收到伤害
	hurt (){
		this.hp--;
		
		
		if(this.hp==0){
			this.boom();//如果血量为0，则执行爆炸函数，敌机爆炸消失
			gameEngnie.allScore +=this.score//计算总分数
			var score = document.getElementsByTagName("p")[0];
			score.className="score";
			score.innerHTML ="你的战绩:"+gameEngnie.allScore;
		}
	};
	
	//爆炸
	boom (){
		clearInterval(this.timer);
		
		//动画
		let that = this;
		let i = 0;
		let dieTimer =setInterval(()=>{
			if(i>=that.dieImgs.length){
				clearInterval(dieTimer);
				gameEngnie.ele.removeChild(that.ele);//移除当前被子弹打中的飞机
				gameEngnie.allEnemys.splice(gameEngnie.allEnemys.indexOf(that),1)
				
			}
			
			else{

				that.ele.style.background = `url(${that.dieImgs[i++]}) no-repeat`;
			}
		},200)
	
	};

	//

}










//原型创建不同type的飞机
		Enemy.prototype.Type_Largr = 1;//大飞机
		Enemy.prototype.Type_Middle = 2;//中飞机
		Enemy.prototype.Type_Small = 3;//小飞机 
		
		Enemy.prototype.Speed_Largr = 1;//大飞机速度
		Enemy.prototype.Speed_Middle = 5;//中飞机速度
		Enemy.prototype.Speed_Small = 7;//小飞机速度

		Enemy.prototype.Hp_Largr = 8;//大飞机血量
		Enemy.prototype.Hp_Middle = 4;//中飞机血量 
		Enemy.prototype.Hp_Small = 2;//小飞机血量   
		
		Enemy.prototype.Score_Largr = 10000;//大飞机分数
		Enemy.prototype.Score_Middle = 3000;//中飞机分数 
		Enemy.prototype.Score_Small = 1000;//小飞机分数 