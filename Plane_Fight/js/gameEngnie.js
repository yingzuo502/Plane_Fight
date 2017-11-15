
//游戏引擎看成一个对象
let gameEngnie = {
	//属性
	
		ele : null,
		
		allBullets:[],//保存页面上的所有子弹
		allEnemys:[],//保存页面上的所有敌人飞机
		allScore:0,//总分
	
	//获取加载界面节点，页面初始化
	init(){
		gameEngnie.ele = document.getElementById("main");
		return this;//gameEngnie
	},
	
	//开始游戏
	startgame(){
		console.log('开始游戏')
		this.loadding(()=>{
			//我的飞机移动调用
			myPlan.init().move();
			//加载子弹
			myPlan.fire()
			//我的飞机键盘调用
			gameEngnie.listenonkey();
			
			//创建调用敌人飞机
			gameEngnie.createenemy();
		
			//创建碰击监测
			gameEngnie.crash();
		})
	},
		
	//加载界面
	loadding (callback){
		let logo = document.createElement("div");
		logo.className ="logo";
		gameEngnie.ele.appendChild(logo); 
		
		let lode = document.createElement("div");
		lode.className ="lode";
		gameEngnie.ele.appendChild(lode); 
		
		let img = ["images2/loading1.png","images2/loading2.png","images2/loading3.png"]
		let i =0;		
		let timer = setInterval(()=>{
			if(i>=5){
				clearInterval(timer);
				gameEngnie.ele.removeChild(logo);
				gameEngnie.ele.removeChild(lode);
				callback();
			}
			else{

				lode.style.background = `url(${img[++i%3]}) no-repeat`
				}
		},500)
		
	},
	
	//监听键盘事件
	listenonkey(){
		let spendx = 0;
		let spendy = 0;
		onkeydown = function(e){
			e = e ||event;
			if(e.keyCode ==37){
				spendx = -10				
			}
			
			else if(e.keyCode ==38){
				spendy = -10				
			}
			
			else if(e.keyCode ==39){
				spendx = 10				
			}
			
			else if(e.keyCode ==40){
				spendy = 10				
			}
		}
		
		document.onkeyup = function(e){
			e = e || event;
			if(e.keyCode ==37 ||e.keyCode ==39){
				spendx = 0;
			}
			if(e.keyCode ==38 ||e.keyCode ==40){
				spendy = 0;
			}
		}
		
		setInterval(()=>{
			let x = myPlan.ele.offsetLeft +spendx ;
			if(x<0){
				x =0;
			}
			else if(x > gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth){
				x =gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth;
			}
			myPlan.ele.style.left = x+"px";
		
			let y = myPlan.ele.offsetTop +spendy
			if(y<0){
				y = 0;
			}
			
			myPlan.ele.style.top =  y +"px";
		},30)
		
	 },
	
	
	//创建敌人飞机
	createenemy(){
		//创建大飞机
		this.createbig =setInterval(()=>{
			let a = Math.random()>0.7 ? true:false;
			if(a){
			let enemy = new Enemy(1);	
			enemy.init().move();
			}
		},6000)
		
		//创建中飞机
		this.createmiddle =setInterval(()=>{
			let a = Math.random()>0.5 ? true:false;
			if(a){
			let enemy = new Enemy(2);	
			enemy.init().move();
			}
		},2000)
		
		this.createsmall =setInterval(()=>{
			let a = Math.random()>0.3 ? true:false;
			if(a){
			let enemy = new Enemy(3);	
			enemy.init().move();
			}
		},600)
	},

   //碰撞监测
   crash(){
   			let timer = setInterval(()=>{
   				for(let i = 0;i<gameEngnie.allEnemys.length;i++){//遍历所有敌机
   					for(let j =0;j<gameEngnie.allBullets.length;j++){//遍历所有子弹
   						
   						if(isCrash(gameEngnie.allEnemys[i].ele,gameEngnie.allBullets[j].ele)){
   							//碰撞让子弹爆炸，消失
   							gameEngnie.allBullets[j].boom();//gameEngnie.allBullets[j]是代表一个子弹this对象，相当于Bullets.boom()
   							gameEngnie.allBullets.splice(j,1);
   							
   							//碰撞后敌机收到伤害，hp减少
   							gameEngnie.allEnemys[i].hurt()
   							
   					}
   				}
   					//判断每个敌机和我的飞机是否有碰撞
				if ( isCrash(gameEngnie.allEnemys[i].ele, myPlan.ele) ){
					
					
					clearInterval(timer);
					for(let i=0;i<gameEngnie.allEnemys.length;i++){
						clearInterval(gameEngnie.allEnemys[i].timer)//敌人飞机停止移动
					}
					
					//子弹停止创建
					clearInterval(myPlan.timer);
					
					for(let j=0;j<gameEngnie.allBullets.length;j++){
						clearInterval(gameEngnie.allBullets[j].timer)//子弹停止移动
					}
					//敌人飞机停止创建
					clearInterval(gameEngnie.createbig);
					clearInterval(gameEngnie.createmiddle);
					clearInterval(gameEngnie.createsmall);
					myPlan.boom()
					
					
					let name=prompt("留下好汉的大名：")
					if(name){
						
						ajax({
							type:"post",
							url:"http://60.205.181.47/myPHPCode4/uploadScore.php",
							data:{name:name,score:gameEngnie.allScore},
							success: function(data){
							     console.log(data)
							     location.href = "zhanji.html";
							},
							fail: function(data){
								console.log("请求失败！");
							}
						})
						
						//获取分数
						}
					
					
					
					console.log("Game Over!")
					
					break;
				}
   			}	
   			},20)
   }
   
   //
}