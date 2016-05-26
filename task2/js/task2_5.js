/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);//2016-01-01
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);//增加一天
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var aqiChartWrap=document.getElementById('aqi-chart-wrap');
    var color='';
    text='';
    for(var item in chartData) {        //遍历每个chartData数据
        color='rgb('+parseInt(256*Math.random())+','+
            parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
         text+='<div class="chat_item"  style="height: '+
            chartData[item]+'px;background-color:'+color+'">'+
            '<span class="detail">date: '+item+'<br />num: '+chartData[item]+'</span>'+'</div>';
    }
    aqiChartWrap.innerHTML = text;
    addMouseEvent();
  }


function addMouseEvent(){
  addEventHandler(document, 'mouseover', function(event){
        var ele = event.target;
        if (ele.className.trim() == 'chat_item') {
          ele.className += " show";
        };
        
    });
    addEventHandler(document, 'mouseout', function(event){
        var ele = event.target;
        if (ele.className == 'chat_item show') {
          ele.className = ele.className.replace(/show/, "").trim();//去掉多余的空格
        };
        
    });
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange() {
  
  var timeSelect =  document.querySelectorAll('#form-gra-time input');
  for(key in timeSelect){
    // 确定是否选项发生了变化 
    if(timeSelect[key].checked&&timeSelect[key].value!=pageState.nowGraTime){
         // 设置对应数据
       pageState.nowGraTime = timeSelect[key].value;
       initAqiChartData();
    }
  }
 
  // 调用图表渲染函数

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect = document.getElementById('city-select');
  if(citySelect.value!=pageState.nowSelectCity){
    // 设置对应数据
    pageState.nowSelectCity = citySelect.value;
  }
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var gra_time = document.getElementsByName('gra-time');
    for(var i = 0;i<gra_time.length;i++){
        addEventHandler(gra_time[i],'click',graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityList = '';
  var citySelect = document.getElementById('city-select');
  for(item in aqiSourceData){
    cityList += '<option>' + item + '</option>';
  }
  citySelect.innerHTML = cityList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  chartData = {};
  var oneCity = {};
  var sum = 0;
  var count = 0;
  for(item in aqiSourceData){
    if(pageState.nowSelectCity = item){
        oneCity = aqiSourceData[item];
    }
    switch(pageState.nowGraTime){
        case 'day':
            chartData = oneCity;
            break;
        
        case 'week':
            sum = 0;
            count = 0;
            for(item in oneCity){
                var week = 0;
                sum +=oneCity[item];
                count++;
                if (new Date(item).getDay == 6) {
                    week++;
                    chartData['2016年第' + week + '周'] = parseInt(sum/count);
                    sum = 0;
                    count = 0;
                };
            }
            //最后一周如果不足7天
            if (count!=0) {
                week++;
                chartData['2016年第' + week + '周'] = parseInt(sum/count);
            }
            break;

        case 'month':
            sum = 0;
            count = 0;
            var month = 1;
            for(item in oneCity){
                var Odate = new Date(item);
                if (Odate.getMonth()!=month) {//月从0开始
                    month = Odate.getMonth();
                    if (sum != 0) 
                        chartData[Odate.getFullYear() + '-' + month] = parseInt(sum/count);
                    sum = 0;
                    count = 0;   
                }
                    sum += oneCity[item];
                    count++;
            }

            //不足1月也算1个月
            if (count!=0) {
                month++;
                chartData[Odate.getFullYear() + '-' + month] = parseInt(sum/count);
            }
            break;

    }
    renderChart();


  }


  // 处理好的数据存到 chartData 中
}




/* 添加事件处理程序 */
function addEventHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on" + type] = handler;
    }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
