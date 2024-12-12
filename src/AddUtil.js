import React, { Component } from 'react';  // Remove useState since it's not used in class component

/**
 * AddUtil Component
 * Provides an input field and button to add new destinations to the reservation system
 * Manages its own state for the input field value
 */
class AddUtil extends Component {
  /**
   * Initialize component with state
   * @param {Object} props - Component props
   */
  constructor(props) {
    super(props);
    this.state = {
      newItemText: ''  // State to store input field value
    };
  }

  /**
   * Updates state when input field value changes
   * @param {Object} event - Input change event object
   */
  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  /**
   * Handles the creation of a new location
   * Calls parent component's function with input value
   * Clears input field after successful creation
   */
  createLocation = () => {
    if (this.state.newItemText !== '') {  // Only proceed if input is not empty
      this.props.call(this.state.newItemText);  // Call parent's function with location name
      this.setState({ newItemText: '' });  // Reset input field
    }
  }

  render() {
    return (
      <div className="my-1">
        {/* Input field for new location name */}
        <input 
          className="form-control"  // Bootstrap class for styling
          value={this.state.newItemText}  // Controlled input
          onChange={this.updateNewTextValue}  // Handle input changes
        />
        {/* Add button with Bootstrap styling */}
        <button 
          className="btn btn-primary mt-1"  // Bootstrap classes for styling
          onClick={this.createLocation}  // Handle button clicks
        >
          Add
        </button>
      </div>
    );
  }
}

export default AddUtil;