require('!style!css!sass!./Row.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var EditButton = require('../edit-button');
//var RemoveButton = require('../remove-button');

var Row = React.createClass({
  componentWillMount() {
    this.errors = [];
    this.validators = {};

    this.props.columns.forEach((column) => {
      this.validators[column.name] = column.validator;
    });
  },

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
    let validator = this.validators[e.target.name];

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

  isValid() {
    this.errors = [];
    let data = this.state.data;
    Object.keys(data).forEach((key) => {
      let validator = this.validators[key];
      if (!validator(data[key])) {
        let o = {};
        o[key] = false;
        this.errors.push(o);
      }
    });

    return (this.errors.length === 0);
  },

  collapseEditor(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target)) && this.isValid()) {
      this.setState({
        isEditing: false
      }, this.update());
    }
  },

  remove() {
    this.props.onRemove(this.props.id);
  },

  update() {
    var copy = Object.assign({id: this.props.id}, this.state.data);
    this.props.onUpdate(copy);
  },

  render() {
    let columns = [],
      data = this.state.data,
      col;

    for (let k in data) {
      if (this.state.isEditing) {
        col = (<span><input name={k} key={k} type="text" value={data[k]} onChange={this.handleChange} /></span>);
      } else {
        col = /^(http|https)/.test(data[k])? <span><img key={k} src={data[k]} /></span> : data[k]
      }
      columns.push(col);
    }

    let editClass = this.state.isEditing? 'edit' : '';
    let removeButton = (<a onClick={this.remove} className="remove" href="#">Remove</a>);
    let editButton = (<EditButton className={editClass} onClick={this.toggleEditor} />);
    return (
      <div className={this.state.className + ' ' + editClass}>
        {columns}
        {this.state.isEditing? removeButton : null}
        {editButton}
      </div>
    );
  }
});

module.exports = Row;
