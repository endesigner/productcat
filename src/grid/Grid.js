require('!style!css!sass!./Grid.scss');

var React = require('react');
var ReactDOM = require('react-dom');

var Row = require('../row');
var RowCreator = require('../row-creator');
var Button = require('../button');

var Grid = React.createClass({
  getDefaultProps() {
    return {
      columns: []
    };
  },

  getInitialState() {
    let state = { filterText: '' };
    state = Object.assign(state, this.props);
    return state;
  },

  toggleInputs() {
    this.setState({showInputs: !this.state.showInputs});
  },

  nextRowId() {
    // TODO Optimize id gen
    let id = 0;
    this.state.rows.map((row) => {
      if (!(row.id <= id)) {
        id = row.id;
      }
    });
    return ++id;
  },

  createRow(data) {
    this.toggleInputs();

    let rows = this.state.rows.slice();
    data['id'] = this.nextRowId();
    rows.push(data);

    this.setState({ rows: rows });
  },

  removeRow(id) {
    let rows = this.state.rows.slice();
    rows = rows.filter((row) => {
      return row.id !== id;
    });

    this.setState({ rows: rows });
  },

  updateRow(data) {
    let rows = this.state.rows.map((row) => {
      if (row.id === data.id) {
        return data;
      } else {
        return row;
      }
    });
    this.setState({ rows: rows });
  },

  filter(e) {
    this.setState({ filterText: e.target.value });
  },

  componentWillUpdate(_, nextState) {
    this.props.store(nextState.rows);
  },

  render() {
    let columns = this.props.columns.map(function(item, i){
      return (<span key={i}>{item.title}</span>);
    });
    columns.push(<span key="edit" className="edit">Edit</span>);

    let rows = this.state.rows.map(function(row, k){
      // Basic diff between rowsData/columnsData
      let data = {};
      for (let i=0; i<this.props.columns.length; i++) {
        let val = row[this.props.columns[i].name];
        if (val !== undefined) {
          data[this.props.columns[i].name] = val;
        }
      }

      let filter = this.state.filterText.trim().toLowerCase();
      if (row.name.trim().toLowerCase().indexOf(filter) === -1) {
        return;
      }

      return (<Row
        key={k}
        className="row"
        isEditing={false}
        id={row.id}
        data={data}
        columns={this.props.columns}
        onRemove={this.removeRow}
        onUpdate={this.updateRow}
        />
      );
    }, this);

    let rowCreator = (<RowCreator className="row-creator" columns={this.props.columns} onCreate={this.createRow} />);
    return (
      <div className={this.props.className}>
        <div className="controls">
          <div className="name">Product library</div>
          <div className="filter"><input type="text" placeholder="Type to filter rows by name..." onChange={this.filter} /></div>
          <Button className="create" onClick={this.toggleInputs}>Create product</Button>
        </div>
        <div className="content">
          <div className="header">{columns}</div>
          {this.state.showInputs? rowCreator : null}
          {rows}
        </div>
      </div>
    );
  }
});

module.exports = Grid;
