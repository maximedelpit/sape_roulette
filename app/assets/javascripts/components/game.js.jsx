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
    var token = this.refs["friend"].props.index;
    var name =  this.props.friends[token].name;
    var look = this.refs["look"].props.index;
    var that = this;
    $.ajax({
      type: 'POST',
      url: Routes.upvote_games_path({ format: 'json' }),
      data: { games: {action : action, friend: name, look_id: look}},
      dataType: 'json',
      success: function(data) {
        $.each(data, function( key, value ) {
          that.state.friend_looks[key] = value;
        });
        that.setState({ friend_looks : that.state.friend_looks });
      }
    });
  },
  seenLooks : function(friend_key) {
    if ($.isEmptyObject(this.state.friend_looks)) {
      looks_to_see = Object.keys(this.state.looks);
    } else {
      looks_to_see = Object.keys(this.state.looks);
      var that = this;
      $.each(that.state.friend_looks, function(key, value){
        if (value["friend"] === that.state.friends[friend_key].name) {
          var look_id = value["look_id"]
          looks_to_see.splice($.inArray(look_id, looks_to_see),1);
        }
      });
    }
    return looks_to_see
  },
  renderGameArea : function() {
    // select friend => NB => ideally in the  game we should not select friends who have seen every looks
    var friends = Object.keys(this.props.friends)
    var friend_key = friends[Math.floor(Math.random() * friends.length )];
    // select look
    var looks = this.seenLooks(friend_key);
    var look_key = looks[Math.floor(Math.random() *  looks.length)];
    return (
      <div id="game-area text-center">
        <Friend key={friend_key} index={friend_key} details={this.props.friends[friend_key]} ref='friend'/>
        <Look key={look_key} index={look_key} details={this.props.looks[look_key]} ref='look'/>
      </div>
    )
  },
  render : function(){
    return (
      <div className='game-wrapper col-xs-10 col-xs-offset-1'>
        <h1 className="game-title text-center">Sape Roulette</h1>
          {this.renderGameArea()}
        <div className="action-buttons col-xs-12">
          <Button action="ditch" submitChoice={this.submitChoice}/>
          <Button action="match" submitChoice={this.submitChoice}/>
        </div>
      </div>
    )
  }
});
