window.LocationLookupForm = React.createClass({
  componentDidMount: function() {
    var input = this.refs[this.props.effortLookupRef];
    var autocomplete = new google.maps.places.Autocomplete(input, {});
    autocomplete.addListener('place_changed', this.props.onPlaceChange.bind(null, autocomplete));
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function(){
    return(
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Lookup Petitions Near You</legend>

          <div className="form-group">
            <label className="sr-only control-label" for={this.props.effortLookupRef}>Enter your address or a nearby landmark</label>
            <input ref={this.props.effortLookupRef} name={this.props.effortLookupRef} type="text" placeholder="Enter your address or a nearby landmark" className="form-control input-md" />
          </div>

        </fieldset>
      </form>
    );
  }
});

window.PetitionPending = React.createClass({
  render: function(){
    var petition = this.props.petition;
    return(
      <div className="row">
        <div className="col-md-12">
          <h2>
            <a href={petition.create_petition_url}>{petition.name}</a><br/>
            <small>{petition.location}</small>
          </h2>
          <p>No petitions for this location have been created yet. <a href={petition.create_petition_url} title="Create one now!">Create one now!</a></p>
        </div>
      </div>
    )
  }
});

window.PetitionCreated = React.createClass({
  render: function(){
    var petition = this.props.petition;
    return(
      <div className="row">
        <div className="col-md-12">
          <h2>
            <Link to={`petitions/${petition.petition.slug}/`}>{petition.petition.title}</Link><br/>
            <small>{petition.location}</small>
          </h2>
        </div>
      </div>
    )
  }
});

window.PetitionList = React.createClass({
  render: function(){
    var petition = this.props.petition;
    var petitionNodes = this.props.petitions.map(function(petition) {
      if(petition.status == 'target_petition_created'){
        return(<PetitionCreated petition={petition} key={petition.slug} />);
      }else if(petition.status == 'target_awaiting_petition'){
        console.log(petition);
        return(<PetitionPending petition={petition} key={petition.slug} />);
      }else{
        console.log('Error rendering petition with status: ', petition.status);
        return(null);
      }
    });
    return (
      <div className="petitionList">
        {petitionNodes}
      </div>
    );
  }
});

window.PetitionSearch = React.createClass({
  getInitialState: function() {
    return {petitions: window.petitionResults};
  },
  lookupPetitions: function(lookupData){
    var lookupUrl = 'https://'+window.controlshiftDomain+'/efforts/'+window.targetEffort+'/'+'near.json';
    $.ajax({
      url: lookupUrl,
      dataType: 'jsonp',
      data: lookupData
    }).done(function(data) {
      var petitions = [data.closest_target].concat(data.other_targets)
      window.petitionResults = petitions;
      this.setState({petitions: petitions});
    }.bind(this)).fail(function(xhr, status, err) {
      console.log(lookupUrl, status, err.toString());
    }.bind(this));
  },
  handlePlaceChange: function(autocomplete) {
    var geometry = autocomplete.getPlace().geometry;
    if(geometry)
      this.lookupPetitions({location: {latitude: geometry.location.lat, longitude: geometry.location.lng}});
  },
  render: function() {
    return (
    <div className="petition-lookup">
      <LocationLookupForm effortLookupRef="effort-lookup" onPlaceChange={this.handlePlaceChange} />
      <PetitionList petitions={this.state.petitions} />
    </div>
    );
  }
});






