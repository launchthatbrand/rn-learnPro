import React, { Component, useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Dimensions, BackHandler, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import CollapsingToolbar from "../../component/sliverAppBar";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class TakeCourseScreen extends Component {

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

    courseName = this.props.navigation.getParam('courseName');
    image = this.props.navigation.getParam('image');
    state = {
        paymentMethodDialog: false,
        currentIndex: 1,
        thanksDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.primaryColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    element={
                        <Text style={{ ...Fonts.primaryColor28Bold, marginBottom: Sizes.fixPadding }}>{this.courseName}</Text>
                    }
                    borderBottomRadius={20}
                    isImageBlur={true}
                    toolbarColor={Colors.whiteColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={300}
                    src={this.image}>
                    <View style={{ paddingTop: Sizes.fixPadding * 4.0 }}>
                        {this.allAccessAndClassOnlyInfo(
                            {
                                title: 'All-Access Pass',
                                description: ' You will get unlimited access to every class you want for a year.All lessons for you auto-renews annually.',
                                amount: 499.99,
                                type: 'year'
                            }
                        )}
                        {this.allAccessAndClassOnlyInfo(
                            {
                                title: 'This Class Only',
                                description: 'A good choice for who want to learn a single class for a long time.',
                                amount: 59,
                                type: 'once'
                            }
                        )}
                    </View>
                    <StatusBar backgroundColor="transparent" />
                    {this.paymentMethods()}
                    {this.thankYouInfo()}
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    thankYouInfo() {
        return (
            <Dialog.Container visible={this.state.thanksDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.thankYouDialogIconContainerStyle}>
                        <MaterialIcons name="check" size={40} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.lightGrayColor21Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                        Thanks for purchasing!
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    payments({ index, type, image }) {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ currentIndex: index })}
                    style={styles.paymentMethodContainerStyle}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: width - 200,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            borderColor: this.state.currentIndex == index ? Colors.primaryColor : 'gray',
                            ...styles.paymentMethosSelectionStyle
                        }}>
                            {
                                this.state.currentIndex == index ? <View style={{
                                    backgroundColor: Colors.primaryColor,
                                    width: 10.0, height: 10.0, borderRadius: 5.0
                                }}>
                                </View> : null
                            }
                        </View>
                        <View style={{ width: width - 200, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.black17Bold }}>
                                {type}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={image}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                {index == 3 ?
                    null :
                    <View style={{
                        backgroundColor: 'gray', height: 0.2,
                        marginVertical: Sizes.fixPadding + 5.0
                    }}></View>
                }
            </View>
        )
    }

    paymentMethods() {
        return (
            <Dialog.Container visible={this.state.paymentMethodDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 4.0 }}>
                        Choose payment method
                    </Text>
                    {this.payments({
                        index: 1,
                        type: 'Credit / Debit Card',
                        image: require('../../assets/images/payment_icon/card.png')
                    })}
                    {this.payments({
                        index: 2,
                        type: 'PayPal',
                        image: require('../../assets/images/payment_icon/paypal.png')
                    })}
                    {this.payments({
                        index: 3,
                        type: 'Google Wallet',
                        image: require('../../assets/images/payment_icon/google_wallet.png')
                    })}

                    <View style={styles.cancelAndPayButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ paymentMethodDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ paymentMethodDialog: false, thanksDialog: true })
                                setTimeout(() => {
                                    this.setState({ thanksDialog: false })
                                    this.props.navigation.navigate('BottomTabScreen');
                                }, 3000);
                            }}
                            style={styles.payButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Pay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    allAccessAndClassOnlyInfo({ title, description, amount, type }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ paymentMethodDialog: true })}
                style={styles.allAccessAndClassOnlyInfoContainerStyle}>
                <Text style={{ ...Fonts.black19Bold }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.gray17Regular }}>
                    {description}
                </Text>
                <Text style={{ ...Fonts.black20Regular }}>
                    ${amount}/{type}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    allAccessAndClassOnlyInfoContainerStyle: {
        backgroundColor: Colors.whiteColor, elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        height: 185.0,
        justifyContent: 'space-between'
    },
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
    payButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    paymentMethodContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 150.0,
    },
    paymentMethosSelectionStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.whiteColor,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding * 2.0
    },
    cancelAndPayButtonContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    thankYouDialogIconContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0, height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

TakeCourseScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(TakeCourseScreen);