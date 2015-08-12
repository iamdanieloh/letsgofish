var React = require('react');
var Layout = require('./layout');


var Posts = React.createClass({
        render: function() {
          return (
            <tr className="message">
                <td className="content">UserName</td>
                <td className="content">{this.props.user_post}</td>
                <td className="content">TimeStamp</td>
            </tr>
          )
        }
      });

var UserPosts = React.createClass({
    render: function() {
        var userPosts = this.props.posts.map(function(posts){
            return <Posts {...posts} />;
        })
        return (

            <table className="table messages">
                <tbody>
                    {userPosts}
                </tbody>
            </table>

         )
    }
})


var Location = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>{this.props.title}</h1>
        <h4>Body of Water: <i>{this.props.water}</i></h4>
        <br />
        <img src={this.props.icon} />
        <br />
        <b>{this.props.time}</b>
        <br />
        Current weather in {this.props.location} is {this.props.temp} <i>fahrenheit</i> and {this.props.weather}.
        <br />
        Low Tide@  {this.props.low_one}
        <br />
        High Tide@  {this.props.high_one}
        <br />
        Low Tide@  {this.props.low_two}
        <br />
        High Tide@  {this.props.high_two}
        
        <div className="page-header">
        <h4>Posts for {this.props.title}</h4>
        <UserPosts posts={this.props.posts} />
         </div>
      </Layout>
    );
  }
})



module.exports = Location;