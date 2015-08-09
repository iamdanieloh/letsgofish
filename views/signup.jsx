var React = require('react');
var Layout = require('./layout');

var ErrorMessage = React.createClass({
  render: function() {
    return <div className="alert alert-danger" role="alert">{this.props.message}</div>;
  }
});

var SignUp = React.createClass({
  render: function() {
    var errorMessage;

    if(this.props.error) {
      errorMessage = <ErrorMessage message={this.props.error} />;
    }

    return (
      <Layout>
      <link rel="stylesheet" href="/stylesheets/signin.css" />

        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Sign Up</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/signup">
                {errorMessage}
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input type="email" className="form-control" id="emailAddress" placeholder="Email" name="emailAddress" defaultValue={this.props.emailAddress} />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
});

module.exports = SignUp;