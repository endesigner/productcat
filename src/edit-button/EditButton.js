var React = require('react');

var EditButton = React.createClass({
  render() {
    return (<span><a {...this.props} href="#">Edit</a></span>);
  }
});

module.exports = EditButton;
