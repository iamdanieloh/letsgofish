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
      <div className="jumbotron">
      <div className="container">
      <h1>Lets Go Fish</h1>
      <div className="panel panel-default">
      <div className="panel-heading">
      <h3 className="panel-title">Where are we fishing today?</h3>
      </div>
      <div className="panel-body">
      {errorMessage}
      <form method="post" action="/location">
      <div className="form-group">
      <input className="btn btn-primary" type="submit" value="Matapeake" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Romancoke" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Annapolis" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Fort Smallwood Park" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Point Lookout" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Sandy Point" id="name" name="name"></input>
      <input className="btn btn-primary" type="submit" value="Choptank Pier" id="name" name="name"></input>

      </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      </Layout>
      );
}
})



module.exports = Homepage;