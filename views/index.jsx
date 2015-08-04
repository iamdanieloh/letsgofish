var React = require('react');
var Layout = require('./layout');

var ErrorMessage = React.createClass({
  render: function() {
    return <div className="alert alert-danger" role="alert">{this.props.message}</div>;
  }
});


var Homepage = React.createClass({
  render: function() {
  	var errorMessage;

    if(this.props.error) {
      errorMessage = <ErrorMessage message={this.props.error} />;
    }

    

    return (
      <Layout>
          <div className="container">
          <h1>Welcome to LetsGoFish</h1>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Where are we fishing today?</h3>
            </div>
            <div className="panel-body">
            {errorMessage}
              <form method="post" action="/location">
                <div className="form-group">
                <input class="btn btn-default" type="submit" value="Ocean City Fishing Pier" id="name" name="name"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
})



module.exports = Homepage;