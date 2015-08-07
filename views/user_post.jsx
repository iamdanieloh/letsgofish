var React = require('react');
var Layout = require('./layout');


var UserPost = React.createClass({
  render: function() {

    return (
      <Layout>
      <link rel="stylesheet" href="/stylesheets/signin.css" />

        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Sign Up</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/user_post" enctype="multipart/form-data">
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input type="email" className="form-control" id="emailAddress" placeholder="Email" name="emailAddress" defaultValue={this.props.emailAddress} />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" />
                </div>
                <div className="form-group">
                  <label for="photo">Upload Photo</label>
                  <input type="file" name="upload" />
                </div>
                <button type="submit" className="btn btn-success">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
});

module.exports = UserPost;