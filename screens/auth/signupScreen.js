import React, { Component } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, StatusBar, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';


class SignUpScreen extends Component {

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
        passwordVisible: false,
        confirmPasswordVisible: false,
        passwordFocus: false,
        confirmPasswordFocus: false,
        usernameFocus: false,
        emailFocus: false,
        phoneNumberFocus: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.blackColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    element={
                        <Text style={{ ...Fonts.black25Bold }}>Sign up</Text>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={80}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingVertical: Sizes.fixPadding * 7.0,
                        paddingHorizontal: Sizes.fixPadding * 2.0
                    }}>
                        {this.userNameTextField()}
                        {this.emailTextField()}
                        {this.phoneNumberTextField()}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
                        {this.signupButton()}
                    </View>
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Verification')}
                style={styles.signupButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Sign up</Text>
            </TouchableOpacity>
        )
    }

    confirmPasswordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Confirm password"
                secureTextEntry={this.state.confirmPasswordVisible ? false : true}
                style={{ ...Fonts.black17Regular, }}
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: this.state.confirmPasswordFocus ? Colors.primaryColor : "#898989", }}
                rightIcon={
                    <MaterialIcons name="remove-red-eye" size={24}
                        color={this.state.confirmPasswordFocus ? Colors.primaryColor : "#898989"}
                        onPress={() => this.setState({ confirmPasswordVisible: !this.state.confirmPasswordVisible })}
                    />
                }
                onFocus={() => this.setState({ confirmPasswordFocus: true })}
                onBlur={() => this.setState({ confirmPasswordFocus: false })}
            />
        )

    }

    phoneNumberTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Phone number"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: this.state.phoneNumberFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                keyboardType="numeric"
                onFocus={() => this.setState({ phoneNumberFocus: true })}
                onBlur={() => this.setState({ phoneNumberFocus: false })}
            />
        )
    }

    emailTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Email"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: this.state.emailFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => this.setState({ emailFocus: true })}
                onBlur={() => this.setState({ emailFocus: false })}
            />
        )
    }

    userNameTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Username"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: this.state.usernameFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => this.setState({ usernameFocus: true })}
                onBlur={() => this.setState({ usernameFocus: false })}
            />
        )
    }

    passwordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={this.state.passwordVisible ? false : true}
                style={{ ...Fonts.black17Regular, }}
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: this.state.passwordFocus ? Colors.primaryColor : "#898989", }}
                rightIcon={
                    <MaterialIcons name="remove-red-eye" size={24}
                        color={this.state.passwordFocus ? Colors.primaryColor : "#898989"}
                        onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
                    />
                }
                onFocus={() => this.setState({ passwordFocus: true })}
                onBlur={() => this.setState({ passwordFocus: false })}
            />
        )
    }
}

const styles = StyleSheet.create({
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    }
})

SignUpScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SignUpScreen);