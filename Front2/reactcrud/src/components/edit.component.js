import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangecomplete_check = this.onChangecomplete_check.bind(this);
    this.onChangepriority = this.onChangepriority.bind(this);

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:'',
      complete_check:'',
      priority:''
      
    }
  }

  componentDidMount() {
      axios.get('http://http://ec2-13-125-35-93.ap-northeast-2.compute.amazonaws.com:4000/business/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name, 
                business_name: response.data.business_name,
                business_gst_number: response.data.business_gst_number,
                complete_check:response.data.complete_check });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  
  onChangecomplete_check(e) {
    this.setState({
      complete_check: e.target.value
    })
  }
  onChangepriority(e){
    this.setState({
        priority:e.target.value
    });
}

  onSubmit(e) {
    e.preventDefault();
    var a =new Date(this.state.business_gst_number).getTime();
    var now=new Date().getTime();
    var distance = a-now;
    var input_t =''
    var d=Math.floor(distance/(1000*60*60*24));
    var h=Math.floor(distance%(1000*60*60*24)/(1000*60*60));
    if(distance < 0 ){
        input_t="기간 만료";
        }else{
      if(d===0){
          input_t="D-day";
      }
      else{
        input_t="D-"+d;
     }
      }
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: input_t,
      complete_check: this.state.complete_check,
      priority:this.state.priority
    };
    axios.post('http://ec2-13-125-35-93.ap-northeast-2.compute.amazonaws.com:4000//business/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                    <label>Text: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>DeadLine:   ex)2019-08-15 </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <label>Are you Complete?   ex)Yes or No </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.complete_check}
                      onChange={this.onChangecomplete_check}
                      />
                </div>
                <div className="form-group">
                    <label>priority   ex)High or Medium or Low </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.priority}
                      onChange={this.onChangepriority}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}