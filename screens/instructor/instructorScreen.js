import React, { Component } from "react";
import {
    Text,
    View, SafeAreaView,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts, Sizes, Colors } from "../../constant/styles";

const { width } = Dimensions.get('screen');

const coursesList = [
    {
        id: '1',
        image: require('../../assets/images/new_course/new_course_1.png'),
        title: 'Alice Water',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        numberOfVideos: 20,
    },
    {
        id: '2',
        image: require('../../assets/images/new_course/new_course_2.png'),
        title: 'Gordon Ramsey',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        numberOfVideos: 12,
    },
];

class InstructorScreen extends Component {

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

    name = this.props.navigation.getParam('name');
    image = this.props.navigation.getParam('image');
    rating = this.props.navigation.getParam('rating');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA', }}>
                <StatusBar translucent={false} backgroundColor="rgba(0,0,0,0)" />
                {this.header()}
                <View style={{ flex: 1, paddingBottom: Sizes.fixPadding * 2.0 }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.userImage()}
                                {this.userName()}
                                {this.userOtherInfo({ title: 'Born', info: 'Nov 8th, 1966' })}
                                {this.userOtherInfo({ title: 'Country', info: 'Scotland' })}
                                {this.userOtherInfo({ title: 'Style', info: 'French,Italian,British' })}
                                {this.userRatingInfo()}
                                {this.userOtherInfo({ title: 'Website', info: 'www.example.com' })}
                                {this.dummyText()}
                                {this.coursesTitle()}
                            </>
                        }
                        data={coursesList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.courseContainerStyle}>
            <Image
                source={item.image}
                style={styles.courseImageStyle}
                resizeMode="cover"
            />
            <View style={styles.courseInfoContainerStyle}>
                <Text style={{ ...Fonts.black17Bold }}>
                    {item.title}
                </Text>
                <Text style={{ ...Fonts.gray16Regular, marginVertical: Sizes.fixPadding - 3.0 }}>
                    {item.descritption}
                </Text>
                <Text style={{ ...Fonts.indigoColor16Bold }}>
                    {item.numberOfVideos} Videos
                </Text>
            </View>
        </View>
    )

    coursesTitle() {
        return (
            <Text style={styles.courseTitleStyle}>Courses</Text>
        )
    }

    dummyText() {
        return (
            <Text
                style={styles.dummyTextStyle}>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
        )
    }

    userRatingInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: width / 2.8 }}>
                        <Text style={{ ...Fonts.gray19Regular }}>Rating</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.black17Bold, marginRight: Sizes.fixPadding - 6.0 }}>
                            {this.rating}
                        </Text>
                        <MaterialIcons name="star" size={20} color="black" />
                    </View>
                </View>
                <View style={{ height: 0.2, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                </View>
            </View>
        )
    }

    userOtherInfo({ title, info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: width / 2.8 }}>
                        <Text style={{ ...Fonts.gray19Regular }}>{title}</Text>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.black17Bold }}>{info}</Text>
                    </View>
                </View>
                <View style={{ height: 0.2, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                </View>
            </View>
        )
    }

    userName() {
        return (
            <Text style={{ ...Fonts.black20Bold, alignSelf: 'center', paddingVertical: Sizes.fixPadding * 2.0 }}>
                {this.name}
            </Text>
        )
    }

    userImage() {
        return (
            <Image
                source={this.image}
                style={styles.userImageContainerStyle}
                resizeMode="cover"
            />
        )
    }

    header() {
        return (
            <View style={styles.headerContainerStyle}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding * 11.0 }}>
                    Information
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userImageContainerStyle: {
        height: 120.0,
        width: 120.0,
        borderRadius: 60.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding
    },
    headerContainerStyle: {
        flexDirection: 'row',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    courseContainerStyle: {
        flexDirection: 'row',
        width: width - 20,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    },
    courseImageStyle: {
        height: 110.0,
        width: 110.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding
    },
    courseInfoContainerStyle: {
        marginLeft: Sizes.fixPadding,
        width: width - 170,
        marginVertical: 3.0,
    },
    dummyTextStyle: {
        ...Fonts.black15Regular,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'justify',
        marginTop: Sizes.fixPadding + 5.0
    },
    courseTitleStyle: {
        ...Fonts.black19Bold,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding
    }
});

InstructorScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(InstructorScreen);