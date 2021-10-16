//定义组件构造函数
function Dialog() {
    this.Dialog = null;
    this.settings = { //配置默认参数
        divId: '',
        contentId: '',
        w: 300,
        h: 200,
        dir: 'center',
        title: '',
        mark: false, //设置是否有遮罩效果
    }
};

//增加一个 json 类型的原型属性 用于存放组件实例生成与否
Dialog.prototype.json = {};

//初始化弹窗
Dialog.prototype.init = function(opt) {
    extend(this.settings, opt); //调用属性复制函数 实现实例配置参数替换默认配置参数

    //确保只有一个点击弹窗
    if (this.json[opt.iNow] == undefined) {
        this.json[opt.iNow] = true; //第一次点击时 值为 true 
    }
    if (this.json[opt.iNow]) { //值为 true 时 执行下面的函数
        this.create(); //调用方法 创建弹窗
        this.fnClose(); //调用方法 关闭弹窗

        //如果 mark 配置参数为 true 则创建遮罩层
        if (this.settings.mark) {
            this.createMark();
        }

        this.json[opt.iNow] = false; //生成过一个实例 标识设为 false
    }

};

//创建弹窗(渲染元素)
Dialog.prototype.create = function() {
    this.Dialog1 = document.createElement("div"); //创造 div 元素
    this.Dialog1.id = this.settings.divId; //设置 id 属性
    this.Dialog1.innerHTML = ' <div class="title"><span>' + this.settings.title +
        '</span><span class="close">x</span></div><div id="' + this.settings.contentId + '"></div>'; //设置创建内容
    document.body.appendChild(this.Dialog1);
    this.setData(); //设置弹窗大小及位置
};

//设置弹窗大小以及显示位置
Dialog.prototype.setData = function() {
    //设置弹窗大小
    this.Dialog1.style.width = this.settings.w + 'px';
    this.Dialog1.style.height = this.settings.h + 'px';

    //判断弹窗显示位置 居中 or 居右下角
    if (this.settings.dir == 'center') { //设置水平居中显示
        this.Dialog1.style.left = (viewWidth() - this.Dialog1.offsetWidth) / 2 + 'px';
        this.Dialog1.style.top = (viewHeight() - this.Dialog1.offsetHeight) / 2 + 'px';
    } else if (this.settings.dir == 'right') { //设置居右显示
        this.Dialog1.style.left = (viewWidth() - this.Dialog1.offsetWidth) + 'px';
        this.Dialog1.style.top = (viewHeight() - this.Dialog1.offsetHeight) + 'px';
    };

};

//关闭弹窗 并关闭罩层
Dialog.prototype.fnClose = function() {
    var oClose = this.Dialog1.getElementsByTagName("span")[1]; //获取 x span元素对象
    var self = this;
    console.log(oClose, self);

    oClose.onclick = function() {

        document.body.removeChild(self.Dialog1); //移除子节点

        if (self.settings.mark) {
            document.body.removeChild(self.iMark);
        }
    }
};

//定义创建罩层的方法
Dialog.prototype.createMark = function() {
    var iMark = document.createElement('div');
    iMark.id = 'iMark';
    document.body.appendChild(iMark);

    this.iMark = iMark;

    //遮罩层与可视区一样大小
    iMark.style.width = viewWidth() + 'px';
    iMark.style.height = viewHeight() + 'px';
};

//获取可视区宽度
function viewWidth() {
    return document.documentElement.clientWidth;
};
//获取可视区高度
function viewHeight() {
    return document.documentElement.clientHeight;
};

//定义属性复制方法
function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
};