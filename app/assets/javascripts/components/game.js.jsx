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
        $.each(data, function( key, value ) {
          that.state.friend_looks[key] = value;
        });
        that.setState({ friend_looks : that.state.friend_looks });
      }
    });
  },
  seenLooks : function(friend_key) {
    if ($.isEmptyObject(this.state.friend_looks)) {
      // console.log('ici');
      looks_to_see = this.props.looks;
    } else {
      looks_to_see = {};
      var that = this;
      $.each(that.state.friend_looks, function(key, value){
        // console.log('VALUE');
        // console.log(value["friend"]);
        // console.log('FRIEND');
        // console.log(friend_key);
        if (value["friend"] != friend_key) {
          var look_id = value["look_id"]
          looks_to_see[look_id] = that.props.looks[look_id];
        }
      });
    }
    return looks_to_see
  },
  // renderFriend : function() {
  //   var friends = Object.keys(this.props.friends)
  //   var friend_key = friends[Math.floor(Math.random() * friends.length )];
  //   return <Friend key={friend_key} index={friend_key} details={this.props.friends[friend_key]} ref='friend'/>
  // },
  // renderLook : function(friend_key) {
  //   var look_seen = Object.keys(this.props.friend_looks)
  //   var looks = Object.keys(this.props.looks)
  //   var look_key = looks[Math.floor(Math.random() *  looks.length)];
  //   return <Look key={look_key} index={look_key} details={this.props.looks[look_key]} ref='look'/>
  // },
  renderGameArea : function() {
    // select friend
    var friends = Object.keys(this.props.friends)
    var friend_key = friends[Math.floor(Math.random() * friends.length )];
    // select look
    var looks = Object.keys(this.seenLooks(friend_key));
    var look_key = looks[Math.floor(Math.random() *  looks.length)];
    console.log(look_key);
    return (
      <div className="game-area text-center">
        <Friend key={friend_key} index={friend_key} details={this.props.friends[friend_key]} ref='friend'/>
        <Look key={look_key} index={look_key} details={this.props.looks[look_key]} ref='look'/>
      </div>
    )
  },
  render : function(){
    return (
      <div className='game-wrapper'>
          {this.renderGameArea()}
        <div className="action-buttons">
          <Button action="ditch" submitChoice={this.submitChoice}/>
          <Button action="match" submitChoice={this.submitChoice}/>
        </div>
      </div>
    )
  }
});
