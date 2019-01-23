import React from 'react';
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };
  
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }
  
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. take a copy of the existing state
    // - no direct edits on state - this is a mutation... no good
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;    
    this.setState({ fishes });
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // copy state, update state, set state
    const fishes = { ...this.state.fishes }
    fishes[key] = null;
    this.setState({ fishes });
  }

  
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = (key) => {
    // 1 Copy state
    const order = { ...this.state.order};
    // add or update the number in the order
    order[key] = order[key] + 1 || 1;
    // call setState to update our object
    this.setState({ order });
  }
  
  removeFromOrder = (key) => {
    // copy state, update state, set state
    const order = { ...this.state.order }
    delete order[key];
    this.setState({ order });
  }

  render() {
    return ( 
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Marketplace"/>   
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          {...this.state} />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes} 
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;