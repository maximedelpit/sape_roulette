
var Look = React.createClass({
  render : function() {
    var details = this.props.details;
    return (
      <div className="game-box text-center">
        <div className="img">
          <img alt={details.name} src={details.url}/>
        </div>
      </div>
    )
  }
});
