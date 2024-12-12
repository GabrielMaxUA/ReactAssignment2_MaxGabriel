import React, { Component } from "react";

/**
 * Row Component
 * Represents a single destination row in the reservation table
 * Displays the location name and its available time slots as checkboxes
 */
class Row extends Component {
  /**
   * Handles the toggling of reservation status for a time slot
   * Invoked when a checkbox is clicked
   * @param {string} timeSlot - The time slot to be toggled (e.g., "9am-12pm")
   */
  onToggle = (timeSlot) => {
    // Destructure item and toggle function from props
    const { item, toggle } = this.props;
    // Call the parent's toggle function with the current item and selected time slot
    toggle(item, timeSlot);
  };

  render() {
    // Destructure item from props to access location data
    const { item } = this.props;

    return (
      <tr>
        {/* Display the destination name */}
        <td className="locationName">
          {item.locationName}
        </td>

        {/* Time slots cell containing checkboxes */}
        <td>
          {/* Map through each time slot to create checkbox controls */}
          {item.timeSlots.map((slot) => (
            <label 
              key={slot.time}  // Unique key for React list rendering
              style={{ marginRight: "50px" }}  // Spacing between time slots
            >
              <input
                type="checkbox"
                checked={slot.booked}  // Controlled component - checkbox state
                onChange={() => this.onToggle(slot.time)}  // Handle checkbox clicks
                disabled={slot.booked}  // Prevent toggling already booked slots
              />
              {/* Display the time slot text next to checkbox */}
              {slot.time}
            </label>
          ))}
        </td>
      </tr>
    );
  }
}

export default Row;