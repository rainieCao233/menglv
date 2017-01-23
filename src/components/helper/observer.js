var observerObj = {}

var observer = {
	//简单观察者实现
	/**
	 * 注册事件方法
	 * @param  {[type]} eventName	事件名
	 * @param  {[type]} func  回调方法
	 * @return {[type]}       [description]
	 */
	register:function(eventName,func,target){
		var observerItemArray = observerObj[eventName];
		var observerItem = {target:target,func:func};
		if(!observerItemArray){	//如果是新注册进来的
			observerItemArray = [observerItem];
		}else{
			//先要检查是否之前已经存在
			var item = null;
			for(var k in observerItemArray){
				item = observerItemArray[k];
				if(item.target == target && item.func==func){
					return false;
				}
			}
			observerItemArray.push(observerItem);
		}
		observerObj[eventName] = observerItemArray;
	},
	/**
	 * 注销方法（如果只传事件名，那么所有事件移除）
	 * @param  {[type]} eventName 事件名
	 * @param  {[type]} func      [description]
	 * @param  {[type]} target    [description]
	 * @return {[type]}           [description]
	 */
	unRegister:function(eventName,func,target){
		var observerItemArray = observerObj[eventName];
		if(func || target){
			var searchIndex = -1;
			if(observerItemArray){
				var item = null;
				var len = observerItemArray.length;
				for(var i=0;i<len;++i){
					item = observerItemArray[i];
					if(item.target == target && item.func==func){
						searchIndex=i;
						break;
					}
				}
				if(searchIndex>=0){
					observerItemArray.splice(searchIndex,1);
				}
			}
		}else{
			observerObj[eventName]=null;
		}
	},
	/**
	 * 触发事件
	 * @param  {[type]} eventName 事件名
	 * @return {[type]} [description]
	 */
	trigger:function(eventName,param){
        var arg = Array.prototype.slice.call(arguments,0);
        arg.shift();//把第一个eventName去掉
		var observerItemArray = observerObj[eventName];
		if(observerItemArray){
			var item = null;
			for(var k in observerItemArray){
				item = observerItemArray[k];
				item.func.apply(item.target,arg);
			}
		}
	}
}

module.exports = observer
