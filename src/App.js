require('!style!css!sass!./App.scss');

var React = require('react');
var Grid = require('./grid');

var App = React.createClass({
  getInitialState() {
    // Default rows
    return {
      rows: [
        {id: 4, image: 'https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg', name: '2', price: '3'},
        {id: 1, image: 'two', name: '5', price: '6'},
        {id: 3, image: 'three', name: '5', price: '6'}
      ]
    };
  },

  componentWillMount() {
    // Populate rows from localStorage
    let rows = localStorage.getItem('rows');

    if (rows !== null) {
      rows = JSON.parse(rows);
    } else {
      rows = this.state.rows;
    }

    this.setState({rows: rows});
  },

  handleStore(data) {
    //TODO Optimize storage calls
    localStorage.setItem('rows', JSON.stringify(data));
  },

  render() {
    let columns = [
      {name: 'image', title: 'Image',
        validator: (v) => {
          return /\.(jpg|jpeg|png)$/.test(v)
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

    let rows = this.state.rows;
    return (
      <Grid key="grid" className="grid" columns={columns} rows={rows} store={this.handleStore} />
    );
  }
});

module.exports = App;
