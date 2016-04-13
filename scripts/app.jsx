// Let's make it a little easier to use react's UDM versions
window.Router = ReactRouter.Router;
window.Route = ReactRouter.Route;
window.Link = ReactRouter.Link;
window.Redirect = ReactRouter.Redirect;
window.IndexRoute = ReactRouter.IndexRoute;
window.useRouterHistory = ReactRouter.useRouterHistory;
window.createHistory = History.createHistory;
// end UDM

window.NavBar = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-inverse navbar-static-top clearfix">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">ControlShift Example App</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <LoginBox />
            </ul>
          </div>
        </div>
    </nav>
    );
  }
});

window.App = React.createClass({
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
});