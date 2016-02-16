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
