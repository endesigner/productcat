var React = require('react');
var Grid = require('./grid');

var App = React.createClass({
  render() {
    let columnsData = [
      {name: 'image', title: 'Image'},
      {name: 'name',  title: 'Product Name'},
      {name: 'price', title: 'Price'},
      {name: 'edit',  title: 'Edit'}
    ];

    let rowsData = [
      {id: 1, image: 'url', name: '2', price: '3'},
      {id: 2, image: 'url', name: '5', price: '6'},
      {id: 3, image: 'url4', name: '5', price: '6'}
    ];

    // TODO: Handle no-rows state
    return (
      <Grid key="grid" className="grid" columns={columnsData} rows={rowsData} />
    );
  }
});

module.exports = App;
