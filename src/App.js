var React = require('react');
var Grid = require('./grid');

var App = React.createClass({
  render() {
    let columns = [
      {name: 'image', title: 'Image',
        validator: () => {
          return true;
        }
      },
      {name: 'name',  title: 'Product Name',
        validator: (v) => {
          return v? true : false;
        }
      },
      {name: 'price', title: 'Price',
        validator: (v) => {
          return (v > 0);
        }
      },
    ];

    let rows = [
      {id: 4, image: 'four', name: '2', price: '3'},
      {id: 1, image: 'two', name: '5', price: '6'},
      {id: 3, image: 'three', name: '5', price: '6'}
    ];

    return (
      <Grid key="grid" className="grid" columns={columns} rows={rows} />
    );
  }
});

module.exports = App;
