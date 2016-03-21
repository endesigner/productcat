var React = require('react');
var ReactDOM = require('react-dom');

var EditButton = React.createClass({
  render() {
    return (<a {...this.props} href="#">Edit</a>);
  }
});

var Row = React.createClass({
  getInitialState() {
    return this.props;
  },

  componentDidMount() {
    document.addEventListener('click', this.collapseEditor, true);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.collapseEditor, true);
  },

  handleChange(e) {
    let actionField = this.props.columns.filter((column) => {
      if(column.name === e.target.name) return true;
    });
    let validator = actionField.pop().validator;

    let data = {};
    for (k in this.state.data) {
      if (e.target.name === k) {
        data[k] = e.target.value;
      } else {
        data[k] = this.state.data[k]
      }
    }

    this.setState({ data: data });
  },

  toggleEditor() {
    this.setState({
      isEditing: !this.state.isEditing
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

  remove() {
    this.props.onRemove(this.props.id);
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
    let removeButton = (<a onClick={this.remove} className="remove" href="#">Remove</a>);
    let editButton = (<EditButton className={editClass} onClick={this.toggleEditor} />);
    return (
      <div className={this.state.className + ' ' + editClass}>
        {columns}
        {this.state.isEditing? removeButton : null} {editButton}
      </div>
    );
  }
});


var RowCreator = React.createClass({
  componentWillMount() {
    this.inputs = [];
  },

  submit() {
    let data = {};
    this.inputs.map((input) => {
      data[input.name] = input.value;
    });

    this.props.onCreate(data);
  },

  render() {
    let columns = this.props.columns.map((column, i) => {
      return (<input key={column.name} name={column.name}  ref={(ref) => {this.inputs.push(ref)}} type="text" />)
    });

    let submit = (<a key="submit" onClick={this.submit} href="#">Ok</a>);
    columns.push(submit);

    return (
      <div>{columns}</div>
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
    rows.unshift(data);

    this.setState({ rows: rows });
  },

  removeRow(id) {
    let rows = this.state.rows.slice();
    rows = rows.filter((row) => {
      return row.id !== id;
    });

    this.setState({ rows: rows });
  },

  render() {
    let columns = this.props.columns.map(function(item, i){
      return (<span key={i}>{item.title}</span>);
    });
    columns.push(<span key="edit">Edit</span>);

    let rows = this.state.rows.map(function(row, k){
      // Basic diff between rowsData/columnsData
      let data = {};
      for (let i=0; i<this.props.columns.length; i++) {
        let val = row[this.props.columns[i].name];
        if (val !== undefined) {
          data[this.props.columns[i].name] = val;
        }
      }

      // Randomize the key to kill row reconciliation.
      return (<Row
        key={Math.random()}
        className="row"
        isEditing={false}
        id={row.id}
        data={data}
        columns={this.props.columns}
        onRemove={this.removeRow} />
      );
    }, this);

    let rowCreator = (<RowCreator columns={this.props.columns} onCreate={this.createRow} />);
    return (
      <div>
        <a onClick={this.toggleInputs} href="#">Create product</a>
        {this.state.showInputs? rowCreator : null}
        <div>{columns}</div>
        {rows}
      </div>
    );
  }
});

module.exports = Grid;
