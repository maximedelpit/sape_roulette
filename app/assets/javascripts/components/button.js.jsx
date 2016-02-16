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
