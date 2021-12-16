import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBar";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import TabBarScreen from "../../component/tabBarScreen";

const { width } = Dimensions.get('screen');

class CourseDetailScreen extends Component {

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
        isInWatchList: false
    }

    image = this.props.navigation.getParam('image');
    courseName = this.props.navigation.getParam('courseName')
    courseCategory = this.props.navigation.getParam('courseCategory')
    courseRating = this.props.navigation.getParam('courseRating')
    courseNumberOfRating = this.props.navigation.getParam('courseNumberOfRating')
    coursePrice = this.props.navigation.getParam('coursePrice')

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.primaryColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    rightItem={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isInWatchList: !this.state.isInWatchList })}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <MaterialIcons
                                name={this.state.isInWatchList ? "done" : "add"}
                                size={24} color={Colors.primaryColor}
                            />
                            <Text style={{ ...Fonts.primaryColor16Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                                {this.state.isInWatchList ? "Added to Wishlist" : "Add to Wishlist"}
                            </Text>
                        </TouchableOpacity>
                    }
                    element={
                        this.courseInfo()
                    }
                    borderBottomRadius={20}
                    toolbarColor={Colors.whiteColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={370}
                    isImageBlur={true}
                    src={this.image}>
                    <TabBarScreen />
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    courseInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.primaryColor16Regular }}>{this.courseCategory}</Text>
                <Text style={{ ...Fonts.primaryColor28Bold, marginVertical: Sizes.fixPadding }}>
                    {this.courseName}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.primaryColor16Regular }}>
                            {this.courseRating}
                        </Text>
                        <MaterialIcons name="star" size={17} color={Colors.primaryColor} />
                        <Text style={{ ...Fonts.primaryColor16Regular }}>
                            ({this.courseNumberOfRating} Reviews)
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.primaryColor25Bold }}>
                        ${this.coursePrice}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.navigate('TakeCourse',
                        {
                            courseName: this.courseName,
                            image: this.image
                        }
                    )}
                    style={styles.takeTheCourseContainerStyle}>
                    <Text style={{ ...Fonts.black17Bold }}>Take the Course</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.navigate('WatchTrailer')}
                    style={styles.watchTrailerContainerStyle}>
                    <Text style={{ ...Fonts.black17Bold }}>Watch Trailer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    takeTheCourseContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center', justifyContent: 'center', width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding
    },
    watchTrailerContainerStyle: {
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding - 5.0,
    }
})

CourseDetailScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(CourseDetailScreen);