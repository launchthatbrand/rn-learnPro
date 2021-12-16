import React, { Component } from "react";
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { ThemeColors, withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

class SigninScreen extends Component {

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
        passwordFocus: false,
        usernameFocus: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    element={<Text style={{ ...Fonts.black25Bold }}>Sign in</Text>}
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingVertical: Sizes.fixPadding * 7.0,
                        paddingHorizontal: Sizes.fixPadding * 2.0
                    }}>
                        {this.userNameTextField()}
                        {this.passwordTextField()}
                        {this.signinButton()}
                        {this.signUpText()}
                        {this.forgotPasswordText()}
                        {this.loginWithFacebookButton()}
                        {this.loginWithGoogleButton()}
                    </View>
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    loginWithGoogleButton() {
        return (
            <View>
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image source={require('../../assets/images/google.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Log in with Google
                    </Text>
                </View>
            </View>
        )
    }

    loginWithFacebookButton() {
        return (
            <View>
                <View style={styles.loginWithFacebookButtonStyle}>
                    <Image source={require('../../assets/images/facebook.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.white19Bold, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Log in with Facebook
                    </Text>
                </View>
            </View>
        )
    }

    forgotPasswordText() {
        return (
            <Text style={{ ...Fonts.gray18Bold, textAlign: 'center' }}>
                Forgot your password?
            </Text>
        )
    }

    signUpText() {
        return (
            <Text style={{
                ...Fonts.gray18Bold, textAlign: 'center',
                marginTop: Sizes.fixPadding - 5.0,
                marginBottom: Sizes.fixPadding
            }}>
                Sign up
            </Text>
        )
    }

    signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('SignUp')}
                style={styles.signinButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Sign in</Text>
            </TouchableOpacity>
        )
    }

    passwordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={this.state.passwordVisible ? false : true}
                style={{ ...Fonts.black17Regular, }}
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

    userNameTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Username"
                inputContainerStyle={{ borderBottomColor: this.state.usernameFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => this.setState({ usernameFocus: true })}
                onBlur={() => this.setState({ usernameFocus: false })}
            />
        )
    }
}

const styles = StyleSheet.create({
    signinButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: '#3B5998',
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 3.5
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 2.5
    },
})

SigninScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SigninScreen);