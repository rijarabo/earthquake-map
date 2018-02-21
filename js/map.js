// NYC Center
var centerMap =[18.062312,-66.093750];
var zoomMap= 2;
var map = L.map('my-map').setView(centerMap, zoomMap);

// Reset buton //

$('#resetButton').click(function() {
  map.flyTo(centerMap, zoomMap)
});

// map //

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
}).addTo(map);

// Zoom plug in //
// https://github.com/consbio/Leaflet.ZoomBox //

// tectonic plates shapefile//
// source: https://github.com/fraxen/tectonicplates

L.geoJSON(platesData, {
  style: {
    dashArray: '2 10',
    color: '#C0C0C0',
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
  }
}).addTo(map);

var radiusArray= [3,7,15,20];
var colorArray=['#FEB24C','#FC4E2A','#BD0026','#800026'];

// Earthquakes //
// source: Custom search for 2017, above 4.5 magnitude https://earthquake.usgs.gov/earthquakes/search/
const lookupMagnitude = function(mag) {
  switch(mag) {
    case 5:   return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.1: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.2: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.3: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.4: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.5: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.6: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.7: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.8: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 5.9: return {color: colorArray[0] , radius: radiusArray[0], class: 'Moderate'};
    case 6:   return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.1: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.2: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.3: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.4: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.5: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.6: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.7: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.8: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 6.9: return {color: colorArray[1] , radius: radiusArray[1], class: 'Strong'};
    case 7:   return {color: colorArray[2] , radius: radiusArray[2], class: 'Major'};
    case 7.1: return {color: colorArray[2] , radius: radiusArray[2], class: 'Major'};
    case 7.3: return {color: colorArray[2] , radius: radiusArray[2], class: 'Major'};
    case 7.7: return {color: colorArray[2] , radius: radiusArray[2], class: 'Major'};
    case 7.9: return {color: colorArray[2] , radius: radiusArray[2], class: 'Major'};
    case 8.2: return {color: colorArray[3] , radius: radiusArray[3], class: 'Great'};
  }
}

L.geoJSON(earthquakeData, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng,{
      fillColor: lookupMagnitude(feature.properties.mag).color,
      color: 'white',
      weight: 0,
      opacity: 1,
      fillOpacity: 0.8,
      radius: lookupMagnitude(feature.properties.mag).radius
    })
  },
  onEachFeature: function(feature,layer) {
    var popup=layer.bindPopup(`
      <b style='font-size: 120%'>Location:</b> ${feature.properties.place}<br/>
      <b style='font-size: 120%'>Date:</b> ${feature.properties.date} <br/>
      <b style='font-size: 120%'>Depth:</b> ${feature.properties.depth} km <br/>
      <b style='font-size: 120%'>Magnitude:</b> ${feature.properties.mag} Richter degrees<br/>
      <b style='font-size: 120%'>Class:</b> ${lookupMagnitude(feature.properties.mag).class} `)},
}).addTo(map);
