<!DOCTYPE html>
<html>
<head>
	<title>推箱子</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="defstyle.css" />		
	<script src="comm.class.js"></script>
	<script src="main.js"></script>
	<script type="text/javascript" src="http://libs.baidu.com/jquery/1.9.0/jquery.min.js"></script>

	<?php 
	error_reporting(E_ALL||~E_NOTICE);
	include_once 'fp.function.php';

	// 判断进入第几关
	$mapNum = isset($_POST['PassNum']) ? $_POST['PassNum'] : 1;
	$mapWhere = './source/map'.$mapNum;
	// 测试地图时加入这一句。
	#$mapWhere = './source/map'.'3';

	// 判断是否有这个地图文件
	if (file_exists($mapWhere)) {
		$maparr = Readmap($mapWhere);
	}else
	{
		echo "<script>alert('没有更多关卡了！');location.href='./index.php' </script>";
		exit();
	}

	if (isset($_POST['user'])) {
		$wstr=$mapNum.'||'.$_POST['user'].'||{'.$_POST['setpNum']."}\n";
		writefile('./userMCG.dat',$wstr,'a');  //将通关玩家数据写入文件保存
	}
?>
</head>
<body>

	<header> 
		<h1>推箱子</h1>
		<a class="newgameButton" href="javascript:location.reload(true);">重置游戏</a>
	</header>

	<div class="GameBody" >
		<table id="gmap" cellspacing="0" > 
			<?php
			for ($i=0; $i < count($maparr) ; $i++) { 
				echo '<tr>';
				for ($j=0; $j < count($maparr[$i]); $j++) {
					switch ($maparr[$i][$j]) {
						case 1: $picw = 'source/images/Character1.png'; break;
						case 2: $picw = 'source/images/Wall_Brown.png'; break;
						case 3: $picw = 'source/images/Crate_Red.png'; break;
						case -3: $picw = 'source/images/EndPoint_Red.png'; break;
						
						default: $picw = ''; break;
					}
					$tdIndex = $i*count($maparr[$i])+$j;
					echo '<td style="background-image:url('.$picw.');" id="'.$tdIndex.'">';
					echo '</td>';
				}
				echo '</tr>';
			} 
			?>
		</table>
		<div class="gameMsg">
			<form id="f1" method="POST" action="" >
				第<input id="pass" type="text" disabled="disabled" value=<?php echo $mapNum;?> >关<br/>
				步数：<input id="setpN" type="text" disabled="disabled" value=0 /></>
				<!-- 表单隐藏域 用于提交 关卡 用户名 步数 -->
				<input type="hidden" name="PassNum" value= 0 />
				<input type="hidden" name="user" value= 0 />
				<input type="hidden" name="setpNum" value= 0 />

			</from>
		</div>
	</div>

	<footer>
	Copyright &copy; Powered by <a href="http://www.heykui.cn">heykui.cn </a><br />
	<a href="http://weibo.com/u/5745226920"> cn小魁 </a>版权所有 <a href="https://git.oschina.net/smallcatx0/TXZ.git"><b> 下载源码 </b></a><br />
	联系方式 QQ:1312308948
	</footer>
</body>
	
</body>
</html>