/*
** 一个地图类
*/
function map()
{
    map.prototype.W = 0;	//地图宽 
	map.prototype.H = 0;	//地图高
	map.prototype.maparr = new Array();  	//地图数组
	map.prototype.EndPoints = new Array();	//终点坐标
	map.prototype.boxes = new Array();		//箱子坐标

	// 从DOM中读取地图数据【该方法只需要在游戏开始时读取一次即可】
	map.prototype.get = function(id)
	{
		var table = document.getElementById(id).getElementsByTagName('td');
		this.H = document.getElementById(id).getElementsByTagName('tr').length;
		this.W = table.length/this.H;

		for (var i = 0; i < this.H; i++)
		{
			var narr = new Array();
			for (var j = 0;j < this.W;j++)
			{
				var  bgI = table[i*this.W+j].style.backgroundImage;

				if (bgI.indexOf('Wall_Brown')>0)  		narr[j] = 2; 
				else if (bgI.indexOf('EndPoint_Red')>0) narr[j] = -3; 
				else if (bgI.indexOf('Crate_Red')>0) 	narr[j] = 3; 
				else if (bgI.indexOf('Character1')>0) 	narr[j] = 1; 
				else 									narr[j] = 0;
				
				// 因浏览器兼容性区别 谷歌 IE 360 等返回的是绝对路径 而火狐返回的是相对路径。
				/*switch(bgI)
				{
					case 'url("source/images/Wall_Brown.png")': 
					narr[j] = 2; break;
					case 'url("source/images/EndPoint_Red.png")':
					narr[j] = -3; break;
					case 'url("source/images/Crate_Red.png")':
					narr[j] = 3; break;
					case 'url("source/images/Character1.png")':
					narr[j] = 1; break;

					default: narr[j] = 0; break;
				}*/

			}
			this.maparr[i]= narr;
		}
	}

	// 将地图数据数组maparr写入DOM里。
	map.prototype.display = function(maparr)
	{
		var table = document.getElementById('gmap').getElementsByTagName('td');
		for (var i = 0; i < this.H; i++) {
			for (var j = 0; j < this.W ; j++) {
				switch(maparr[i][j])
				{
					case 1 :
					table[i*this.W+j].style.backgroundImage = 'url("./source/images/Character1.png")';
					break;

					case 2:
					table[i*this.W+j].style.backgroundImage = 'url("./source/images/Wall_Brown.png")';
					break;

					case 3:
					table[i*this.W+j].style.backgroundImage = 'url("./source/images/Crate_Red.png")';
					break;

					case -3:
					table[i*this.W+j].style.backgroundImage = 'url("./source/images/EndPoint_Red.png")';
					break;

					default: 
					table[i*this.W+j].style.backgroundImage = '';
				}
			}
		}
	}

	// 从地图数组中获取各个终点的坐标
	map.prototype.getEndPoints = function(maparr)
	{
		var k = 0;
		for (var i = maparr.length - 1; i >= 0; i--) {
			var arrtemp = new Array();
			arrtemp = maparr[i];
			for (var j = arrtemp.length - 1; j >= 0; j--) {
				// 保存终点坐标在EndPoints[]数组中
				if (-3==arrtemp[j]) {this.EndPoints[k] = i*this.W+j;k++;}
			}
		}
	}
	// 从地图数组中获取箱子的坐标
	map.prototype.getBoxes = function(maparr)
	{
		var k = 0;
		for (var i = maparr.length - 1; i >= 0; i--) {
			var arrtemp = new Array();
			arrtemp = maparr[i];
			for (var j = arrtemp.length - 1; j >= 0; j--) {
				// 保存箱子坐标在case[]数组中
				if (3==arrtemp[j]) {this.boxes[k] = i*this.W+j;k++;}
			}
		}
	}
}
function man ()
{
	man.prototype.wx = 0;
	man.prototype.wy = 0;
	man.prototype.wherei = function(maparr)
	{
		for (var i = maparr.length - 1; i >= 0; i--) {
			var arrtemp = new Array();
			arrtemp = maparr[i];
			for (var j = arrtemp.length - 1; j >= 0; j--) {
				//此处x y 写反了 调回去发现出bug【崩溃脸】
				if (1==arrtemp[j]) {this.wx = i ;this.wy = j; break; }
			}
		}
	}
	// 小人移动方法 三个参数分别是 移动方向、地图数组、洞的位置数组
	man.prototype.move = function(f,maparr,EndPoints)
	{
		var dx;
		var dy;

		if ('U' == f) { dy = 0;dx= -1; }
		else if ('D'==f){ dy = 0;dx= 1;}
		else if ('L'==f){ dy = -1;dx = 0;}
		else if ('R'==f){ dy = 1;dx= 0;}
		else return false;
		//0代表地板 如果目的地是地板则可以走 
		if (0==maparr[this.wx+dx][this.wy+dy]||-3==maparr[this.wx+dx][this.wy+dy])
		{
			maparr[this.wx][this.wy] = 0;
			// 如果踩过的是洞 则走后补充洞的数据
			for (var i = 0; i < EndPoints.length; i++) {
				if(EndPoints[i] == this.wx*maparr[0].length+this.wy)
					{maparr[this.wx][this.wy] = -3;}
			}
			this.wx +=dx;this.wy+=dy;
			maparr[this.wx][this.wy] = 1;
			return maparr;	//成功则返回走后的地图。
		}
		// 3 代表箱子 如果目的地是箱子 则判断是否可以推动
		else if (3==maparr[this.wx+dx][this.wy+dy])
		{
			// 如果箱子后面是地板或者洞 则可以推动
			if ((0==maparr[this.wx+dx+dx][this.wy+dy+dy])||(-3==maparr[this.wx+dx+dx][this.wy+dy+dy])) 
			{
				maparr[this.wx+dx+dx][this.wy+dy+dy] = 3;
				maparr[this.wx][this.wy] = 0;
				// 如果踩过的是洞 则走后补充洞的数据
				for (var i = 0; i < EndPoints.length; i++) {
				if(EndPoints[i] == this.wx*maparr[0].length+this.wy)
					{maparr[this.wx][this.wy] = -3;}
				}
				this.wx += dx; this.wy += dy;
				maparr[this.wx][this.wy] = 1;
				return maparr;
			}else return false;
		}
		else return false;
	}
}