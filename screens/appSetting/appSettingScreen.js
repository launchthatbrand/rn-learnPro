import React, { Component } from "react";
import { Text, View, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch, TouchableRipple } from 'react-native-paper';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class AppSettingScreen extends Component {

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
        isSwitchOn: false,
        isDeleteCompltedLesson: true,
        nothingToDeleteDialog: false,
        videoDownloadInHigh: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={25}
                            color={Colors.blackColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    element={<Text style={{ ...Fonts.black25Bold }}>App Settings</Text>}
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    childrenMinHeight={730}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginTop: Sizes.fixPadding * 4.0
                    }}>
                        {this.cellularDataInfo()}
                        {this.divider()}
                        {this.videoQualityForDownloadsInfo()}
                        {this.offlineDownloadsInfo()}
                        {this.deleteAllDownloadsInfo()}
                    </View>
                </CollapsingToolbar>
                {this.nothingToDeleteInfo()}
            </SafeAreaView>
        )
    }

    nothingToDeleteInfo() {
        return (
            <Dialog.Container visible={this.state.nothingToDeleteDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.redColor20Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Nothing to Delete
                    </Text>
                    <MaterialCommunityIcons name="timer-sand-empty" size={60}
                        color={Colors.primaryColor}
                        style={{ marginVertical: Sizes.fixPadding * 2.0 }}
                    />
                    <Text style={{
                        ...Fonts.lightGrayColor15Bold, textAlign: 'center',
                        marginBottom: Sizes.fixPadding * 2.0,
                    }}>
                        There are no downloded lessons on your device
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            this.setState({
                                nothingToDeleteDialog: false,
                            })
                        }}
                        style={styles.okButtonStyle}
                    >
                        <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
    }

    deleteAllDownloadsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ nothingToDeleteDialog: true })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{ width: width - 100.0, }}>
                        <Text style={{ ...Fonts.redColor20Bold }}>
                            Delete All Downloads
                        </Text>
                        <Text style={{ ...Fonts.lightGrayColor15Bold, marginTop: Sizes.fixPadding }}>
                            This will remove all downloaded Lesson videos from your phone
                        </Text>
                    </View>
                    <MaterialIcons name="delete" size={28} color='#F4473A' />
                </TouchableOpacity>
                <View style={styles.redDividerStyle}>
                </View>
            </View>
        )
    }

    offlineDownloadsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.lightGrayColor21Bold, }}>
                    Offline Downloads
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ isDeleteCompltedLesson: !this.state.isDeleteCompltedLesson })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding + 5.0
                    }}>
                    <View style={{ width: width - 100.0, }}>
                        <Text style={{ ...Fonts.black17Bold }}>
                            Delete Completed Lessons
                        </Text>
                        <Text style={{ ...Fonts.lightGrayColor15Bold, marginTop: Sizes.fixPadding }}>
                            Lessons can automatically delete 24 hours after they are watched in full
                        </Text>
                    </View>
                    {
                        this.state.isDeleteCompltedLesson ?
                            <MaterialIcons name="done" size={25} color="black" />
                            :
                            null
                    }
                </TouchableOpacity>
                {this.divider()}
            </View>
        )
    }

    videoQualityForDownloadsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.lightGrayColor21Bold, }}>
                    Video Quality for Downloads
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ videoDownloadInHigh: false })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding + 5.0
                    }}>
                    <View style={{ width: width - 100.0, }}>
                        <Text style={{ ...Fonts.black17Bold }}>
                            Standard (recommended)
                        </Text>
                        <Text style={{ ...Fonts.lightGrayColor15Bold, marginTop: Sizes.fixPadding }}>
                            Downloads faster and uses less storage</Text>
                    </View>
                    {
                        this.state.videoDownloadInHigh ?
                            null :
                            <MaterialIcons name="done" size={25} color="black" />
                    }
                </TouchableOpacity>
                {this.divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ videoDownloadInHigh: true })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{ width: width - 100.0, }}>
                        <Text style={{ ...Fonts.black17Bold }}>High Definition</Text>
                        <Text style={{ ...Fonts.lightGrayColor15Bold, marginTop: Sizes.fixPadding }}>
                            Use more storage
                        </Text>
                    </View>
                    {
                        this.state.videoDownloadInHigh ?
                            <MaterialIcons name="done" size={25} color="black" />
                            :
                            null
                    }
                </TouchableOpacity>
                {this.divider()}
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                height: 0.5, backgroundColor: 'gray',
                marginVertical: Sizes.fixPadding + 5.0
            }}>
            </View>
        )
    }

    cellularDataInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.lightGrayColor21Bold }}>Cellular Data</Text>
                <View style={styles.cellularDataInfoContainerStyle}>
                    <Text style={{ ...Fonts.black17Bold }}>Cellular Data for Downloads</Text>
                    <TouchableRipple
                        rippleColor="transparent"
                        onPress={() => this.setState({ isSwitchOn: !this.state.isSwitchOn })}
                    >
                        <View pointerEvents="none">
                            <Switch
                                value={this.state.isSwitchOn}
                                color={this.state.isSwitchOn ? Colors.primaryColor : '#E6E6E7'}
                            />
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        )
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
    okButtonStyle: {
        width: '100%',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0
    },
    redDividerStyle: {
        height: 1.5,
        backgroundColor: '#F4473A',
        marginVertical: Sizes.fixPadding + 5.0
    },
    cellularDataInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Sizes.fixPadding
    }
})

AppSettingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(AppSettingScreen);