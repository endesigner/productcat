var React = require('react');

var RowCreator = React.createClass({
  componentWillMount() {
    this.inputs = {};
    this.errors = [];
    this.validators = {};

    this.props.columns.forEach((column) => {
      this.validators[column.name] = column.validator;
    });
  },

  submit() {
    let data = {};
    Object.keys(this.inputs).forEach((key) => {
      let input = this.inputs[key];
      let validator = this.validators[input.name];
      let result = validator(input.value);

      if (result) {
        data[input.name] = input.value;
      } else {
        let o = {};
        o[input.name] = true;
        this.errors.push(o);
      }
    });

    if (this.errors.length > 0) {
      this.setState({
        errors: this.errors
      }, () => { this.errors = []; });
    } else {
      this.props.onCreate(data);
    }
  },

  render() {
    let columns = this.props.columns.map((column) => {
      return (<input key={column.name} name={column.name} ref={(ref) => {
        this.inputs[column.name] = ref;
      }} type="text" />)
    });

    let submit = (<a key="submit" onClick={this.submit} href="#">Ok</a>);
    columns.push(submit);

    return (
      <div>{columns}</div>
    );
  }
});

module.exports = RowCreator;