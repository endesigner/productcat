var React = require('react');

var EditButton = React.createClass({
  render() {
    return (<a {...this.props} href="#">Edit</a>);
  }
});

module.exports = EditButton;
