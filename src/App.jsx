import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [vehicleData, setVehicleData] = useState(null);

    useEffect(() => {
        if (activeTab === 'vehicle-data') {
            axios.get('http://localhost:5000/vehicles')
                .then(response => setVehicleData(response.data))
                .catch(error => console.error('Error fetching vehicle data:', error));
        }
    }, [activeTab]);

    const switchTab = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="App">
            <header>
                <nav>
                    <h1>Dynamic GNSS-Based Tolling System</h1>
                    <ul>
                        <li><a href="#" onClick={() => switchTab('dashboard')}>Dashboard</a></li>
                        <li><a href="#" onClick={() => switchTab('vehicle-data')}>Vehicle Data</a></li>
                        <li><a href="#" onClick={() => switchTab('settings')}>Settings</a></li>
                        <li><a href="#" onClick={() => switchTab('reports')}>Reports</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => switchTab('dashboard')}>Dashboard</button>
                    <button className={`tab ${activeTab === 'vehicle-data' ? 'active' : ''}`} onClick={() => switchTab('vehicle-data')}>Vehicle Data</button>
                    <button className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => switchTab('settings')}>Settings</button>
                    <button className={`tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => switchTab('reports')}>Reports</button>
                </div>

                <div id="dashboard" className={`tab-content ${activeTab === 'dashboard' ? 'active' : ''}`}>
                    <div className="dashboard">
                        <div className="card">
                            <h2>Real-Time Map</h2>
                            <div className="map-container">
                                <MapContainer
                                    center={[51.505, -0.09]}
                                    zoom={13}
                                    style={{ height: '400px', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[51.505, -0.09]}>
                                        <Popup>A sample location</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <h2>Vehicle Info</h2>
                                <p><strong>Vehicle ID:</strong> VEH-001</p>
                                <p><strong>Current Location:</strong> Highway 101, Mile 52</p>
                                <p><strong>Speed:</strong> 65 mph</p>
                                <p><strong>Road Type:</strong> Highway</p>
                                <p><strong>Toll Charges:</strong> $5.25</p>
                            </div>
                            <div className="card">
                                <h2>Charging Stations</h2>
                                <ul>
                                    <li>Station A: Available</li>
                                    <li>Station B: 1 Spot Left</li>
                                    <li>Station C: Full</li>
                                </ul>
                            </div>
                            <div className="card">
                                <h2>Road Condition</h2>
                                <p>Excellent</p>
                                <small>Based on gyroscope data</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="vehicle-data" className={`tab-content ${activeTab === 'vehicle-data' ? 'active' : ''}`}>
                    <div className="card">
                        <h2>Vehicle Data</h2>
                        <input type="text" id="vehicle-search" placeholder="Search vehicles..." />
                        <button className="button" id="export-data">Export Data</button>
                        <table id="vehicle-table">
                            <thead>
                                <tr>
                                    <th>Vehicle ID</th>
                                    <th>Road Type</th>
                                    <th>Distance Traveled</th>
                                    <th>Fuel Consumption</th>
                                    <th>Toll Charges</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VEH-001</td>
                                    <td>Highway</td>
                                    <td>150 miles</td>
                                    <td>5.2 gal</td>
                                    <td>₹15.75</td>
                                    <td>2 min ago</td>
                                </tr>
                                <tr>
                                    <td>VEH-002</td>
                                    <td>Service Road</td>
                                    <td>75 miles</td>
                                    <td>3.1 gal</td>
                                    <td>₹7.50</td>
                                    <td>5 min ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reports Tab */}
                <div id="reports" className={`tab-content ${activeTab === 'reports' ? 'active' : ''}`}>
                    <div className="card">
                        <h2>Reports</h2>

                        <div className="report-filters">
                            <label htmlFor="report-type">Report Type:</label>
                            <select id="report-type" name="report-type">
                                <option value="monthly">Monthly Report</option>
                                <option value="weekly">Weekly Report</option>
                                <option value="daily">Daily Report</option>
                            </select>

                            <label htmlFor="date-range">Date Range:</label>
                            <input type="date" id="start-date" name="start-date" />
                            <span>to</span>
                            <input type="date" id="end-date" name="end-date" />

                            <button className="button" id="generate-report">Generate Report</button>
                        </div>

                        <div className="report-content">
                            <h3>Report Summary</h3>
                            <p><strong>Total Toll Collected:</strong> ₹1000.00</p>
                            <p><strong>Total Vehicles Passed:</strong> 120</p>
                            <p><strong>Top 3 High-Toll Vehicles:</strong></p>
                            <ul>
                                <li>VEH-001 - ₹100.00</li>
                                <li>VEH-002 - ₹95.00</li>
                                <li>VEH-003 - ₹90.00</li>
                            </ul>

                            <h3>Detailed Report</h3>
                            <table id="report-table">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Toll Charges</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Road Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VEH-001</td>
                                        <td>₹50.00</td>
                                        <td>2024-12-01</td>
                                        <td>Location A</td>
                                        <td>Highway</td>
                                    </tr>
                                    <tr>
                                        <td>VEH-002</td>
                                        <td>₹45.00</td>
                                        <td>2024-12-01</td>
                                        <td>Location B</td>
                                        <td>Service Road</td>
                                    </tr>
                                    <tr>
                                        <td>VEH-003</td>
                                        <td>₹55.00</td>
                                        <td>2024-12-02</td>
                                        <td>Location C</td>
                                        <td>Expressway</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button className="button" id="download-report">Download Report</button>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p>
                    <a href="#">Contact Support</a> |
                    <a href="#">Privacy Policy</a> |
                    <a href="#">Terms of Service</a>
                </p>
                <p>&copy; 2023 Dynamic GNSS-Based Tolling System</p>
            </footer>
        </div>
    );
}

export default App;
