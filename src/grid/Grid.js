var React = require('react');
var ReactDOM = require('react-dom');

var EditButton = React.createClass({
  render() {
    return (<a {...this.props} href="#">Edit</a>);
  }
});

var Row = React.createClass({
  getInitialState() {
    console.log('initstate',this.props.data);
    return this.props;
  },

  componentDidMount() {
    document.addEventListener('click', this.collapseEditor, true);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.collapseEditor, true);
  },

  handleChange(e) {
    let data = {};
    for (k in this.state.data) {
      if (e.target.name === k) {
        data[k] = e.target.value;
      } else {
        data[k] = this.state.data[k]
      }
    }

    this.setState({
      data: data
    });
  },

  expandEditor() {
    this.setState({
      isEditing: true
    });
  },

  collapseEditor(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({
        isEditing: false
      });
    }
  },

  render() {
    let columns = [],
      data = this.state.data,
      col;

    for (let k in data) {
      if (this.state.isEditing) {
         col = (<input name={k} key={k} type="text" value={data[k]} onChange={this.handleChange} />);
      } else {
         col = data[k];
      }
      columns.push(col);
    }

    let editClass = this.state.isEditing? 'edit' : '';
    return (
      <div className={this.state.className + ' ' + editClass}>
        {columns}
        <EditButton className={editClass} onClick={this.expandEditor} />
      </div>
    );
  }
});

var Grid = React.createClass({
  getDefaultProps() {
    return {
      columns: []
    };
  },

  getInitialState() {
    return this.props;
  },

  createRow() {
    let rows = [].concat(this.state.rows); // Be aware of concat compatibility
    rows.unshift({id: 3331, image: 'urlaaa', name: '2', price: '3'});

    this.setState({
      rows: rows
    });
  },

  render() {
    let columns = this.props.columns.map(function(item, i){
      return (<span key={i}>{item.title}</span>);
    });

    let rows = this.state.rows.map(function(row, k){
      // Basic diff between rowsData/columnsData
      let data = {};
      for (let i=0; i<this.props.columns.length; i++) {
        let val = row[this.props.columns[i].name];
        if (val !== undefined) {
          data[this.props.columns[i].name] = val;
        }
      }

      return (<Row className="row" isEditing={false} data={data} />);
    }, this);

    return (
      <div>
        <a onClick={this.createRow} href="#">Create product</a>
        <div>{columns}</div>
        {rows}
      </div>
    );
  }
});

module.exports = Grid;
