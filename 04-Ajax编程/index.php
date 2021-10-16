<?php
header('content-type:text/html;charset="utf-8"'); //设置表头
error_reporting(0);

    //调用用户名验证函数验证注册的用户名    
     public function verifyUserName(){
         $username=trim(isset($_REQUEST['username'])?$_REQUEST['username']:'');
         switch($this->_verifyUserName($username))
         {
            case 0:
                 $this->sendByAjax(array('message'=>'恭喜你，该用户可以注册！'));
                 break;
            case 1:
                 $this->sendByAjax(array('code'=>1,'message'=>'用户长度不能小于3个或大于16个字符！'));
                 break;
            case 2:
                $this->sendByAjax(array('code'=>2,'message'=>'对不起，该名字已经被注册'));
                 break; 
            default:
                break;                      
         }
     };

     //用户名验证函数
     private function _verifyUserName($username=''){
         if(strlen($username)<3||strlen($username)>16){ //字符数在4-16之间
            return 1;
         }
         $rs=$this->db->get("SELECT 'username' FROM 'users' WHERE 'username'='{$username}'");  //这是个数据库的语句 创建连接
          if($rs){
              return 2;
          }

          return 0;
     };

     //注册用户
     public function reg(){
         $username =trim(isset($_REQUEST['username']?$_REQUEST['username']:''));
         $passwd =trim(isset($_REQUEST['passwd']?$_REQUEST['passwd']:''));
         $avatar =trim(isset($_REQUEST['avatar'] && in_array($_REQUEST['avatar'],array(1,2,3,4,5,6,7,8,9))? $_REQUEST['avatar']:1));

    if($this->_verifyUserName($username)!==0|| strlen($passwd)<3||  strlen($passwd)>20){
            $this->sendByAjax(array('code'=>1,'message'=>'注册失败！'));
        }
        $passwd=md5($passwd);
        if(false ===$this->db->query("INSERT INTO 'users'('username','passwd','avatar')VALUES('{$username}','{$passwd}',{$avatar})")){
            $this->sendByAjax(array('code'=>1,'message'=>'注册失败！'));
        }else{
            $this->sendByAjax(array('message'=>'注册成功！'));
        }

     }

 ?>