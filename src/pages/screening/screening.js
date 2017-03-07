var React = require("react")
var ReactDOM = require("react-dom")

//CSS
require("./screening.css")

//components
var Helper = require("../../components/helper/helper")

var Screening = React.createClass({
  getInitialState:function(){
    return {
    }
  },
  componentDidMount:function(){
  },
  render:function(){
    return(
      <div id="screening">
      	<em className="screening"></em>
      	<div className="wrap">
      		<div className="screening_wrap">
      			<div className="row">
      				<span className="input_name">时 间</span>
	      			<div className="input_wrap">
	      				<span className="tab_wrap">
		      				<input type="radio" name="time_tab" value="all" defaultChecked="checked"/>
		      				<span>全部</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="time_tab" value="1" />
		      				<span>1天</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="time_tab" value="2" />
		      				<span>2天</span>
	      				</span>
	      			</div>
      			</div>
      			<div className="row">
      				<span className="input_name">类 型</span>
	      			<div className="input_wrap">
	      				<span className="tab_wrap">
		      				<input type="radio" name="class_tab" value="all" defaultChecked="checked"/>
		      				<span>全部</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="class_tab" value="1"/>
		      				<span>休闲</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="class_tab" value="2" />
		      				<span>初级</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="class_tab" value="3" />
		      				<span>进阶</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="class_tab" value="4" />
		      				<span>高深</span>
	      				</span>
	      			</div>
      			</div>
      			<div className="row">
      				<span className="input_name">节 日</span>
	      			<div className="input_wrap">
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="all" defaultChecked="checked"/>
		      				<span>全部</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="1"/>
		      				<span>国庆</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="2" />
		      				<span>圣诞</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="3" />
		      				<span>中秋</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="4" />
		      				<span>端午</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="5" />
		      				<span>五一</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="6" />
		      				<span>清明</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="7" />
		      				<span>春节</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="8" />
		      				<span>元旦</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="9" />
		      				<span>双休日</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="festival_tab" value="10" />
		      				<span>平日</span>
	      				</span>
	      			</div>
      			</div>
      			<div className="row">
      				<span className="input_name">价 格</span>
	      			<div className="input_wrap">
	      				<span className="tab_wrap">
		      				<input type="radio" name="price_tab" value="all" defaultChecked="checked"/>
		      				<span>全部</span>
	      				</span>
	      				<span className="tab_wrap">
		      				<input type="radio" name="price_tab" value="1"/>
		      				<span>0-500</span>
	      				</span>
	      				<span className="tab_wrap lg">
		      				<input type="radio" name="price_tab" value="2" />
		      				<span>500-1000</span>
	      				</span>
	      			</div>
      			</div>
      		</div>
      		<div className="operate_wrap">
      			<span className="title">活动展示方式</span>
      			<span className="input">
      				<input type="radio" name="operate_tab" value="1" defaultChecked="checked"/>
      				<span><em className="icon i-tw"></em>图文</span>
      			</span>
      			<span className="input">
      				<input type="radio" name="operate_tab" value="2" />
      				<span><em className="icon i-lb"></em>列表</span>
      			</span>
      		</div>
      	</div>
      </div>
    )
  }
})

module.exports = Screening
