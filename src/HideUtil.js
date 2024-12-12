import React, { Component } from 'react';

/**
 * HideUtil Component
 * A reusable checkbox component that toggles visibility of content
 * Uses Bootstrap form-check styling for consistent appearance
 */
class HideUtil extends Component {
  render() {
    // Destructure props for cleaner syntax and better readability
    const { description, isBooked, call } = this.props;

    return (
      // Bootstrap form-check container for checkbox styling
      <div className="form-check">
        {/* Checkbox input element */}
        <input 
          className="form-check-input"  // Bootstrap styling for checkboxes
          type="checkbox"
          checked={isBooked}  // Controlled component - state managed by parent
          onChange={(e) => call(e.target.checked)}  // Pass checked state to parent
        />
        {/* Label for the checkbox */}
        <label className="form-check-label">
          {description}  
        </label>
      </div>
    );
  }
}

/**
 * Props:
 * @property {string} description - Text to display in the checkbox label
 * @property {boolean} isBooked - Current checked state of the checkbox
 * @property {function} call - Callback function to handle state changes
 */

export default HideUtil;