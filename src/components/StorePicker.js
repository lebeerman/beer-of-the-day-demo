import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef(); // (TODO) - Lookup createRef()
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
    console.log('Routing? ', this, event.value);
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    // Binding = onSubmit={this.gotToStore.bind(this)} *Performance Concerns!: these methods render multiple components
    // built in methods run with React.Component
    // comp methods run 
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
  // When es6 happened - createClass used to contain the context,
  // Now 'extends' syntax does not implicitly bind context.
  
  // Multiple ways to bind this:

  // constructor(){
  //   super(); 
  // creates the base component then add the extra goods
  // to the base React.Component, downside - gets long/redundant

  //   this.gotToStore = this.gotToStore.bind(this); // used for binding context for methods
  // }

  // Note - binding in the constructor keeps 1 instance of the component, and binds context 
  // Adding properties as anon functs implicitly binds this. 