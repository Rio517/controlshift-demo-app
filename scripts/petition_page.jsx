window.PetitionProgressBar = React.createClass({
  render: function(){
    if(this.props.progressPrecent > window.showProgressBarsAt){
      return(
        <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow={this.props.progressPrecent}
          aria-valuemin="0" aria-valuemax="100" style={'width:'+this.props.progressPrecent+'%'}>
            <span>{this.props.progressPrecent}% Complete</span>
          </div>
        </div>
      );
    }else{
      return(null);
    }
  }
})

window.PetitionFull = React.createClass({
  render: function(){
    var petition = this.props.petition;
    petition.progressPrecent = Math.round(this.props.signature_count/this.props.goal*100);
    return(
      <div>
        <small><Link to="/">&laquo; Back</Link></small>
        <h1>{petition.title}</h1>
        <PetitionProgressBar progressPrecent={petition.progressPrecent}/>

        <img src={petition.resized_image_url} className="pull-left" alt="" />
        <h2>Who</h2>
        <p>{petition.who}</p>
        <h2>Why</h2>
        <p>{petition.why}</p>
        <h2>What</h2>
        <p>{petition.what}</p>
      </div>
    );
  }
})

window.PetitionPage = React.createClass({
  getInitialState: function() {
    return {petition: {}};
  },
  componentDidMount: function(){
    var lookupUrl = 'https://'+window.controlshift_domain+'/petitions/'+this.props.params.slug+'.json';
    $.ajax({
      url: lookupUrl,
      dataType: 'jsonp'
    }).done(function(data) {
      this.setState({petition: data});
    }.bind(this)).fail(function(xhr, status, err) {
      console.error(lookupUrl, status, err.toString());
    }.bind(this));
  },
  render: function(){
    if(this.state.petition){
      return(<PetitionFull petition={this.state.petition} />);
    }else{
      return(null);
    }
  }
});
