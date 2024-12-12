import Header from './Header';
import React, { Component } from 'react';
import Row from './Row';
import AddUtil from './AddUtil';
import HideUtil from './HideUtil';
import './App.css';

/**
 * Main App component that manages the reservation system
 * Handles all locations, their time slots, and booking status
 */
class App extends Component {
  // Initialize component with state
  constructor(props) {
    super(props)
    this.state = {
      // Array of locations with their time slots
      locations: this.getInitialLocations(),
      // Controls visibility of booked destinations table
      showBooked: true
    };
  }

  /**
   * Retrieves initial location data
   * First attempts to load from localStorage, falls back to default data if none exists
   * @returns {Array} Array of location objects with time slots
   */
  getInitialLocations = () => {
    try {
      // Attempt to retrieve saved data from localStorage
      const savedLocations = localStorage.getItem("reservastions");
      const parsedData = savedLocations ? JSON.parse(savedLocations) : null;
      // If valid array data exists, use it
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
    catch (error) {
      console.error("Error getting data", error);
    }

    // Default data structure if no saved data exists
    return [
      {
        locationName: "Grand Canyon",
        timeSlots: [
          { time: "9am-12pm", booked: false },
          { time: "12pm-3pm", booked: false },
          { time: "3pm-6pm", booked: false },
        ],
      },
      {
        locationName: "CN Tower",
        timeSlots: [
          { time: "9am-12pm", booked: false },
          { time: "12pm-3pm", booked: false },
          { time: "3pm-6pm", booked: false },
        ],
      },
    ];
  }

  /**
   * Lifecycle method that runs after component mounts
   * Loads saved reservation data from localStorage if available
   */
  componentDidMount() {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        // Update state with saved data if valid
        if (Array.isArray(parsedData)) {
          this.setState({ locations: parsedData });
        }
      }
    }
    catch (error) {
      console.error("Failed to load data", error);
    }
  }

  /**
   * Lifecycle method that runs after each update
   * Saves location data to localStorage when it changes
   * @param {Object} prevProps - Previous props
   * @param {Object} prevState - Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    // Only save if locations have changed
    if (prevState.locations !== this.state.locations) {
      localStorage.setItem("reservations", JSON.stringify(this.state.locations));
    }
  }

  /**
   * Creates a new location with default time slots
   * @param {string} location - Name of the new location
   */
  createLocation = (location) => {
    // Check if location already exists
    if (!this.state.locations.find(item => item.locationName === location)) {
      // Create new location with default time slots
      const updatedLocations = [
        ...this.state.locations,
        {
          locationName: location,
          timeSlots: [
            { time: "9am-12pm", booked: false },
            { time: "12pm-3pm", booked: false },
            { time: "3pm-6pm", booked: false },
          ],
        },
      ];
      this.setState({ locations: updatedLocations });
    }
  }

  /**
   * Toggles the booking status of a specific time slot
   * @param {Object} reservation - Location object containing the time slot
   * @param {string} timeSlot - Time slot to toggle
   */
  toggleReservation = (reservation, timeSlot) => {
    const updatedLocations = this.state.locations.map(item =>
      item.locationName === reservation.locationName ? {
        ...item,
        timeSlots: item.timeSlots.map(slot =>
          slot.time === timeSlot ? { ...slot, booked: !slot.booked } : slot
        ),
      } : item
    );
    this.setState({ locations: updatedLocations });
  }

  /**
   * Creates table rows for booked/unbooked reservations
   * @param {boolean} bookedValue - Whether to show booked or unbooked slots
   * @returns {Array} Array of table row elements
   */
  reservationRow = (bookedValue) =>
    this.state.locations.flatMap(item =>
      item.timeSlots
        .filter(slot => slot.booked === bookedValue)
        .map(slot => (
          <tr key={`${item.locationName} - ${slot.time}`}>
            <td>{item.locationName}</td>
            <td>{slot.time}</td>
          </tr>
        ))
    );

  /**
   * Renders the component
   * Displays header, location input, main table of locations,
   * and optional table of booked destinations
   */
  render() {
    const { locations, showBooked } = this.state;
    return (
      <div>
        {/* Header showing number of available destinations */}
        <Header locations={locations} />
        
        {/* Input section for adding new locations */}
        <div className="m-3">
          <AddUtil call={this.createLocation} />
        </div>
        
        <div className="container-fluid">
          {/* Main table showing all locations and their time slots */}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Destinations</th>
                <th>Time Slots</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((item) => (
                <Row
                  key={item.locationName}
                  item={item}
                  toggle={this.toggleReservation}
                />
              ))}
            </tbody>
          </table>

          {/* Toggle for showing/hiding booked destinations */}
          <div className="bg-secondary text-white text-center p-2">
            <HideUtil
              description="Booked Destinations and time"
              isBooked={showBooked}
              call={(checked) => this.setState({ showBooked: checked })}
            />
          </div>

          {/* Conditional render of booked destinations table */}
          {showBooked && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Destinations</th>
                  <th>Time Slot</th>
                </tr>
              </thead>
              <tbody>{this.reservationRow(true)}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default App;