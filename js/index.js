/*

 */
var oDiv=document.getElementById('div1');
var aSpan=oDiv.getElementsByTagName('span');
var oDiv1=document.getElementById('one');
var oDiv2=document.getElementById('two');
var oDiv3=document.getElementById('three');
var logo = document.getElementById('logo');
var Toplay = document.getElementById('Toplay');
var playBtn = document.getElementById('playBtn');
var score = document.getElementById('score');
var cloud = document.getElementById('cloud');
var mount1 = document.getElementById('mount1');
var mount2 = document.getElementById('mount2');
var top_wave = document.getElementById('top_wave');
var wave1 = document.getElementById('wave1');
var wave2 = document.getElementById('wave2');
var wave3 = document.getElementById('wave3');
var wave4 = document.getElementById('wave4');
var ball = document.getElementById('playBall');
var stickBox = document.getElementById('stickBox');
var aStick = stickBox.getElementsByTagName('span');
var scorecard = document.getElementById('scorecard');
var scorecardNum = document.getElementById('scorecardNum');
var btn1 = document.getElementById('btn1');//再玩一次
var btn2 = document.getElementById('btn2');//菜单
var moveNum1 = 170;
var moveNum2 = 0;
var moveNum3 = 0; //柱子移动
var arrColor = ['#ff4672','#ffd245','#8260f5'];
var ballJumpNum = 0;
var bgTimer = null;
var ballTimer = null;
var stickTimer = null;
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;

//开始菜单字体效果
var textTimer=null;
var textNum=0;
textTimer=setInterval(function(){
 	aSpan[textNum].style.opacity=1; 
    textNum++;
    if(textNum===aSpan.length){
   	   clearInterval(textTimer);
   	   textNum=0;
   	}
 },150);
// 点击柱子切换颜色
var num1 = 0;
var num2 = 1;
var num3 = 2;
function color(num,obj){
    if(num%3==1){
   	 	obj.style.backgroundColor='#ffd245';//黄
    }else if(num%3==2){
    	obj.style.backgroundColor='#8260f5';//紫
    }else if(num%3==0){
   		obj.style.backgroundColor='#ff4672';//红
    }
}
oDiv1.onclick=function(){
	num1++;
	color(num1,oDiv1);
}
oDiv2.onclick=function(){
	num2++;
	color(num2,oDiv2);
}
oDiv3.onclick=function(){
	num3++;
	color(num3,oDiv3);
}

function initGame(){
	for (var j = 0; j < aSpan.length; j++) {
		aSpan[j].style.opacity = 0;
	}
	logo.style.display = 'none';
	Toplay.style.display = 'none';
	score.style.display = 'block';
	bgMove();//背景移动
	stickBorn();//柱子生成
	//柱子点击变色
	for (var i = 0; i < aStick.length; i++) {
		aStick[i].index = i;
		aStick[i].num = 0;
		aStick[i].onclick = function(){
			color(this.num,this);
			this.num++;
		}
	}
}

//开始游戏按钮
playBtn.onclick = function(){
	initGame();
}
//再玩一次
btn1.onclick = function(){
	scorecard.style.transition = '';
	scorecard.style.transform = 'scale(0)';
	initGame();
}
//菜单
btn2.onclick = function(){
	scorecard.style.transition = '';
	scorecard.style.transform = 'scale(0)';
	logo.style.display = 'block';
	Toplay.style.display = 'flex';
	textTimer=setInterval(function(){
	 	aSpan[textNum].style.opacity= 1; 
	    textNum++;
	    if(textNum===aSpan.length){
	   	   clearInterval(textTimer);
	   	   textNum=0;
	   	}
	},150);
}
//背景移动函数
function bgMove(){
	bgTimer = setInterval(function(){
		moveNum1-=1;
		moveNum2-=1;
		cloud.style.backgroundPositionX = moveNum1 + 'px';
		top_wave.style.backgroundPositionX = moveNum2 + 'px';
		wave1.style.backgroundPositionX = moveNum2 + 'px';
		wave2.style.backgroundPositionX = moveNum2 + 'px';
		wave3.style.backgroundPositionX = moveNum2 + 'px';
		wave4.style.backgroundPositionX = moveNum2 + 'px';
		mount1.style.backgroundPositionX = moveNum2 + 'px';
		mount2.style.backgroundPositionX = moveNum2 + 'px';
	},100);
}
//生成球
function ballBorn(){
	ball.style.transition = '1s';
	ball.style.transform = 'scale(1)';
	ballPlay();
}
function ballPlay(){
	var onOff = true;
	var ballTop = 0;
	ballTimer = setInterval(function(){
		if (onOff) {
			//球下降
			ball.style.transition = '1s ease-in';
    		// ball.style.top = 4.6 + 'rem';
    		
    		ball.style.top = (screenHeight-stickBox.offsetHeight-70)/100 + 'rem';
    		onOff = false;
		}else{
			//判断游戏进程代码
    		if (getStyle(ball,'backgroundColor')==getStyle(aStick[ballJumpNum],'backgroundColor')) {
    			ballJumpNum++;
    			score.innerHTML = ballJumpNum;
    		}else{
				clearInterval(ballTimer);
				clearInterval(bgTimer);
				clearInterval(stickTimer);
				scorecard.style.transition = '1s';
				scorecard.style.transform = 'scale(1)';
				scorecardNum.innerHTML = ballJumpNum + '!';
				//初始化
				ball.style.transform = 'scale(0)';
				ball.style.backgroundColor = '#ff4672';
				ball.style.transition = '';
				ball.style.top = 0.8 + 'rem';
				stickBox.style.transition = '';
				onOff=true;
				score.innerHTML = 0;
				score.style.display = 'none';
				ballJumpNum = 0;
				moveNum1 = 170;
				moveNum2 = 0;
				moveNum3 = 0;
				stickBox.style.left = screenWidth/100 + 'rem';
				for (var i = 0; i < aStick.length; i++) {
					aStick[i].style.backgroundColor = '';
				}
				return;
    		}
    		//球上升
    		// alert(ballTop+'和'+(screenHeight-stickBox.offsetHeight-40));
			ball.style.transition = '1s ease-out';
			ball.style.top = 0.8 + 'rem';
			onOff=true;
			ball.style.backgroundColor = arrColor[getRandom(0,2)];
			
		}
	},1000);
}
//柱子的生成
function stickBorn(){
	stickBox.style.left = screenWidth/100 + 'rem';
	moveNum3 = screenWidth/100;
	stickBox.style.transition = '0.1s';
	stickTimer = setInterval(function(){
    	moveNum3-=0.1;
    	console.log(getFloatOne(moveNum3));
    	stickBox.style.left = moveNum3 + 'rem';
    	if (getFloatOne(moveNum3)==7.9) {
    		ballBorn();
    	}
	},97);
}
//生成随机数
function getRandom(start,end){
	return Math.round(Math.random()*(end-start)+start);
}
//得到样式
function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj,'old FF4.0')[attr];
}
//得到一位小数
function getFloatOne(num) {
	var str1 = num + '';//19.22->19.2 
	var re = /[\D|\d]+\.\d/;
	str1.replace(re,function(str){
		str1=str-0;
	});
	return str1;
}