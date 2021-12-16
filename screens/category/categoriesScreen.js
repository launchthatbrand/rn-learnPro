import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, Dimensions, FlatList, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const categoryList = [
    {
        id: 1,
        image: require("../../assets/images/new_course/new_course_1.png"),
        name: "Design Instruments for Communication",
        rating: "4.0",
        price: "59"
    },
    {
        id: 2,
        image: require("../../assets/images/new_course/new_course_2.png"),
        name: "Weight Training Courses with Any Di",
        rating: "4.5",
        price: "64"
    },
    {
        id: 4,
        image: require("../../assets/images/new_course/new_course_4.png"),
        name: "How to be a DJ? Make Electronic Music",
        ourseRating: "4.8",
        price: "59"
    },
    {
        id: 3,
        image: require("../../assets/images/new_course/new_course_3.png"),
        name: "Console Development Basics with Unity",
        rating: "4.0",
        price: "64"
    },
    {
        id: 5,
        image: require("../../assets/images/new_course/new_course_1.png"),
        name: "Design Instruments for Communication",
        rating: "4.0",
        price: "59"
    },
    {
        id: 6,
        image: require("../../assets/images/new_course/new_course_2.png"),
        name: "Weight Training Courses with Any Di",
        rating: "4.5",
        price: "64"
    },
    {
        id: 7,
        image: require("../../assets/images/new_course/new_course_4.png"),
        name: "How to be a DJ? Make Electronic Music",
        ourseRating: "4.8",
        price: "59"
    },
    {
        id: 8,
        image: require("../../assets/images/new_course/new_course_3.png"),
        name: "Console Development Basics with Unity",
        rating: "4.0",
        price: "64"
    }
];

class CategoriesScreen extends Component {

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

    category = this.props.navigation.getParam('category');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.categories()}
                </View>
            </SafeAreaView>
        )
    }

    categories() {
        const renderItem = ({ item }) => (
            <View style={styles.categoriesContainerStyle}>
                <Image
                    source={item.image}
                    style={styles.categoryImageStyle}
                    resizeMode="cover"
                />
                <View style={styles.categoryInfoContainerStyle}>
                    <Text style={{ ...Fonts.black17Bold }}>
                        {item.name}
                    </Text>
                    <Text style={{ ...Fonts.black17Bold, marginVertical: Sizes.fixPadding }}>
                        ${item.price}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.gray15Bold, marginRight: Sizes.fixPadding - 5.0 }}>
                            {item.rating}
                        </Text>
                        <MaterialIcons name="star" size={17} color="black" />
                    </View>
                </View>
            </View>
        )
        return (
            <FlatList
                data={categoryList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerContainerStyle}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding }}>
                    {this.category}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    categoriesContainerStyle: {
        flexDirection: 'row',
        width: width - 30,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding
    },
    categoryImageStyle: {
        height: 110.0,
        width: 110.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding
    },
    categoryInfoContainerStyle: {
        marginLeft: Sizes.fixPadding,
        width: width - 180,
        marginVertical: 3.0
    }
})

CategoriesScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(CategoriesScreen);