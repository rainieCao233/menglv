var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./customize.css")

//components
var Helper = require("../../components/helper/helper")
var Validator = require("../../components/helper/validator")

var Customize = React.createClass({
  getInitialState:function(){
    return {
      themeInput:[true,false,false,false,false,false,false],
      numberInput:[true,false,false,false,false,false],
      daysInput:[true,false,false,false],
      timeInput:[true,false,false,false,false],
      budgetInput:[true,false,false,false,false,false]
    }
  },
  componentDidMount:function(){
  },
  themeInput:function(e){
    if(e.target.type == "checkbox"){
      this.state.themeInput[e.target.value-1] = !this.state.themeInput[e.target.value-1]
      this.forceUpdate();
    }
  },
  input2:function(e){
    if(e.target.type == "radio"){
      for (var i = 0; i < this.state[e.target.name + "Input"].length; i++) {
        this.state[e.target.name + "Input"][i] = false;
      };
      this.state[e.target.name + "Input"][e.target.value-1] = true;
      this.forceUpdate();
    }
  },
  submit:function(){
    if(this.refs.name.value == ""){
      alert("姓名为空")
      this.refs.name.value = "";
      this.refs.name.focus();
      return;
    }
    if(!Validator.isPhone(this.refs.tel.value)){
      alert("手机号 error")
      this.refs.tel.value = "";
      this.refs.tel.focus();
      return;
    }
    if(this.refs.link.value == ""){
      alert("联系方式 erroe")
      this.refs.link.value = "";
      this.refs.link.focus();
      return;
    }
  },
  render:function(){
    return(
      <div id="customize">
        <div className="wrap">
          <div className="title">团队活动定制</div>
          <div className="slogan">企业、社团、学校、定制旅行、团建拓展、让您的团队有温度！</div>
          <ul className="list clearfix" onClick={this.themeInput}>
            <span className="namebar">主题定制</span>
            <li><input type="checkbox" name="theme" value="1" id="theme-1" defaultChecked="checked"/><label htmlFor="theme-1" className="checkbox"></label>团队年/季度旅游</li>
            <li><input type="checkbox" name="theme" value="2" id="theme-2"/><label htmlFor="theme-2" className="checkbox"></label>基地凝聚力拓展</li>
            <li><input type="checkbox" name="theme" value="3" id="theme-3"/><label htmlFor="theme-3" className="checkbox"></label>交友人脉开拓</li>
            <li><input type="checkbox" name="theme" value="4" id="theme-4"/><label htmlFor="theme-4" className="checkbox"></label>休闲放松娱乐</li>
            <li><input type="checkbox" name="theme" value="5" id="theme-5"/><label htmlFor="theme-5" className="checkbox"></label>团队会议</li>
            <li><input type="checkbox" name="theme" value="6" id="theme-6"/><label htmlFor="theme-6" className="checkbox"></label>会议/旅行/拓展混合</li>
            <li><input type="checkbox" name="theme" value="7" id="theme-7"/><label htmlFor="theme-7" className="checkbox"></label>其他</li>
          </ul>
          <ul className="list clearfix" onClick={this.input2}>
            <span className="namebar">出行人数</span>
            <li><input type="radio" name="number" value="1" id="number-1" defaultChecked="checked"/><label htmlFor="number-1"></label>15人及以下</li>
            <li><input type="radio" name="number" value="2" id="number-2"/><label htmlFor="number-2"></label>15人--20人</li>
            <li><input type="radio" name="number" value="3" id="number-3"/><label htmlFor="number-3"></label>20人--35人</li>
            <li><input type="radio" name="number" value="4" id="number-4"/><label htmlFor="number-4"></label>35人--50人</li>
            <li><input type="radio" name="number" value="5" id="number-5"/><label htmlFor="number-5"></label>50人--100人</li>
            <li><input type="radio" name="number" value="6" id="number-6"/><label htmlFor="number-6"></label>100人以上</li>
          </ul>
          <ul className="list clearfix" onClick={this.input2}>
            <span className="namebar">出行天数</span>
            <li><input type="radio" name="days" value="1" id="days-1" defaultChecked="checked"/><label htmlFor="days-1"></label>一天</li>
            <li><input type="radio" name="days" value="2" id="days-2"/><label htmlFor="days-2"></label>两天</li>
            <li><input type="radio" name="days" value="3" id="days-3"/><label htmlFor="days-3"></label>三天</li>
            <li><input type="radio" name="days" value="4" id="days-4"/><label htmlFor="days-4"></label>三天以上</li>
          </ul>
          <ul className="list clearfix" onClick={this.input2}>
            <span className="namebar">出行时间</span>
            <li><input type="radio" name="time" value="1" id="time-1" defaultChecked="checked"/><label htmlFor="time-1"></label>本周内</li>
            <li><input type="radio" name="time" value="2" id="time-2"/><label htmlFor="time-2"></label>下一周</li>
            <li><input type="radio" name="time" value="3" id="time-3"/><label htmlFor="time-3"></label>本月内</li>
            <li><input type="radio" name="time" value="4" id="time-4"/><label htmlFor="time-4"></label>下个月</li>
            <li><input type="radio" name="time" value="5" id="time-5"/><label htmlFor="time-5"></label>其他 : <input type="text" /></li>
          </ul>
          <ul className="list clearfix" onClick={this.input2}>
            <span className="namebar">出行预算</span>
            <li><input type="radio" name="budget" value="1" id="budget-1" defaultChecked="checked"/><label htmlFor="budget-1"></label>500以内</li>
            <li><input type="radio" name="budget" value="2" id="budget-2"/><label htmlFor="budget-2"></label>500-1000</li>
            <li><input type="radio" name="budget" value="3" id="budget-3"/><label htmlFor="budget-3"></label>1000-1500</li>
            <li><input type="radio" name="budget" value="4" id="budget-4"/><label htmlFor="budget-4"></label>1500以上</li>
            <li><input type="radio" name="budget" value="5" id="budget-5"/><label htmlFor="budget-5"></label>不确定</li>
            <li><input type="radio" name="budget" value="6" id="budget-6"/><label htmlFor="budget-6"></label>其他 : <input type="text" /></li>
          </ul>
          <div className="otherreq">
            <span className="namebar">其他要求</span>
            <textarea name="otherreq" className="textarea" placeholder="输入您对本次旅行的要求，我们会尽快联系您"></textarea>
          </div>
          <div className="linkman">
            <span className="namebar">联系人信息</span>
            <p className="tip">请留下您的联系方式，我们会为您指派专属的服务人员，为您提供专属的服务内容</p>
            <div className="info">
              姓名 * : <input type="text" name="name" ref="name" />
            </div>
            <div className="info">
              手机 * : <input type="text" name="tel" ref="tel" />
            </div>
            <div className="info">
              QQ/微信/E-mail * : <input type="text" name="link" ref="link" />
            </div>
            <p className="tip">备注：在手机无法连接通信情况下预留在线的联系方式，以防第三方软件屏蔽电话号码</p>
          </div>
          <a href="javascript:void(0)" className="submit_btn" onClick={this.submit}>提交</a>
        </div>
      </div>
    )
  }
})

module.exports = Customize
