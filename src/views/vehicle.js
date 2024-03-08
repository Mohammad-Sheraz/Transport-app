import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

function VehicleSelection({ route }) {
    const { pickup, destination } = route.params
    console.log("🚀 ~ VehicleSelection ~ pickup:", pickup)

    const vehicleCharges = {
        Bike: 70,
        Auto: 130,
        Car: 200,
        Truck: 500,
        Air_Taxi: 1000,
    }

    const calculateDistance = (vehicle) => {
        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
        const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main;

        const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong);

        const fare = vehicleCharges[vehicle] * distance
        alert('Rs .' + fare.toFixed(2))
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textfont}>You'r Selected location</Text>
                <Text>{pickup.name}, {pickup.location.address}</Text>
                <Text>{destination.name}, {destination.location.address}</Text>
            </View>

            <ScrollView horizontal>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => calculateDistance('Bike')} style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Image source={require("../../assets/bike.jpg")} style={styles.image} />
                            <Text style={styles.buttonText}>Bike</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Auto')} style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Image source={require("../../assets/rickshaw.jpg")} style={styles.image} />
                            <Text style={styles.buttonText}>Auto</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Car')} style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Image source={require("../../assets/car.jpg")} style={styles.image} />
                            <Text style={styles.buttonText}>Car</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Truck')} style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Image source={require("../../assets/truck.jpeg")} style={styles.image} />
                            <Text style={styles.buttonText}>Truck</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Air_Taxi')} style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Image source={require("../../assets/air taxi.png")} style={styles.image} />
                            <Text style={styles.buttonText}>Air Taxi</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>

    );
}

export default VehicleSelection;

// const styles = StyleSheet.create({
//     textContainer: {
//         marginTop: '5%',
//         paddingLeft: 10
//     },
//     textfont: {
//         fontWeight: 'bold'
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 100,
//         resizeMode: 'cover'
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: '5%'
//     },
//     button: {
//         alignItems: 'center',
//     },
//     buttonContent: {
//         alignItems: 'center',
//         padding: 10, // Adjust padding as needed
//     },
//     buttonText: {
//         marginTop: 10,
//         color: 'green',
//     },
// });