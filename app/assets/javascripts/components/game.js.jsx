var Game = React.createClass({
  getInitialState : function(){
    return {
      looks : {},
      friends: {},
      friend_looks : {}
    }
  },
  componentWillMount : function(){
    this.setState({ looks : this.props.looks,
                    friends : this.props.friends || {},
                    friend_looks : this.props.friend_looks || {}
                  });
  },
  submitChoice : function(action) {
    // retrieve friend name & look_id
    var friend = this.refs["friend"].props.index;
    var look = this.refs["look"].props.index;
    var that = this;
    $.ajax({
      type: 'POST',
      url: Routes.upvote_games_path({ format: 'json' }),
      data: { games: {action : action, friend: friend, look_id: look}},
      dataType: 'json',
      success: function(data) {
        console.log(data);
        $.each(data, function( key, value ) {
          that.state.friend_looks[key] = value;
        });
        that.setState({ friend_looks : that.state.friend_looks });
      }
    });
    // remove / replace Friend & look to others
  },
  renderFriend : function() {
    var friends = Object.keys(this.props.friends)
    var friend_key = friends[Math.floor(Math.random() * friends.length )];
    return <Friend key={friend_key} index={friend_key} details={this.props.friends[friend_key]} ref='friend'/>
  },
  renderLook : function() {
    var looks = Object.keys(this.props.looks)
    var look_key = looks[Math.floor(Math.random() *  looks.length)];
    return <Look key={look_key} index={look_key} details={this.props.looks[look_key]} ref='look'/>
  },
  render : function(){
    return (
      <div className='game-wrapper col-xs-10 col-xs-offset-1'>
        <h1 className="game-title text-center">Sape Roulette</h1>
        <div id="game-area text-center">
          {this.renderFriend()}
          {this.renderLook()}
          <div className="action-buttons col-xs-12">
            <Button action="ditch" submitChoice={this.submitChoice}/>
            <Button action="match" submitChoice={this.submitChoice}/>
          </div>
        </div>
      </div>
    )
  }
});

var Friend = React.createClass({
  render : function(){
    var details = this.props.details
    return (
      <div className="col-xs-6 text-center">
        <div className="name">{details.name}</div>
        <div className="img">
          <img alt={details.name} src={details.url}/>
        </div>
      </div>
    )
  }
});

var Look = React.createClass({
  render : function(){
    var details = this.props.details
    return (
      <div className="col-xs-6 text-center">
        <div className="name">{details.name}</div>
        <div className="img">
          <img alt={details.name} src={details.url}/>
        </div>
      </div>
    )
  }
});

var Button = React.createClass({
  triggerAction : function(event) {
    event.preventDefault();
    var action = this.props.action;
    this.props.submitChoice(action);
  },
  render: function(){
    return(
      <div className="col-xs-6 text-center">
        <button className="btn btn-default btn-danger" onClick={this.triggerAction}>{this.props.action}</button>
      </div>
    )
  }
});
