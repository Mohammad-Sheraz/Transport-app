import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";
import * as Location from 'expo-location';

function PickUp({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [pickup, setPickup] = useState('');
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: 6,
        distanceInterval: 1,
        timeInterval: 1000
      }, (location) => {
        setLocation(location);
      });
      // console.log("🚀 ~ location:", location)

    })();
  }, []);

  const searchPlace = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setPlaces([]);
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3BpDletyxBRJJLvUOkXsC+IgopVA6wAeg2lVMFs2Vxn8='
      }
    };

    const { latitude, longitude } = location.coords;

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setPlaces(response.results)
      })
      .catch(err => console.error(err));
  }

  const onPlaceSelect = (item) => {
    setPickup(item);
    setSearchText('');
    setPlaces([]);
  }

  const clearPickup = () => {
    setPickup('');
    setSearchText('');
    setPlaces([]);
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!location) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {location && (
        <View style={styles.container}>
          <Text>Pick up</Text>
          <TextInput
            placeholder='Search any location'
            value={searchText}
            onChangeText={searchPlace} />

          {!pickup && <View>
            {places.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                  <Text>{item.name},{item.location.address}</Text>
                </TouchableOpacity>
              )
            })}
          </View>}

          {pickup && <View>
            <Text>Your Selected pickup Location</Text>
            <Text>{pickup.name}, {pickup.location.address}</Text>
            <TouchableOpacity onPress={clearPickup}>
              <Text style={styles.clearPickupText}>Clear</Text>
            </TouchableOpacity>
          </View>}

          <MapView
            showsMyLocationButton
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0010,
              longitudeDelta: 0.0010,
            }}>

            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Your Location"}
              description={"Home"}
            />
          </MapView>

          <Button disabled={!pickup} title='Select Destination'
            onPress={() => navigation.navigate('Destination', { pickup })} />

        </View>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
    zIndex: 0
  },
});

export default PickUp;


//fsq3BpDletyxBRJJLvUOkXsC+IgopVA6wAeg2lVMFs2Vxn8=