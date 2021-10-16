window.onload = function() {
    //引入数据
    var data = [{
        id: 0,
        pid: -1,
        title: '微云'
    }, {
        id: 1,
        pid: 0,
        title: '我的文档'
    }, {
        id: 2,
        pid: 0,
        title: '我的音乐'
    }, {
        id: 3,
        pid: 1,
        title: '唱跳rap'
    }, {
        id: 4,
        pid: 1,
        title: '我嫩叠'
    }];

    var nowId = 1; //显示层数 -1 0 1 最高只有三层
    var topId = 0;
    var topPid = -1;

    // 侧边栏菜单渲染
    var treeMenu = document.getElementById('tree-menu');
    treeMenu.innerHTML = createTreeMenu(topPid, 0);

    //方法
    function createTreeMenu(pid, level, open) {
        // level 当前处于第几级 需要根据他的层级给缩进  移动到弹窗每一项都要展开而侧边栏导航只有nowId当前选中选项或其父级需要张开 如果传入open 认为移动到弹窗的
        var nowData = getChild(pid); //获取当前组内容
        var inner = '<ul>'; //存放我们的内容
        for (var i = 0; i < nowData.length; i++) {
            var hasChild = getChild(nowData[i].id).length > 0; //获取当前项是否有子项
            inner += '<li class="' + (isOpen(nowData[i].id, open) ? "open" : "") + '">';
            inner += '<p data-id="' + i + '"style="padding-left: ' +
                (level * 20 + 40) + 'px;" class="' + (hasChild ? 'has-Child' : '') + " " + (nowId == nowData[i].id ? "active" : "") + '"><span>' + nowData[i].title + '</span></p>';
            if (hasChild) { //如果当前项有子项 在这里再生成一个子集的ul
                inner += createTreeMenu(nowData[i].id, level + 1, open);
            }
            inner += '</li>';
        }
        inner += "</ul>";
        return inner;

    };

    function isOpen(id, open) {
        //id 当前数据项id
        //open 是否传入open状态
        if (open) { //传入open
            return true;
        }
        if (id == nowId) { //当前项是nowId
            return true;
        }

        var nowAllParent = getAllParent(nowId);
        for (var i = 0; i < nowAllParent.length; i++) {
            if (id == nowAllParent[i].id) { //当前项是nowId的子级
                return true;
            }
        }
        return false;
    };

    function getSelf(id) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                return data[i];
            }
        }
    }

    function getParent(id) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                return data[i];
            }
        }
    }


    function getChild(id) {
        var Child = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid == id) {
                Child.push(data[i]);
            }
        }
        return Child;
    }

    function getAllParent(pid) {
        var AllParent = [];
        while (pid > -1) {
            var parent = getParent(pid);
            pid = parent.pid;
            AllParent.unshift(parent);
        }
        return AllParent;
    }

    // 路径导航渲染
    var breadNav = document.querySelector('.bread-nav');
    breadNav.innerHTML = createBreadNav();

    function createBreadNav() {
        var inner = '';
        var self = getSelf(nowId);
        var AllParent = getAllParent(self.pid);
        for (var i = 0; i < AllParent.length; i++) {
            inner += '<a data-id="' + i + '">' + AllParent[i].title + '</a>';
        }
        inner += '<span>' + self.title + '</span>';

        console.log(self);
        return inner;

    }

    // 文件夹视图渲染
    var folders = document.getElementById('folders');
    folders.innerHTML = createFolders();

    function createFolders() {
        var Child = getChild(nowId);
        var inner = '';
        if (Child.length == 0) {
            folders.classList.add("folders-empty");
            return '';
        }
        folders.classList.remove('folders-empty');
        for (var i = 0; i < Child.length; i++) {
            inner += '<li data-id="' + i + '" class="folder-item active > ';
            inner += '<img src="./image/image2.png" >';
            inner += '<span class="folder-name">' + Child[i].title + '</span>';
            inner += '<input type="text" class="editor" value="' + Child[i].title + '">';
            inner += '<label class="checked">';
            inner += '<input type="checkbox"  id="checkbox">';
            inner += '</label>';
            inner += '</li>';
        }
        return inner;
    }

    //左侧菜单单击事件添加
    treeMenu.onclick = function(e) {
        var item;
        switch (e.target.tagName) {
            case "P":
                item = e.target;
                break;
            case "SPAN":
                item = e.target.parentNode;
                break;
        }
        if (item) {
            nowId = item.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid, 0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    }

    // 路径导航栏单击事件添加
    breadNav.onclick = function(e) {
        if (e.target.tagName == "A") {
            nowId = e.target.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid, 0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    }

    //文件夹单击事件添加
    folders.onclick = function(e) {
        var item;
        switch (e.target.tagName) {
            case "LI":
                item = e.target;
                break;
            case "IMG":
                item = e.target.parentNode;
                break;
        }
        if (item) {
            console.log(e.target.dataset.id);
            nowId = item.dataset.id;
            treeMenu.innerHTML = createTreeMenu(topPid, 0);
            breadNav.innerHTML = createBreadNav();
            folders.innerHTML = createFolders();
        }
    }
}