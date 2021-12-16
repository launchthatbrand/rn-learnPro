import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from "react-native";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { withNavigation } from "react-navigation";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class VerificationScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        isLoading: false
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    element={
                        <Text style={{ ...Fonts.black25Bold, marginBottom: Sizes.fixPadding }}>
                            Enter 4 Digit OTP
                        </Text>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingTop: Sizes.fixPadding * 4.0,
                        paddingHorizontal: Sizes.fixPadding * 2.0
                    }}>
                        <Text style={{ ...Fonts.gray14Regular, textAlign: 'center' }}>
                            Enter the OTP code from the phone we just sent you.
                        </Text>
                        {this.otpFields()}
                        {this.resendInfo()}
                        {this.submitButton()}
                    </View>
                    {this.loading()}
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('BottomTabScreen')}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Submit</Text>
            </TouchableOpacity>
        )
    }

    resendInfo() {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginTop: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.gray14Regular }}>
                    Didn't receive OTP Code!
                </Text>
                <Text style={{ ...Fonts.black15Regular, marginLeft: Sizes.fixPadding }}>
                    Resend
                </Text>
            </View>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsContainerStyle}>
                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        onChangeText={() => { this.secondTextInput.focus(); }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={() => { this.thirdTextInput.focus(); }}
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        keyboardType="numeric"
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={() => { this.forthTextInput.focus(); }}

                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        keyboardType="numeric"
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={() => {
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('BottomTabScreen');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <ActivityIndicator color={Colors.primaryColor} size="large" />
                    <Text style={{ ...Fonts.lightGrayColor17Bold, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0
    },
    otpFieldsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 3.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding * 2.0
    }
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(VerificationScreen);