import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors } from "../constant/styles";

class SplashScreen extends Component {
    render() {
        setTimeout(() => {
            this.props.navigation.navigate('OnBoarding');
        }, 2000);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }} >
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...Fonts.white60Regular }}>
                        Welcome
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SplashScreen);