require('!style!css!sass!./Row.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('../button');

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

  handleKeyDown(e) {
    if(e.keyCode === 13 && this.isValid()) {
      this.toggleEditor()
    }
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
        col = (
          <span key={k}>
            <input name={k} type="text" value={data[k]} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
          </span>
        );
      } else {

        if (k === 'price') {
           col = '€' + data[k]
        } else {
          col = /\.(jpg|jpeg|png)$/.test(data[k])? <span key={k}><img src={data[k]} /></span> : data[k];
        }
      }
      columns.push(col);
    }

    let editClass = this.state.isEditing? 'edit' : '';
    let removeButton = (<Button className="remove" onClick={this.remove}>Remove</Button>);
    let editButton = (<Button className={editClass} onClick={this.toggleEditor}>Edit</Button>);
    return (
      <div className={this.state.className + ' ' + editClass}>
        {columns}
        <span className="controls">{this.state.isEditing? removeButton : null}{editButton}</span>
      </div>
    );
  }
});

module.exports = Row;
