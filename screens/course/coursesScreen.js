import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions, Image, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import CollapsingToolbar from "../../component/sliverAppBar";

const { width } = Dimensions.get('screen');

const myCoursesList = [
    {
        id: '1',
        image: require('../../assets/images/new_course/new_course_1.png'),
        course: 'Alice Water',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        getVideos: 20,
        totalVideos: 20,
    },
    {
        id: '2',
        image: require('../../assets/images/new_course/new_course_2.png'),
        course: 'Gordon Ramsey',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        getVideos: 3,
        totalVideos: 12,
    },
    {
        id: '3',
        image: require('../../assets/images/new_course/new_course_3.png'),
        course: 'Lisa Ling',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        getVideos: 0,
        totalVideos: 15,
    },
    {
        id: '4',
        image: require('../../assets/images/new_course/new_course_4.png'),
        course: 'Wolfgang Puck',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        getVideos: 15,
        totalVideos: 30,
    }
];

class CoursesScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    element={
                        <Text style={{ ...Fonts.black25Bold }}>My Course</Text>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingBottom: Sizes.fixPadding * 7.0,
                    }}>
                        {myCoursesList.map(item => (
                            this.renderItem({ item })
                        ))}
                    </View>
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    renderItem({ item }) {
        return (
            <View key={item.id}>
                <View style={styles.courseContainerStyle}>
                    <Image
                        source={item.image}
                        style={styles.courseImageStyle}
                        resizeMode="cover"
                    />
                    <View style={styles.courseInfoContainerStyle}>
                        <Text style={{ ...Fonts.black17Bold }}>
                            {item.course}
                        </Text>
                        <Text style={{ ...Fonts.gray16Regular, marginVertical: Sizes.fixPadding - 3.0 }}>
                            {item.description}
                        </Text>
                        <Text style={{ ...Fonts.indigoColor16Bold }}>
                            {item.getVideos}/{item.totalVideos} Videos
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        height: 115.0,
        width: 115.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding
    },
    courseInfoContainerStyle: {
        marginLeft: Sizes.fixPadding,
        width: width - 160,
        marginVertical: 3.0,
    },
});

CoursesScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(CoursesScreen);