"use strict";var myPlan={ele:null,firInterval:300,init:function(){return this.ele=document.createElement("div"),this.img=["images2/me_die1.png","images2/me_die2.png","images2/me_die3.png","images2/me_die4.png"],this.ele.className="myplan",gameEngnie.ele.appendChild(this.ele),this.ele.style.left=(gameEngnie.ele.offsetWidth-this.ele.offsetWidth)/2+"px",this.ele.style.top=gameEngnie.ele.offsetHeight-this.ele.offsetHeight+"px",myPlan},move:function(){this.ele.onmousedown=function(e){(e=e||event).preventDefault();var t=e.offsetX,n=e.offsetY;document.onmousemove=function(e){var i=(e=e||event).pageX-t-gameEngnie.ele.offsetLeft;i<0?i=0:i>gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth?i=gameEngnie.ele.offsetWidth-myPlan.ele.offsetWidth:myPlan.ele.style.left=i+"px";var l=e.pageY-n;l<0?l=0:myPlan.ele.style.top=l+"px",document.onmouseup=function(){document.onmousemove=document.onmouseup=null}}}},fire:function(){this.timer=setInterval(function(){(new Bullet).init().move()},this.fireInterval)},boom:function(){var e=this,t=0;this.timer=setInterval(function(){t>=e.img.length?(clearInterval(e.timer),gameEngnie.ele.removeChild(e.ele)):e.ele.style.background="url("+e.img[t++]+") no-repeat"},200)}};