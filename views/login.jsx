var React = require('react');
var Layout = require('./layout');

var ErrorMessage = React.createClass({
  render: function() {
    return <div className="alert alert-danger" role="alert">{this.props.message}</div>;
  }
});


var Login = React.createClass({
  render: function() {

    var errorMessage;

    if(this.props.error) {
      errorMessage = <ErrorMessage message={this.props.error} />;
    }

    return (
      <Layout>

        <div className="container">

          <link rel="stylesheet" href="/stylesheets/signin.css" />

      <form className="form-signin" >
      {errorMessage}
        <h2 className="form-signin-heading">Please sign in</h2>
        <label for="emailAddress" className="sr-only">Email address</label>
        <input type="email" id="emailAddress" className="form-control" placeholder="Email address" required autofocus />
        <label for="password" className="sr-only">Password</label>
        <input type="password" id="password" className="form-control" placeholder="Password" required />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

        </div>

      </Layout>
    );
  }
})



module.exports = Login;