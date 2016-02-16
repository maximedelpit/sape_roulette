var Friend = React.createClass({
  render : function(){
    var details = this.props.details
    return (
      <div className="game-box game-friend text-center">
        <div className="img">
          <img alt={details.name} src={details.url}/>
        </div>
          <div className="name">{details.name}</div>
      </div>
    )
  }
});
