import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import HomeScreen from "../screens/home/homeScreen";
import WishListScreen from "../screens/wishlist/wishListScreen";
import SearchScreen from "../screens/search/searchScreen";
import CoursesScreen from "../screens/course/coursesScreen";
import SettingScreen from "../screens/setting/settingScreen";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../constant/styles";

class BottomTabBarScreen extends Component {

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

    state = {
        currentIndex: 1
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.currentIndex == 1 ?
                    <HomeScreen /> :
                    this.state.currentIndex == 2 ?
                        <WishListScreen /> :
                        this.state.currentIndex == 3 ?
                            <SearchScreen /> :
                            this.state.currentIndex == 4 ?
                                <CoursesScreen /> :
                                <SettingScreen />
                }
                <View style={styles.bottomTabBarStyle}>
                    {this.bottomTabBarItem({
                        index: 1,
                        icon: <MaterialIcons name="home" size={27} color={Colors.orangeColor} />,
                        title: 'Home'
                    })}
                    {this.bottomTabBarItem({
                        index: 2,
                        icon: <MaterialIcons name="favorite-border" size={27} color={Colors.orangeColor} />,
                        title: 'Wishlist',
                    })}
                    {this.bottomTabBarItem({
                        index: 3,
                        icon: <MaterialIcons name="search" size={27} color={Colors.orangeColor} />,
                        title: 'Search'
                    })}
                    {this.bottomTabBarItem({
                        index: 4,
                        icon: <MaterialIcons name="library-books" size={27} color={Colors.orangeColor} />,
                        title: 'My Course'
                    })}
                    {this.bottomTabBarItem({
                        index: 5,
                        icon: <MaterialIcons name="settings" size={27} color={Colors.orangeColor} />,
                        title: 'Settings',
                    })}
                </View>
            </View>
        )
    }

    bottomTabBarItem({ index, icon, title }) {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() =>
                    this.setState({ currentIndex: index })
                }
            >
                {
                    this.state.currentIndex == index ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFEACC',
                            width: 140.0,
                            paddingVertical: Sizes.fixPadding,
                            borderRadius: Sizes.fixPadding * 4.0,
                        }}>
                            {icon}
                            <Text style={{ ...Fonts.orangeColor14Bold, marginLeft: Sizes.fixPadding * 2.0, }}>
                                {title}
                            </Text>
                        </View> :
                        icon
                }
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        borderTopColor: 'gray',
        borderTopWidth: 0.20,
    },
})



