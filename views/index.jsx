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



      
      <div className="inner cover">
      <h1 className="cover-heading">Where are we fishing today?</h1>
      <p className="lead">
      {errorMessage}
      <form method="post" action="/location">
      <div >
      <input className="btn btn-primary btn-block" type="submit" value="Matapeake" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Romancoke" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Annapolis" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Fort Smallwood Park" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Point Lookout" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Sandy Point" id="name" name="name"></input>
      <input className="btn btn-primary btn-block" type="submit" value="Choptank Pier" id="name" name="name"></input>
      </div>
      </form>
      </p>
      </div>




      </Layout>
      );
}
})



module.exports = Homepage;