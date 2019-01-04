import React, { Component } from 'react';


export default class RefuseTypeButtonsRadio extends Component {
  render() {
    return (

      <div className="radio-toolbar"
           id="radio-toolbar-type"
           onChange={this.props.refuseTypeSubmit}
           >

          <input type="radio"
                 className="radio-type"
                 id="allcollected"
                 name="radioType"
                 value="all trash/recycling/compost"
                 onChange={this.props.refuseTypeSubmit}
                 defaultChecked
                 />
          <label for="allcollected">all trash/recycling/compost</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="refusetonscollected"
                 name="radioType"
                 value="trash"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="refusetonscollected">trash</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="papertonscollected"
                 name="radioType"
                 value="paper & cardboard"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="papertonscollected">paper & cardboard</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="mgptonscollected"
                 name="radioType"
                 value="metal/glass/plastic"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="mgptonscollected">metal/glass/plastic</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="resorganicstons"
                 name="radioType"
                 value="brown bin organics"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="resorganicstons">brown bin organics</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="leavesorganictons"
                 name="radioType"
                 value="leaves"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="leavesorganictons">leaves</label><br/>

          <input type="radio"
                 className="radio-type"
                 id="xmastreetons"
                 name="radioType"
                 value="christmas trees"
                 onChange={this.props.refuseTypeSubmit}
                 />
          <label for="xmastreetons">christmas trees</label><br/>

      </div>

    );
  }
}
