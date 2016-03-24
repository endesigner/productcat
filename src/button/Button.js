var React = require('react');

var Button = React.createClass({
  render() {
    return (<a {...this.props} href="#">{this.props.children}</a>);
  }
});

module.exports = Button;
