
import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            SignikaNegative_Bold: require("../assets/fonts/SignikaNegative-Bold.ttf"),
            SignikaNegative_Regular: require("../assets/fonts/SignikaNegative-Regular.ttf"),
        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            </View>
        )
    }
}

