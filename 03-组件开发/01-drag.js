//定义组件构造函数
function Drag() {
    this.obj = null;
    this.disX = 0;
    this.disY = 0;
    this.settings = { //在构造函数中设置默认配置参数
        id: '',
        flag: false //为 false 时 表示 普通拖曳 ；为 true 时 只能在可视区拖曳

    }
};

//定义原型方法
Drag.prototype.init = function(opt) {
    var self = this; //此处 this 表示 Drag.prototype 对象
    this.obj = document.getElementById(opt.id); //此处 this 表示调用 init() 对象
    extend(this.settings, opt); //调用属性复制函数，实现实例配置参数替换默认配置参数

    //鼠标按下事件处理
    this.obj.onmousedown = function(ev) {
        var ev = ev || window.event;
        self.fnDown(ev); //调用原型方法 获取鼠标按下的位置
        fireEvent(self, 'toDown'); //调用主动触发事件函数

        //鼠标移动事件处理
        document.onmousemove = function(ev) {
            var ev = ev || window.event;
            self.fnMove(ev); //调用原型方法 获取拖曳的对象在移动时的位置
        };


        //鼠标松开事件处理 
        document.onmouseup = function() {
            self.fnUp();
            fireEvent(self, 'toUp'); //调用主动触发事件

        };
        return false; //取消默认事件

    };
};

//定义原型方法获取鼠标按下的位置
Drag.prototype.fnDown = function(ev) {
    this.disX = ev.clientX - this.obj.offsetLeft;
    this.disY = ev.clientY - this.obj.offsetTop;
};

//获取拖曳的对象在移动时的位置
Drag.prototype.fnMove = function(ev) {
    var L = ev.clientX - this.disX;
    var T = ev.clientY - this.disY;

    //当 flag =true 实行 可视区域拖曳
    if (this.settings.flag) {
        //限制 平行 方向的范围
        if (L < 0) {
            L = 0;
        } else if (L > viewWidth() - this.obj.offsetWidth) {
            L = viewWidth() - this.obj.offsetWidth;
        }

        //限制 垂直 方向的范围
        if (T < 0) {
            T = 0;
        } else if (T > viewHeigt() - this.obj.offsetHeight) {
            T = viewHeigt() - this.obj.offsetHeight;
        }
    }

    //设置拖曳对象左上角的坐标位置
    this.obj.style.left = L + 'px';
    this.obj.style.top = T + 'px';
};

//释放鼠标时取消鼠标移动 释放事件
Drag.prototype.fnUp = function() {
    document.onmousemove = null;
    document.onmouseup = null;
};

//定义事件绑定函数
function bindEvent(obj, events, fn) {
    obj.listeners = obj.listeners || {};
    obj.listeners[events] = obj.listeners[events] || [];
    obj.listeners[events].push(fn);
    if (obj.nodeType) {
        if (obj.addEventListener) {
            obj.addEventListener(events, fn, false);
        } else {
            obj.attachEvent('on' + events, fn);
        }
    }
};

//定义主动触发自定义事件函数
function fireEvent(obj, events) {
    if (obj.listeners && obj.listeners[events]) {
        for (var i = 0; i < obj.listeners[events].length; i++) {
            obj.listeners[events][i](); //当函数被调用时会主动触发执行自定义函数
        }
    }
};

//获取可视区宽度
function viewWidth() {
    return document.documentElement.clientWidth;
};

//获取可视区高度
function viewHeigt() {
    return document.documentElement.clientHeight;
};

//定义属性复制方法
function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
};