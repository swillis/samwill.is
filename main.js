import React from 'react';
import ReactDOM from 'react-dom';

var Slide = React.createClass({
	render: function() {
		return (
			<div></div>
		)
	}
})

var Page = React.createClass({
  render: function() {
    return (
      <div>Hello</div>
    );
  }
});

ReactDOM.render(
  <Page />,
document.getElementById('page')
);
