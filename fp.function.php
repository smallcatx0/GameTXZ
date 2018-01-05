<?php
// 读取地图
function Readmap($Wmap){
    $tran = array('地' => '0' ,'人'=> '1','墙'=>'2','箱'=>'3','洞'=>'-3');
	getfileAll($Wmap,$con);
	// 转化地图
	$maparr = array();
	for ($i=0; $i < count($con) ; $i++){
		for ($j=0; $j < count($con[$i]); $j++) { 
			$maparr[$i][$j] = strtr($con[$i][$j], $tran);
		}
	}
	return $maparr;
}
 // 读取指定文件全部内容 
function getfileAll($file_n,&$countent)
{ 
	$countent = array();
		//判断是否有这个文件 
	if(file_exists($file_n))
	{ 
		if($fp=fopen($file_n,"r"))
		{
			$i=0;
				//读取文件内容
			while ( $temp = fgets($fp) )
			{
				$countent[$i] = explode("||", $temp);
				$i++;
			}
			return true;
		}else{ return false;} 
	}else{ return false;}
	fclose($fp);
}

//向文件写入信息
function writefile($fname,$str,$mod)
{
	if (!($fp= fopen($fname,$mod))) return false;
    fwrite($fp, $str);
	return fclose($fp);

}