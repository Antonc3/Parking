import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    header1: {
        fontSize: 24,
        marginBottom: 16,
    },
    header2: {
        fontSize: 20,
        marginBottom: 16,
    },
    container: {
        padding: 16
    },
    cardField: {
        height: 50,
        width: Dimensions.get('window').width-32,
    }
});
export default styles