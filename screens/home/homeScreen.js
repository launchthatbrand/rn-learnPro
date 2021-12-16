import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import CollapsingToolbar from "../../component/sliverAppBar";

const width = Dimensions.get('window').width;

const itemWidth = Math.round(width * 0.7);

const carouselItems = [
    {
        image: require('../../assets/images/new_course/new_course_4.png'),
    },
    {
        image: require('../../assets/images/new_course/new_course_2.png'),
    },
    {
        image: require('../../assets/images/new_course/new_course_3.png'),
    },
];

class HomeScreen extends Component {

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

            <SafeAreaView style={{ flex: 1, }}>
                <CollapsingToolbar
                    rightItem={
                        <MaterialIcons
                            name="notifications"
                            size={25}
                            color="black"
                            onPress={() => this.props.navigation.navigate('Notification')}
                        />
                    }
                    element={
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center'
                        }}>
                            <Text style={{ ...Fonts.black25Bold }}>Home</Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.props.navigation.navigate('AccountSetting')}
                            >
                                <Image
                                    style={{ height: 80.0, width: 80.0, borderRadius: 40.0, }}
                                    source={require('../../assets/images/user_profile/user_3.jpg')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{ paddingBottom: Sizes.fixPadding * 7.0 }}>
                        {this.autoScroller()}
                        {this.categories()}
                        {title({ title: 'Popular Courses' })}
                        {this.popularCourses()}
                        {title({ title: 'New Courses' })}
                        {this.newCourses()}
                        {title({ title: 'Instructor' })}
                        {this.instructors()}
                    </View>
                    <StatusBar backgroundColor="transparent" />
                </CollapsingToolbar>
            </SafeAreaView>

        )
    }

    categories() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Category', { category: item.categoryName })}
                style={styles.categoryContainerStyle}>
                <ImageBackground source={item.categoryImage}
                    style={{ width: 140.0, height: 140.0, borderRadius: 70.0, }}
                    resizeMode="cover"
                >
                    <View style={styles.categoryBlurContainerStyle}>
                        <Text
                            style={{
                                textAlign: "center",
                                ...Fonts.white16Bold,
                                letterSpacing: 1
                            }}>
                            {item.categoryName}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={categoryList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    autoScroller() {
        const renderItem = ({ item }) => (
            <ImageBackground
                source={item.image}
                style={{
                    width: itemWidth - 10, height: 200, alignItems: "center",
                    justifyContent: 'center'
                }}
                borderRadius={Sizes.fixPadding - 5.0}
            >
                <Text style={{ ...Fonts.white25Bold }}>
                    Shonda Rhymes
                </Text>
                <Text style={{ ...Fonts.white15Regular, textAlign: 'center' }}>
                    Shonda describes what fuels her passion
                </Text>
            </ImageBackground>
        )

        return (
            <Carousel
                ref={ref => this.carousel = ref}
                data={carouselItems}
                sliderWidth={width}
                itemWidth={itemWidth}
                renderItem={renderItem}
                autoplay={true}
                loop={true}
                containerCustomStyle={{ marginTop: Sizes.fixPadding * 4.0 }}
                lockScrollWhileSnapping={true}
                autoplayInterval={4000}
            />
        );
    }

    popularCourses() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CourseDetail',
                    {
                        image: item.image,
                        courseName: item.courseName,
                        courseCategory: item.courseCategory,
                        courseRating: item.courseRating,
                        courseNumberOfRating: item.courseNumberOfRating,
                        coursePrice: item.coursePrice,
                    }
                )}
                activeOpacity={0.9}
                style={styles.popularCoursesContainerStyle}>
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={styles.popularCoursesImageStyle}
                />
                <View style={styles.popularCoursesInformationContainerStyle}>
                    <Text style={{ ...Fonts.gray15Regular }}>
                        {item.courseName}
                    </Text>
                    <Text style={{ ...Fonts.black17Bold, marginVertical: Sizes.fixPadding - 5.0 }}>
                        {item.courseCategory}
                    </Text>
                    <View style={{ backgroundColor: 'gray', height: 0.2, }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.black15Bold }}>{item.courseRating}</Text>
                        <MaterialIcons name="star" size={17} color="black" />
                        <Text style={{ ...Fonts.black15Bold, marginLeft: Sizes.fixPadding - 5.0 }}>
                            ({item.courseNumberOfRating})
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.black19Bold, marginTop: Sizes.fixPadding }}>
                        ${item.coursePrice}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={popularCoursesList}
                keyExtractor={(item) => `${item.courseId}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                    paddingHorizontal: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 4.0
                }}
            />
        )
    }

    newCourses() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('CourseDetail',
                    {
                        image: item.image,
                        courseName: item.courseName,
                        courseCategory: item.courseCategory,
                        courseRating: item.courseRating,
                        courseNumberOfRating: item.courseNumberOfRating,
                        coursePrice: item.coursePrice,
                    }
                )}
                style={styles.popularCoursesContainerStyle}>
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={styles.popularCoursesImageStyle}
                />
                <View style={styles.popularCoursesInformationContainerStyle}>
                    <Text style={{ ...Fonts.gray15Regular }}>
                        {item.courseName}
                    </Text>
                    <Text style={{ ...Fonts.black17Bold, marginVertical: Sizes.fixPadding - 5.0 }}>
                        {item.courseCategory}
                    </Text>
                    <View style={{ backgroundColor: 'gray', height: 0.2, }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.black15Bold }}>{item.courseRating}</Text>
                        <MaterialIcons name="star" size={17} color="black" />
                        <Text style={{ ...Fonts.black15Bold, marginLeft: Sizes.fixPadding - 5.0 }}>
                            ({item.courseNumberOfRating})
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.black19Bold, marginTop: Sizes.fixPadding }}>
                        ${item.coursePrice}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={newCoursesList}
                keyExtractor={(item) => `${item.courseId}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                    paddingHorizontal: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 4.0
                }}
            />
        )
    }

    instructors() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Instructor', {
                    name: item.instructorName,
                    rating: item.instructorRating,
                    image: item.image,
                })}
                style={styles.instructorsContainerStyle}>
                <Image source={item.image}
                    style={{ height: 120.0, width: 120.0, borderRadius: 60.0 }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.black17Bold, marginTop: Sizes.fixPadding + 7.0 }}>
                    {item.instructorName}
                </Text>
                <Text style={{ ...Fonts.gray15Regular, marginVertical: Sizes.fixPadding - 5.0 }}>
                    {item.instructorRole}
                </Text>
                <View style={{ backgroundColor: "gray", height: 0.2, marginVertical: Sizes.fixPadding - 5.0 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ ...Fonts.black15Bold }}>{item.instructorRating}</Text>
                    <MaterialIcons name="star" size={17} color="black" />
                    <Text style={{ ...Fonts.black15Bold, marginLeft: Sizes.fixPadding - 5.0 }}>
                        ({item.instructorNumberOfRating} Reviews)
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={instructorsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                    paddingHorizontal: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 4.0
                }}
            />
        )
    }
}

const categoryList = [
    {
        id: '1',
        categoryName: 'Art & Photography',
        categoryImage: require('../../assets/images/category/category_1.jpg'),
    },
    {
        id: '2',
        categoryName: 'Health & Fitness',
        categoryImage: require('../../assets/images/category/category_2.jpg'),
    },
    {
        id: '3',
        categoryName: 'Business & Marketing',
        categoryImage: require('../../assets/images/category/category_3.jpg'),
    },
    {
        id: '4',
        categoryName: 'Computer Science',
        categoryImage: require('../../assets/images/category/category_4.jpg'),
    },
    {
        id: '5',
        categoryName: '3D Printing Concept',
        categoryImage: require('../../assets/images/category/category_5.jpg'),
    },
    {
        id: '6',
        categoryName: 'Electronic',
        categoryImage: require('../../assets/images/category/category_6.jpg'),
    }
];

const popularCoursesList = [
    {
        courseId: 3,
        image: require("../../assets/images/new_course/new_course_3.png"),
        courseName: "Console Development Basics with Unity",
        courseCategory: "Computer Science",
        courseRating: "4.0",
        courseNumberOfRating: "4",
        coursePrice: "49"
    },
    {
        courseId: 1,
        image: require("../../assets/images/new_course/new_course_1.png"),
        courseName: "Design Instruments for Communication",
        courseCategory: "Business & Marketing",
        courseRating: "4.0",
        courseNumberOfRating: "5",
        coursePrice: "59"
    },
    {
        courseId: 4,
        image: require("../../assets/images/new_course/new_course_4.png"),
        courseName: "How to be a DJ? Make Electronic Music",
        courseCategory: "Electronic",
        courseRating: "4.8",
        courseNumberOfRating: "9",
        coursePrice: "59"
    },
    {
        courseId: 2,
        image: require("../../assets/images/new_course/new_course_2.png"),
        courseName: "Weight Training Courses with Any Di",
        courseCategory: "Health & Fitness",
        courseRating: "4.5",
        courseNumberOfRating: "7",
        coursePrice: "64"
    },
];

const newCoursesList = [
    {
        courseId: 1,
        image: require("../../assets/images/new_course/new_course_1.png"),
        courseName: "Design Instruments for Communication",
        courseCategory: "Business & Marketing",
        courseRating: "4.0",
        courseNumberOfRating: "5",
        coursePrice: "59"
    },
    {
        courseId: 2,
        image: require("../../assets/images/new_course/new_course_2.png"),
        courseName: "Weight Training Courses with Any Di",
        courseCategory: "Health & Fitness",
        courseRating: "4.5",
        courseNumberOfRating: "7",
        coursePrice: "64"
    },
    {
        courseId: 3,
        image: require("../../assets/images/new_course/new_course_3.png"),
        courseName: "Console Development Basics with Unity",
        courseCategory: "Computer Science",
        courseRating: "4.0",
        courseNumberOfRating: "4",
        coursePrice: "49"
    },
    {
        courseId: 4,
        image: require("../../assets/images/new_course/new_course_4.png"),
        courseName: "How to be a DJ? Make Electronic Music",
        courseCategory: "Electronic",
        courseRating: "4.8",
        courseNumberOfRating: "9",
        coursePrice: "59"
    }
]

const instructorsList = [
    {
        id: 1,
        image: require("../../assets/images/user_profile/user_1.jpg"),
        instructorName: "Don Hart",
        instructorRole: "Teacher",
        instructorRating: "4.5",
        instructorNumberOfRating: "7"
    },
    {
        id: 2,
        image: require("../../assets/images/user_profile/user_3.jpg"),
        instructorName: "Dawn Morales",
        instructorRole: "Marketing Consultant",
        instructorRating: "4.9",
        instructorNumberOfRating: "15"
    },
    {
        id: 3,
        image: require("../../assets/images/user_profile/user_4.jpg"),
        instructorName: "Allison Perry",
        instructorRole: "C++ Expert",
        instructorRating: "5.0",
        instructorNumberOfRating: "131"
    },
    {
        id: 4,
        image: require("../../assets/images/user_profile/user_5.jpg"),
        instructorName: "Anita Ruiz",
        instructorRole: "Fitness Instructor",
        instructorRating: "5.0",
        instructorNumberOfRating: "149"
    },

    {
        id: 5,
        image: require("../../assets/images/user_profile/user_8.jpg"),
        instructorName: "Bob Perez",
        instructorRole: "Flutter Expert",
        instructorRating: "5.0",
        instructorNumberOfRating: "184"
    }
]

function title({ title }) {
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.black20Bold }}>{title}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    categoryContainerStyle: {
        width: 140.0,
        height: 140.0,
        borderRadius: 70.0,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding + 5.0
    },
    categoryBlurContainerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        width: 140.0,
        height: 140.0,
        borderRadius: 70.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    popularCoursesContainerStyle: {
        elevation: 1.0,
        width: 220.0,
        borderRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding * 2.0
    },
    popularCoursesImageStyle: {
        width: 220.0,
        height: 150.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0
    },
    popularCoursesInformationContainerStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    instructorsContainerStyle: {
        alignItems: 'center',
        elevation: 2.0,
        width: 180.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding * 2.0
    }
});

export default withNavigation(HomeScreen);