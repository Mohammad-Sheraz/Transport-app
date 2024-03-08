import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

function Destination({ route, navigation }) {

    const { pickup } = route.params

    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [destination, setDestination] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        (async () => {
            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
                timeInterval: 1000
            }, (location) => {
                setLocation(location);
            });
            console.log("🚀 ~ location:", location)

        })();
    }, []);

    const searchPlace = (text) => {
        setSearchText(text); // Update search text state

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
        setDestination(item)
        setSearchText(''); // Clear search text
        setPlaces([]); // Clear places
    }

    const clearDestination = () => {
        setDestination('');
    }

    if (!location) {
        return <Text>Loading...</Text>
    }


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search any location"
                value={searchText}
                onChangeText={searchPlace} />

            <View>
                <Text>Your Selected pick up Location is</Text>
                <Text>{pickup.name}, {pickup.location.address}</Text>
            </View>

            {!destination && <View>
                {places.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                            <Text>{item.name},{item.location.address}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>}

            {destination && <View>
                <Text>Your Selected Destination Location is</Text>
                <Text>{destination.name}, {destination.location.address}</Text>

                <TouchableOpacity onPress={clearDestination}>
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>

            </View>}

            <MapView
                showsMyLocationButton
                showsUserLocation
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0001,
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

            <Button title="Select Vehicle" disabled={!destination}
                onPress={() => navigation.navigate('vehicle', { pickup, destination })} />

            {/* <TouchableOpacity
                disabled={!destination}
                onPress={() => navigation.navigate('VehicleSelection', { pickup, destination })}>
                <Text>Select Vehicle</Text>
            </TouchableOpacity> */}


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '50%',
    },
});

export default Destination;


