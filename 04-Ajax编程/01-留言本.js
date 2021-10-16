window.onload = function() {


    var Reg = document.getElementById('reg'); //注册框对象 
    var Login = document.getElementById('login'); //注册框对象
    var RegLink = document.getElementById('regLink'); //注册链接对象对象
    var Username1 = document.getElementById('username1'); //注册用户名
    var Username2 = document.getElementById('username2'); //登录用户名
    var pwd2 = document.getElementById('pwd2'); //登录密码
    var verifNmaeMsg = document.getElementById('verifNmaeMsg'); //注册框对象
    console.log(Reg, RegLink, Username1, Username2, pwd2, verifNmaeMsg);


    // 留言板用户注册

    //单击注册链接 显示注册表单 隐藏注册链接
    RegLink.onclick = function() {
        Reg.style.display = 'block';
        RegLink.style.display = 'none';
        Login.style.display = 'none';
    }

    /*注册时验证用户名
    使用get方法请求  01-留言本.php  
    */
    Username1.onblur = function() {
        ajax('get', 'index.php', 'm=index&a=varifUserName&username=' + this.value, function(data) {
            var d = JSON.parse(data);
            verifNmaeMsg.innerHTML = d.message;
            if (d.code) {
                verifNmaeMsg.style.color = 'red';
            } else {
                verifNmaeMsg.style.color = "green";
            }
        });
    };

    //用户注册
    var pwd1 = document.getElementById('pwd1');
    var regbtn = document.getElementById('Regbtn');
    regbtn.onclick = function() {
        ajax('post', 'index.php', 'm=index&a=reg&username=' + encodeURI(Username1.value) + '&passwd=' + pwd1.value, function(data) {
            var d = JSON.parse(data);
            alert(d.message + '' + d.code);

            if (!d.code) {
                Reg.style.display = "none";
                Login.style.display = "block";
                Username2.value = Username1.value;
                pwd2.value = pwd1.value;
            }
        })
    }

}