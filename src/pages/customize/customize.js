var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./customize.css")

//components
var Helper = require("../../components/helper/helper")

var Customize = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="customize">
        <div className="wrap">
          <div className="title">团队活动定制</div>
          <div className="slogan">企业、社团、学校、定制旅行、团建拓展、让您的团队有温度！</div>
          <ul className="list clearfix">
            <span className="namebar">主题定制</span>
            <li><label htmlFor="theme-1"></label><input type="radio" name="theme" value="1" id="theme-1"/>团队年/季度旅游</li>
            <li><label htmlFor="theme-2"></label><input type="radio" name="theme" value="2" id="theme-2"/>基地凝聚力拓展</li>
            <li><label htmlFor="theme-3"></label><input type="radio" name="theme" value="3" id="theme-3"/>交友人脉开拓</li>
            <li><label htmlFor="theme-4"></label><input type="radio" name="theme" value="4" id="theme-4"/>休闲放松娱乐</li>
            <li><label htmlFor="theme-5"></label><input type="radio" name="theme" value="5" id="theme-5"/>团队会议</li>
            <li><label htmlFor="theme-6"></label><input type="radio" name="theme" value="6" id="theme-6"/>会议/旅行/拓展混合</li>
            <li><label htmlFor="theme-7"></label><input type="radio" name="theme" value="7" id="theme-7"/>其他</li>
          </ul>
          <ul className="list clearfix">
            <span className="namebar">出行人数</span>
            <li><label htmlFor="number-1"></label><input type="radio" name="number" value="1" id="number-1"/>15人及以下</li>
            <li><label htmlFor="number-2"></label><input type="radio" name="number" value="2" id="number-2"/>15人--20人</li>
            <li><label htmlFor="number-3"></label><input type="radio" name="number" value="3" id="number-3"/>20人--35人</li>
            <li><label htmlFor="number-4"></label><input type="radio" name="number" value="4" id="number-4"/>35人--50人</li>
            <li><label htmlFor="number-5"></label><input type="radio" name="number" value="5" id="number-5"/>50人--100人</li>
            <li><label htmlFor="number-6"></label><input type="radio" name="number" value="6" id="number-6"/>100人以上</li>
          </ul>
          <ul className="list clearfix">
            <span className="namebar">出行天数</span>
            <li><label htmlFor="days-1"></label><input type="radio" name="days" value="1" id="days-1"/>一天</li>
            <li><label htmlFor="days-2"></label><input type="radio" name="days" value="2" id="days-2"/>两天</li>
            <li><label htmlFor="days-3"></label><input type="radio" name="days" value="3" id="days-3"/>三天</li>
            <li><label htmlFor="days-4"></label><input type="radio" name="days" value="4" id="days-4"/>三天以上</li>
          </ul>
          <ul className="list clearfix">
            <span className="namebar">出行时间</span>
            <li><label htmlFor="time-1"></label><input type="radio" name="time" value="1" id="time-1"/>本周内</li>
            <li><label htmlFor="time-2"></label><input type="radio" name="time" value="2" id="time-2"/>下一周</li>
            <li><label htmlFor="time-3"></label><input type="radio" name="time" value="3" id="time-3"/>本月内</li>
            <li><label htmlFor="time-4"></label><input type="radio" name="time" value="4" id="time-4"/>下个月</li>
            <li><label htmlFor="time-5"></label><input type="radio" name="time" value="4" id="time-5"/>其他 : <input type="text" /></li>
          </ul>
          <ul className="list clearfix">
            <span className="namebar">出行预算</span>
            <li><label htmlFor="budget-1"></label><input type="radio" name="budget" value="1" id="budget-1"/>500以内</li>
            <li><label htmlFor="budget-2"></label><input type="radio" name="budget" value="2" id="budget-2"/>500-1000</li>
            <li><label htmlFor="budget-3"></label><input type="radio" name="budget" value="3" id="budget-3"/>1000-1500</li>
            <li><label htmlFor="budget-4"></label><input type="radio" name="budget" value="4" id="budget-4"/>1500以上</li>
            <li><label htmlFor="budget-5"></label><input type="radio" name="budget" value="5" id="budget-5"/>不确定</li>
            <li><label htmlFor="budget-6"></label><input type="radio" name="budget" value="6" id="budget-6"/>其他 : <input type="text" /></li>
          </ul>
          <div className="otherreq">
            <span className="namebar">其他要求</span>
            <textarea name="otherreq" className="textarea" placeholder="输入您对本次旅行的要求，我们会尽快联系您"></textarea>
          </div>
          <div className="linkman">
            <span className="namebar">联系人信息</span>
            <p className="tip">请留下您的联系方式，我们会为您指派专属的服务人员，为您提供专属的服务内容</p>
            <div className="info">
              姓名 * : <input type="text" name="name" value="" />
            </div>
            <div className="info">
              手机 * : <input type="text" name="tel" value="" />
            </div>
            <div className="info">
              QQ/微信/E-mail * : <input type="text" name="link" value="" />
            </div>
            <p className="tip">备注：在手机无法连接通信情况下预留在线的联系方式，以防第三方软件屏蔽电话号码</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Customize
