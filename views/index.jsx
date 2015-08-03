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
        <h1>Welcome to LetsGoFish</h1>
        <br />
          <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Lets Search for a Fishing Spot!</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/">
                {errorMessage}
                <div className="form-group">
                  <input type="text" className="form-control" id="location" placeholder="Fish Where?" name="location" defaultValue={this.props.emailAddress} />
                </div>
                <button type="submit" className="btn btn-success">Search</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
})



module.exports = Homepage;