
// 初始化，构造两个类(全局变量)
var gamemap = new map();
var Character = new man();
var setpN = 0;

// 页面渲染完成后开始加载游戏逻辑
window.onload = function(){

    // 初始化 读取地图 获取人物、终点位置；
	init();

	// 给table绑定单击事件
	document.getElementById('gmap').onclick = function(ev)
	{
		//window.console.log(ev.target.id);//获取到单击的是哪个td
		// 将鼠标单击的td序号转为的坐标
		var Cy = ev.target.id%gamemap.W;
		var Cx = Math.floor(ev.target.id/gamemap.W)
		// window.console.log('人物坐标：',Character.wx,Character.wy);
		// window.console.log('单击坐标：',Cx,Cy);

		//小人移动 
		CharacterMove(Cy,Cx);
		// 判断胜利
		isWin();
	}
}

function init(){
	// 初始化 读取地图 获取人物、终点位置；
	gamemap.get('gmap');
	gamemap.getEndPoints(gamemap.maparr);
	Character.wherei(gamemap.maparr);
	// 测试移动
	// var arr = Character.move('L',gamemap.maparr);	//数组默认传址
	// gamemap.display(gamemap.maparr);
}

function CharacterMove(Cy,Cx){
if (Cy==Character.wy)
	{
		// 如果单击的位置x坐标比人物的x坐标值大，则判断向右移动。否则向左移动。
		if (Cx > Character.wx){
			if (false != Character.move('D',gamemap.maparr,gamemap.EndPoints))
			{
					setpN ++;	//增加补数
					gamemap.display(gamemap.maparr);
				}	 //如果成功刷新地图
			}
			else if (Cx < Character.wx){
				if (false !=Character.move('U',gamemap.maparr,gamemap.EndPoints))
				//如果成功刷新地图增加步数
			{gamemap.display(gamemap.maparr);setpN++;}	 
		}
	}
	else if (Cx==Character.wx)
	{
		if (Cy > Character.wy){
			if (false != Character.move('R',gamemap.maparr,gamemap.EndPoints))
				{gamemap.display(gamemap.maparr);setpN++;}	 //如果成功刷新地图
		}
		else if (Cy < Character.wy){
			if (false != Character.move('L',gamemap.maparr,gamemap.EndPoints))
				{gamemap.display(gamemap.maparr);setpN++;}	 //如果成功刷新地图
		}
	}
	// window.console.log(setpN);
	// 写入步数
	document.getElementById('setpN').value = setpN;
}

// 判断是否胜利
function isWin(){
	gamemap.getBoxes(gamemap.maparr);
	// window.console.log('箱子位置：',gamemap.boxes.sort().toString());
	// window.console.log('终点位置：',gamemap.EndPoints.sort().toString());
	if(gamemap.boxes.sort().toString()==gamemap.EndPoints.sort().toString())
	{
		// 胜利开启下一关的按钮
		var name = prompt('恭喜你取得胜利！快留下你的大名，挑战下一关吧！');
		if ('' != name&& null != name) 
		{			
			// 将关卡加一传给表单隐藏域 用户名 步数传给表单隐藏域
			document.getElementsByName('PassNum')[0].value = parseInt(document.getElementById('pass').value) +1;
			document.getElementsByName('user')[0].value = name;
			document.getElementsByName('setpNum')[0].value = setpN;
			// 提交表单
			document.getElementById('f1').submit();

		}
	}
}
