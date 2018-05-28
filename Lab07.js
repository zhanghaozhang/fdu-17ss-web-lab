let button = document.getElementById("button");
let columnNumber = document.getElementById("colNumber");
let augColumn = document.getElementById("augColumn");
let tableCreate = document.getElementById("tableCreate");
let lastTable = document.getElementById("table");
let info = document.getElementById("info");
let secondSelect = document.getElementById("select2");
let firstSelect = document.getElementById("select1");
let aboutTable = document.getElementById("aboutTable");
let inputInformation = [];//储存输入框信息
let table = [];//储存表格
let background = ["white", "grey"];

//第一个下拉框事件
function first() {
    switch (firstSelect.value) {
        case "selectOne":
            tableCreate.style.display = "none";
            button.style.display = "none";
            info.innerHTML = "";
            break;
        case "createTable":
            aboutTable.getElementsByTagName("input")[0].value = "";
            aboutTable.getElementsByTagName("input")[1].value = "";
            tableCreate.style.display = "block";
            aboutTable.style.display = "block";
            augColumn.style.display = "none";
            info.innerHTML = "";
            break;
        case "addRow":
            aboutTable.style.display = "none";
            augColumn.style.display = "block";
            addRow();
            info.innerHTML = "";
            break;
        case "delRow":
            aboutTable.style.display = "none";
            augColumn.style.display = "block";
            if (secondSelect.value !== "select")
                createInput(table[secondSelect.value].getElementsByTagName("th").length, table[secondSelect.value].getElementsByTagName("th"));
            info.innerHTML = "";
            break;
        case "delTable":
            tableCreate.style.display = "none";
            info.innerHTML = "WARNING: You cannot undo this action!";
            break;
    }
}


//第二个下拉框事件
function second() {
    showTable(table[secondSelect.value]);
    if (secondSelect.value === "select")
        return;
    if (firstSelect.value === "addRow" || firstSelect.value === "delRow") {
        createInput(table[secondSelect.value].getElementsByTagName("th").length, number = table[secondSelect.value].getElementsByTagName("th"));
    }
}


//添加一行所显示的input
function addRow() {
    let number = 0;
    if (secondSelect.value === "select")
        return;
    else {
        number = table[secondSelect.value].getElementsByTagName("th").length;
    }
    createInput(number, number = table[secondSelect.value].getElementsByTagName("th"));
}

//按钮提交事件
button.onclick = function() {
    switch (firstSelect.value) {
        case "selectOne":
            tableCreate.style.display = "none";
            button.style.display = "none";
            info.innerHTML = "";
            break;
        case "createTable":
            let tbName = document.getElementById("tbName").value || "tableName";
            addOption(tbName);
            tbName = handleTbName(tbName);
            table[tbName] = document.createElement("table");
            let thead = document.createElement("thead");
            for (let i = 0; i < parseInt(columnNumber.value); i++) {
                let th = document.createElement("th");
                th.innerHTML = inputInformation[i].value || "Attribute";
                thead.appendChild(th);
            }
            table[tbName].appendChild(thead);
            showTable(table[tbName]);
            //清空表格创建信息
            aboutTable.getElementsByTagName("input")[0].value = "";
            aboutTable.getElementsByTagName("input")[1].value = "";
            createInput(0);
            break;
        case "addRow":
            let temp1 = false;
            let tr = document.createElement("tr");
            for (let i = 0; i < table[secondSelect.value].getElementsByTagName("th").length; i++) {
                let td = document.createElement("td");
                td.innerHTML = inputInformation[i].value;
                td.className = background[table[secondSelect.value].getElementsByTagName("tr").length % 2];
                tr.appendChild(td);
                if (td.innerHTML !== "")
                    temp1 = true;
            }
            if (!temp1) {
                return false;
            }
            table[secondSelect.value].appendChild(tr);
            createInput(table[secondSelect.value].getElementsByTagName("th").length, table[secondSelect.value].getElementsByTagName("th"));
            break;
        case "delRow":
            if (secondSelect.value !== "select"){
                let tr2 = table[secondSelect.value].getElementsByTagName("tr");
                let temp2 = true;
                for (let i = 0; i < tr2.length; i++) {
                    let temp = true;//匹配判断常量
                    let td2 = tr2[i].getElementsByTagName("td");
                    for (let k = 0; k < td2.length; k++) {

                        //改变后续行的css
                        if (!temp2) {
                            td2[k].className = background[1 - background.indexOf(td2[k].className)]
                        }
                        if (td2[k].innerHTML !== augColumn.getElementsByTagName("input")[k].value
                            && augColumn.getElementsByTagName("input")[k].value && temp2) {
                            temp = false;
                            break;
                        }
                    }
                    //是否删除当前行
                    if (temp && temp2) {
                        table[secondSelect.value].removeChild(tr2[i]);
                        createInput(table[secondSelect.value].getElementsByTagName("th").length, table[secondSelect.value].getElementsByTagName("th"));
                        temp2 = false;
                        i--;//回退一行
                    }
                }
                createInput(table[secondSelect.value].getElementsByTagName("th").length, table[secondSelect.value].getElementsByTagName("th"));
            }
            break;
        case "delTable":
            delOption();
            info.innerHTML = "";
            break;
    }
    return false;
};


//为第二个下拉框添加选项并默认选中
function addOption(optionValue) {
    let option = document.createElement("option");
    secondSelect.appendChild(option);
    option.innerHTML = optionValue;
    option.value = handleTbName(optionValue);
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
            table[option.value] = "";
            if (lastTable.firstChild)
                lastTable.removeChild(lastTable.firstChild);
            if (secondSelect.getElementsByTagName("option")[1]) {
                secondSelect.getElementsByTagName("option")[1].selected = true;
                showTable(table[secondSelect.getElementsByTagName("option")[1].value]);
            }
            return;
        }
    }
}

//处理表格重名问题，因为采用的是数组储存表格
function handleTbName(tableName) {
    let count = 0;//计数器
    for (let i in table) {
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
columnNumber.onchange = function () {
    let number = parseInt(columnNumber.value);
    if (number <= 0) {
        return false;
    } else {
        button.style.display = "inline";
        augColumn.style.display = "block";
        createInput(number);
    }
};


//显示一定数量的输入框
function createInput(number, inputBox = []) {
    while (augColumn.hasChildNodes()) //当aboutColumn下还存在子节点时 循环继续
    {
        augColumn.removeChild(augColumn.firstChild);
    }

    for (let i = 0; i < number; i++) {
        inputInformation[i] = document.createElement("input");
        inputInformation[i].type = "text";
        inputInformation[i].placeholder = inputBox[i] ? inputBox[i].innerHTML : "Attribute";
        inputInformation[i].style.width = 140 + "px";
        inputInformation[i].style.height = "30px";
        augColumn.appendChild(inputInformation[i]);
    }
}

