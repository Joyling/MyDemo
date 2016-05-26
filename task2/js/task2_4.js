/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

window.onload = function(){
	var aqiData = {};
var cityInput = g('aqi-city-input');
var weatherInput = g('aqi-value-input');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = cityInput.value.trim();
	var weather = weatherInput.value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!weather.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
	aqiData[city] = weather;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var weatherList = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for (var city in aqiData){
		weatherList += '<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button data-city='+city+'>删除</button></td></tr>';
	}
	g('aqi-table').innerHTML = city?weatherList:'';
	};



/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
	var add_btn = g('add-btn');
	var aqi_table = g('aqi-table');
  	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 	addEventHandler(add_btn,"click", addBtnHandle);
 	 // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	addEventHandler(aqi_table,'click',function(ev){
  	var ev =ev || window.event;
  	var target = ev.target || ev.srcElement;
  	if (target.nodeName.toLowerCase() === 'button')
  		delBtnHandle.call(null,target.dataset.city);
  })
}

/*简写document.getElementById*/
function g(id) {
  return document.getElementById(id);
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

init();
}

