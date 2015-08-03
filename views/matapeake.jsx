var React = require('react');
var Layout = require('./layout');





var Matapeake = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>Matapeak State Park</h1>
        <br />
        Current weather in {this.props.location} is {this.props.temp} <i>fahrenheit</i> and {this.props.weather}.
      </Layout>
    );
  }
})



module.exports = Matapeake;