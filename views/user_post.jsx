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
              <h3 className="panel-title">Lets Brag</h3>
            </div>
            <div className="panel-body">
              <form method="post" action="/user_post" enctype="multipart/form-data">
                
                <div className="form-group">
                  <label for="userPost">Post</label>
                  <br />
                    <textarea className="form-control" name="userPost" cols="50" rows="5">
                        Brag here...
                    </textarea>                
                </div>
                <div className="form-group">
                  <label for="photo">Upload Photo</label>
                  <input type="file" name="upload" />
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

module.exports = UserPost;