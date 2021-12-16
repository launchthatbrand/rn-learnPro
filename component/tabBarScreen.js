
import React, { useState } from "react";
import { Text, useWindowDimensions, StyleSheet, } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Fonts, Colors, Sizes } from "../constant/styles";
import CourseOverViewScreen from "../screens/courseOverView/courseOverViewScreen";
import CourseLessonsScreen from "../screens/courseLessons/courseLessonsScreen";

export default TabBarScreen = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'OverView' },
        { key: 'second', title: 'Lessons' },
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <CourseOverViewScreen />;
            case 'second':
                return <CourseLessonsScreen />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.orangeColor, }}
                    tabStyle={{
                        width: layout.width / 2,
                    }}
                    style={{ backgroundColor: Colors.whiteColor, }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.black17Bold }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}


