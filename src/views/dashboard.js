import { View, Text, Button } from "react-native";

function Dashboard({ navigation }) {
    return (
        <>
            <View>
                <Text>Dashboard</Text>
                <Button
                    title="Pick up"
                    onPress={() => navigation.navigate('PickUp')}
                />
            </View>
        </>
    );
}
export default Dashboard;