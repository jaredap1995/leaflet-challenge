# Earthquake Data Visualization

This project is focused on visualizing global earthquake data using Leaflet.js. The dataset is fetched from the USGS, which provides earthquake data in a GeoJSON format, updated every 5 minutes.

## Description

The project visualizes a map that plots all the earthquakes from the chosen dataset based on their longitude and latitude. The markers on the map reflect the magnitude and the depth of each earthquake. 

- The size of each marker is proportional to the earthquake's magnitude. Earthquakes with higher magnitudes appear larger.
- The color of each marker corresponds to the depth of the earthquake. Earthquakes with greater depth appear darker.

Clicking on each marker displays a popup with additional information about the earthquake, including its location and exact magnitude.

A legend is also included on the map providing context about the color representation of the earthquake's depth.

## Technologies Used

- JavaScript
- Leaflet.js: For interactive map creation
- HTML/CSS: For web page structure and styling
- D3.js: For loading GeoJSON data
