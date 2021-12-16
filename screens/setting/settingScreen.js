import React, { Component } from "react";
import { Text, View, SafeAreaView, Dimensions, TouchableOpacity, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

class SettingScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <CollapsingToolbar
                    element={
                        <Text style={{ ...Fonts.black25Bold }}>Settings</Text>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    childrenMinHeight={730}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingBottom: Sizes.fixPadding * 7.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginTop: Sizes.fixPadding * 4.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.navigate('AccountSetting')}
                        >
                            {this.settingInfo({ info: 'Account Settings' })}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.navigate('AppSetting')}
                        >
                            {this.settingInfo({ info: 'App Settings' })}
                        </TouchableOpacity>
                    </View>
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    settingInfo({ info }) {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                }}>
                    <View style={{ width: width - 80, }}>
                        <Text style={{ ...Fonts.black19Bold, }}>{info}</Text>
                    </View>

                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
                <View style={{ height: 0.3, backgroundColor: 'gray', marginTop: Sizes.fixPadding }}>
                </View>
            </View>
        )
    }
}

SettingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SettingScreen);