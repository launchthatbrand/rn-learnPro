import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class AccountSettingScreen extends Component {

    state = {
        phoneDialog: false,
        phone: '9603456878',
        changePhone: '9603456878',
        emailDialog: false,
        email: 'test@abc.com',
        changeEmail: 'test@abc.com',
        passwordDialog: false,
        password: '123456',
        changePassword: '123456',
        isLogout: false,
    }

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    leftItem={<MaterialIcons name="arrow-back-ios" size={25} color="black"
                        onPress={() => this.props.navigation.goBack()}
                    />}
                    element={
                        <Text style={{ ...Fonts.black25Bold }}>Account Settings</Text>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    childrenMinHeight={730}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginTop: Sizes.fixPadding * 4.0
                    }}>
                        {this.userPhoto()}
                        {this.userName()}
                        {this.editProfileText()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ phoneDialog: true })}
                        >
                            {this.editInfo({ title: 'Phone Number', value: this.state.phone })}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ emailDialog: true })}
                        >
                            {this.editInfo({ title: 'Email', value: this.state.email })}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ passwordDialog: true })}
                        >
                            {this.editInfo({ title: 'Password', value: '******' })}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isLogout: true })}
                        >
                            {this.logoutText()}
                        </TouchableOpacity>

                    </View>
                </CollapsingToolbar>
                {this.editPhoneDialog()}
                {this.editEmailDialog()}
                {this.editPasswordDialog()}
                {this.logOutDialog()}
            </SafeAreaView>
        )
    }

    logOutDialog() {
        return (
            <Dialog.Container visible={this.state.isLogout}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isLogout: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ isLogout: false })
                                this.props.navigation.navigate('SignIn')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }


    editPasswordDialog() {
        return (
            <Dialog.Container visible={this.state.passwordDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Your Password
                    </Text>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                    }}>
                        <TextInput
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='Old Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50,
                        width: '100%', marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            onChangeText={(value) => this.setState({ changePassword: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='Confirm New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => this.setState({ passwordDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                this.setState({
                                    passwordDialog: false,
                                    password: this.state.changePassword,
                                })
                            }}
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>

        )
    }

    editPhoneDialog() {
        return (
            <Dialog.Container visible={this.state.phoneDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Phone Number
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={this.state.changePhone}
                            onChangeText={(value) => this.setState({ changePhone: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.okAndCancelButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ phoneDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                this.setState({
                                    phoneDialog: false,
                                    phone: this.state.changePhone
                                })
                            }
                            }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    editEmailDialog() {
        return (
            <Dialog.Container visible={this.state.emailDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Email
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={this.state.changeEmail}
                            onChangeText={(value) => this.setState({ changeEmail: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={styles.okAndCancelButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ emailDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                this.setState({
                                    emailDialog: false,
                                    email: this.state.changeEmail
                                })
                            }
                            }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logoutText() {
        return (
            <View>
                <Text style={{
                    ...Fonts.redColor20Bold,
                    alignSelf: 'center', marginTop: Sizes.fixPadding
                }}>
                    Logout
                </Text>
                <View style={{ backgroundColor: '#F4473A', height: 1.0, marginVertical: Sizes.fixPadding }}></View>
            </View>
        )
    }

    editInfo({ title, value }) {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{
                            ...Fonts.black17Bold,
                            marginTop: Sizes.fixPadding,
                            marginBottom: Sizes.fixPadding - 5.0
                        }}>
                            {title}
                        </Text>
                        <Text style={{ ...Fonts.gray15Bold }}>{value}</Text>
                    </View>
                    <MaterialIcons name="edit" size={30} color="#BDBDBD" />
                </View>
                <View style={{ backgroundColor: 'gray', height: 0.3, marginVertical: Sizes.fixPadding }}>
                </View>
            </View>
        )
    }

    editProfileText() {
        return (
            <Text style={{ ...Fonts.gray18Bold, marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                Edit Profile
            </Text>
        )
    }

    userName() {
        return (
            <Text style={{
                ...Fonts.black20Bold, alignSelf: 'center',
                marginTop: Sizes.fixPadding - 3.0
            }}>
                Allison Perry
            </Text>
        )
    }

    userPhoto() {
        return (
            <Image
                source={require('../../assets/images/user_profile/user_3.jpg')}
                style={{ height: 110.0, width: 110.0, borderRadius: 55.0, alignSelf: 'center' }}
                resizeMode="cover"
            />
        )
    }
}

AccountSettingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    okAndCancelButtonContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding + 5.0
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    }
});

export default withNavigation(AccountSettingScreen);

