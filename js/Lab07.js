let button = document.getElementsByTagName("button")[0];
let colNumber = document.getElementById("colNumber");
let aboutColumn = document.getElementById("aboutColumn");
let tableCreate = document.getElementById("tableCreate");
let lastTable = document.getElementById("table");
let info = document.getElementById("info");
let secondSelect = document.getElementById("select2");
let firstSelect = document.getElementById("select1");
let aboutTable = document.getElementById("aboutTable");
let columnsInput = [];//储存输入框信息
let tables = [];//储存表格
let background = ["", "grey"];

//第一个下拉框事件
firstSelect.onchange = function () {
    switch (this.value) {
        case "selectOne":
            button.style.display = "none";
            tableCreate.style.display = "none";
            info.innerHTML = "";
            break;
        case "createTable":
            aboutTable.getElementsByTagName("input")[0].value = "";
            aboutTable.getElementsByTagName("input")[1].value = "";
            tableCreate.style.display = "block";
            aboutTable.style.display = "block";
            aboutColumn.style.display = "none";
            info.innerHTML = "";
            break;
        case "addRow":
            aboutTable.style.display = "none";
            aboutColumn.style.display = "block";
            addRow();
            info.innerHTML = "";
            break;
        case "delRow":
            aboutTable.style.display = "none";
            aboutColumn.style.display = "block";
            if (secondSelect.value !== "select")
                showInput(tables[secondSelect.value].getElementsByTagName("th").length, tables[secondSelect.value].getElementsByTagName("th"));
            info.innerHTML = "";
            break;
        case "delTable":
            tableCreate.style.display = "none";
            info.innerHTML = "WARNING: You cannot undo this action!";
            break;
    }
};


//第二个下拉框事件
secondSelect.onchange = function () {
    showTable(tables[secondSelect.value]);
    if (secondSelect.value === "select")
        return;
    if (firstSelect.value === "addRow" || firstSelect.value === "delRow") {
        showInput(tables[secondSelect.value].getElementsByTagName("th").length, number = tables[secondSelect.value].getElementsByTagName("th"));
    }
};


//添加一行所显示的input
function addRow() {
    let number = 0;
    if (secondSelect.value !== "select")
        number = tables[secondSelect.value].getElementsByTagName("th").length;
    else {
        return;
    }
    showInput(number, number = tables[secondSelect.value].getElementsByTagName("th"));
}

//按钮提交事件
button.onclick = function () {
    if (firstSelect.value === "createTable") {
        let tbName = document.getElementById("tbName").value || "tableName";
        addOption(tbName);
        tbName = handleTaName(tbName);
        tables[tbName] = document.createElement("table");
        let thead = document.createElement("thead");
        for (let i = 0; i < parseInt(colNumber.value); i++) {
            let th = document.createElement("th");
            th.innerHTML = columnsInput[i].value || "Attribute";
            thead.appendChild(th);
        }
        tables[tbName].appendChild(thead);
        showTable(tables[tbName]);
        //清空表格创建信息
        aboutTable.getElementsByTagName("input")[0].value = "";
        aboutTable.getElementsByTagName("input")[1].value = "";
        showInput(0);
    } else if (firstSelect.value === "addRow") {
        let temp1 = false;
        let tr = document.createElement("tr");
        for (let i = 0; i < tables[secondSelect.value].getElementsByTagName("th").length; i++) {
            let td = document.createElement("td");
            td.innerHTML = columnsInput[i].value;
            td.className = background[tables[secondSelect.value].getElementsByTagName("tr").length % 2];
            tr.appendChild(td);
            if (td.innerHTML !== "")
                temp1 = true;
        }
        if (!temp1) {
            return false;
        }
        tables[secondSelect.value].appendChild(tr);
        showInput(tables[secondSelect.value].getElementsByTagName("th").length, tables[secondSelect.value].getElementsByTagName("th"));
    } else if (firstSelect.value === "delTable") {
        delOption();
        info.innerHTML = "";
    } else if (firstSelect.value === "delRow") {
        if (secondSelect.value === "select")
            return false;
        let tr2 = tables[secondSelect.value].getElementsByTagName("tr");
        let temp2 = true;
        for (let i = 0; i < tr2.length; i++) {
            let temp = true;//匹配判断常量
            let td2 = tr2[i].getElementsByTagName("td");
            for (let k = 0; k < td2.length; k++) {

                //改变后续行的css
                if (!temp2) {
                    td2[k].className = background[1 - background.indexOf(td2[k].className)]
                }
                if (td2[k].innerHTML !== aboutColumn.getElementsByTagName("input")[k].value
                    && aboutColumn.getElementsByTagName("input")[k].value && temp2) {
                    temp = false;
                    break;
                }
            }
            //是否删除当前行
            if (temp && temp2) {
                tables[secondSelect.value].removeChild(tr2[i]);
                showInput(tables[secondSelect.value].getElementsByTagName("th").length, tables[secondSelect.value].getElementsByTagName("th"));
                temp2 = false;
                i--;//回退一行，css设置空隙
            }
        }
        showInput(tables[secondSelect.value].getElementsByTagName("th").length, tables[secondSelect.value].getElementsByTagName("th"));
    }
    return false;
};


//为第二个下拉框添加选项并默认选中
function addOption(optionValue) {
    let option = document.createElement("option");
    secondSelect.appendChild(option);
    option.innerHTML = optionValue;
    option.value = handleTaName(optionValue);
    option.selected = true;
}

//删除选项
function delOption() {
    let options = secondSelect.getElementsByTagName("option");

    //默认选项忽略
    if (secondSelect.value === "select")
        return;

    for (let option of options) {
        if (option.selected) {
            secondSelect.removeChild(option);
            tables[option.value] = "";
            if (lastTable.firstChild)
                lastTable.removeChild(lastTable.firstChild);
            if (secondSelect.getElementsByTagName("option")[1]) {
                secondSelect.getElementsByTagName("option")[1].selected = true;
                showTable(tables[secondSelect.getElementsByTagName("option")[1].value]);
            }
            return;
        }
    }
}

//处理表格重名问题，因为采用的是数组储存表格
function handleTaName(tableName) {
    let count = 0;//计数器
    for (let i in tables) {
        if (i.replace(/\d+/, '') === tableName.replace(/\d+/, ''))
            count++;
    }
    return tableName + count;
}

//展现表格
function showTable(table) {
    if (lastTable.firstChild)
        lastTable.removeChild(lastTable.firstChild);
    if (secondSelect.value === "select")
        return;//传入表格对象无效
    lastTable.appendChild(table);
}

//列数改变，输入框个数改变
colNumber.onchange = function () {
    let number = parseInt(colNumber.value);
    if (number <= 0) {
        return false;
    } else {
        button.style.display = "inline";
        aboutColumn.style.display = "block";
        showInput(number);
    }
};


//显示一定数量的输入框
function showInput(number, ths = []) {
    while (aboutColumn.hasChildNodes()) //当aboutColumn下还存在子节点时 循环继续
    {
        aboutColumn.removeChild(aboutColumn.firstChild);
    }

    for (let i = 0; i < number; i++) {
        columnsInput[i] = document.createElement("input");
        columnsInput[i].type = "text";
        columnsInput[i].placeholder = ths[i] ? ths[i].innerHTML : "Attribute";
        columnsInput[i].style.width = 140 + "px";
        columnsInput[i].style.height = "30px";
        aboutColumn.appendChild(columnsInput[i]);
    }
}

