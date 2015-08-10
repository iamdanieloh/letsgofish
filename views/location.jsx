var React = require('react');
var Layout = require('./layout');


var UserPosts = React.createClass({
  render: function() {
    return <div>{this.props.post}</div>;
  }
});


var Location = React.createClass({
  render: function() {


    return (
      <Layout>
        <h1>{this.props.title}</h1>
        <h4>Body of Water: <i>{this.props.water}</i></h4>
        <br />
        <img src={this.props.icon} />
        <br />
        <b>{this.props.time}</b>
        <br />
        Current weather in {this.props.location} is {this.props.temp} <i>fahrenheit</i> and {this.props.weather}.
        <br />
        Low Tide@  {this.props.low_one}
        <br />
        High Tide@  {this.props.high_one}
        <br />
        Low Tide@  {this.props.low_two}
        <br />
        High Tide@  {this.props.high_two}
        <div className="page-header">
        <h1><small>Posts for {this.props.body}</small></h1>
        </div>
        <p>{this.props.post}</p>
      </Layout>
    );
  }
})



module.exports = Location;