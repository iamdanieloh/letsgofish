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
              <h2 className="panel-title">Lets Brag!</h2>
            </div>
            <div className="panel-body">
              <form action="/user_post" encType="multipart/form-data" method="post">

                <div className="form-group">
                  <input list="tag" name="tag" />
                  <datalist id="tag">
                      <option value="Matapeake" ></option>
                      <option value="Romancoke" ></option>
                      <option value="Annapolis" ></option>
                      <option value="Fort Smallwood Park" ></option>
                      <option value="Point Lookout" ></option>
                      <option value="Sandy Point" ></option>
                      <option value="Choptank Pier" ></option>
                  </datalist>

                  <br />
                  <label for="userPost">Start braggin here!</label>
                    <textarea className="form-control" name="userPost" id="userPost" cols="50" rows="5">
                      
                    </textarea>                
                </div>
                <div className="form-group">
                  <label for="upload">Upload Photo</label>
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