var React = require('react');

var Layout = React.createClass({
  render: function() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.pageTitle || 'Lets Go Fish!'}</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/stylesheets/bootflat/css/bootflat.css" />
          <link rel="stylesheet" href="/stylesheets/cover.css" />
        </head>
        <body>
          <div className="site-wrapper">

            <div className="site-wrapper-inner">

              <div className="cover-container">

                <div className="masthead clearfix">
                  <div className="inner">
                    <a href="/"><h4 className="masthead-brand">Lets Go Fish!</h4></a>
                    <nav>
                      <ul className="nav masthead-nav">
                        <li><a href="/"></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
        
          {this.props.children}


          <div className="mastfoot">
            <div className="inner">
              <a href="http://madewithloveinbaltimore.org">Made with &hearts; in Baltimore</a>, by <a href="https://twitter.com/danieloh84">@danieloh84</a>.
            </div>
          </div>

        </div>

      </div>

    </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        </body>
      </html>
    );
  }
})

module.exports = Layout;