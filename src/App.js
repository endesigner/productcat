require('!style!css!sass!./App.scss');

var React = require('react');
var Grid = require('./grid');

var App = React.createClass({
  getInitialState() {
    // Default rows
    return {
      rows: [
        {id: 1, image: 'assets/chocolate.png', name: 'Chocolate cupkake', price: '7,90'},
        {id: 2, image: 'assets/strawberry.png', name: 'Strawberry cupkake', price: '13,90'},
        {id: 3, image: 'assets/raspberry.png', name: 'Raspberry cupkake', price: '5.50'},
        {id: 3, image: 'assets/healthy.png', name: 'Healthy cupkake', price: '5.50'},
        {id: 4, image: 'assets/kitten.jpeg', name: 'Kittie', price: '3'},
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
          return true;
          //return /\.(jpg|jpeg|png)$/.test(v)
        }
      },
      {name: 'name',  title: 'Product Name',
        validator: (v) => {
          return v? true : false;
        }
      },
      {name: 'price', title: 'Price',
        validator: (v) => {
          return (parseInt(v.replace(',','')) > 0);
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
