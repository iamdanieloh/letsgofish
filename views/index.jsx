var React = require('react');
var Layout = require('./layout');



var Homepage = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>Welcome to LetsGoFish</h1>
      </Layout>
    );
  }
})



module.exports = Homepage;