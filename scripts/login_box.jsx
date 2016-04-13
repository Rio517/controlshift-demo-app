window.LoggedInDom = React.createClass({
  render: function(){
    var me = this.props.me;
    me.first_last = [me.first_name, me.last_name].join(' ');
    return(
      <li className="dropdown">
        <a className="dropdown-toggle nav-user" data-toggle="dropdown" href="#">
          <div className="tiny-avatar">
            <img alt="" className="profile-image custom-avatar" title="{me.first_last}" src={'https://www.gravatar.com/avatar/'+CryptoJS.MD5(me.email)+'?s=24'} />
          </div>
          <span className="user-name">{me.first_last}</span>&nbsp;
          <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
        </a>
        <ul className="dropdown-menu">
          <li><a id="nav-user-dropdowns-campaigns" href={'https://'+window.controlshiftDomain+'/my-campaigns'}>My Campaigns</a></li>
          <li className="divider"></li>
          <li><a id="nav-user-dropdowns-account" href={'https://'+window.controlshiftDomain+'/account'}>My Account</a></li>
          <li><a id="nav-user-dropdowns-logout" rel="nofollow" data-method="delete" href={'https://'+window.controlshiftDomain+'/users/sign_out'}>Log out</a></li>
        </ul>
      </li>
    );
  }
});

window.LoggedOutDom = React.createClass({
  render: function(){
    return(
      <li><a href={'https://'+window.controlshiftDomain+'/users/sign_in'} title="Log In">Log In</a></li>
    );
  }
});

window.LoginBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: 'https://'+window.controlshiftDomain+'/api/graph/me.json',
      dataType: 'jsonp'
    }).done(function(data) {
      this.setState({data: data});
    }.bind(this)).error(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));
  },
  render: function() {
    if(this.state.data.status == 'authenticated'){
      return(<LoggedInDom me={this.state.data.me}/>);
    }else{
      return(<LoggedOutDom />);
    }
  }
});