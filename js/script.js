$(document).ready(function(){
  // console.log("ready");
 const measuredDataList = $("#measuredDataList");
 const reportedDataList = $("#reportedDataList");


  measuredData = (jsonData2) => {
    $.ajax({
    url: 'https://api.geonet.org.nz/intensity?type=measured',
    type: 'GET',
    dataType: 'json',
    success: function(jsonData2){
      console.log(jsonData2);
      measuredDataList.empty();
      if (jsonData2.features.length === 0) {
        measuredDataList.append(`There hasn't been any measured earthquakes`);
      } else {
        jsonData2.features.map(function(quake){
          measuredDataList.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}`)
        })
      }
    },
    error: function(){
      console.log('something has gone wrong');
    }
  })
  }


  reportedData = (jsonData1) => {
    $.ajax({
    url: 'https://api.geonet.org.nz/intensity?type=reported',
    type: 'GET',
    dataType: 'json',
    success: function(jsonData1){
      console.log(jsonData1);
      reportedDataList.empty();
      if (jsonData1.features.length === 0) {
        reportedDataList.append(`There hasn't been any reported earthquakes`);
      } else {
        jsonData1.features.map(function(quake){
          reportedDataList.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}</li>`)
        })
      }
    },
    error: function(){
      console.log('something has gone wrong');
    }
  })
  }


  function initMap(jsonData1, jsonData2){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -41.2865, lng: 174.7762},
      zoom: 5,
    });
    measuredData = () => {
      $.ajax({
      url: 'https://api.geonet.org.nz/intensity?type=measured',
      type: 'GET',
      dataType: 'json',
      success: function(jsonData2){
        console.log(jsonData2);
        measuredDataList.empty();
        if (jsonData2.features.length === 0) {
          measuredDataList.append(`There hasn't been any measured earthquakes`);
        } else {
          jsonData2.features.map(function(quake){
            let marker = new google.maps.Marker({
              position:{
                lat: quake.geometry.coordinates[1],
                lng: quake.geometry.coordinates[0]
              },
              map: map,
            })
            measuredDataList.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}`)
          })
        }
      },
      error: function(){
        console.log('something has gone wrong');
      }
    })
    }
    }

  google.maps.event.addDomListener(window, "load", initMap);
  // measuredData();
  // reportedData();
});
