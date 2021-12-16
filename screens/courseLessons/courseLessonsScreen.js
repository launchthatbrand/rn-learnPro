import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, ToastAndroid } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "expo-custom-switch/build/Elements";
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const courseLessonsList = [
    {
        id: '1',
        image: require('../../assets/images/new_course/new_course_1.png'),
        title: 'Trailer',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        isLoack: false,
    },
    {
        id: '2',
        image: require('../../assets/images/new_course/new_course_2.png'),
        title: 'Lesson 1',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        isLoack: true,
    },
    {
        id: '3',
        image: require('../../assets/images/new_course/new_course_3.png'),
        title: 'Lesson 2',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        isLoack: true,
    },
    {
        id: '4',
        image: require('../../assets/images/new_course/new_course_4.png'),
        title: 'Lesson 3',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        isLoack: true,
    },
    {
        id: '5',
        image: require('../../assets/images/new_course/new_course_5.png'),
        title: 'Lesson 4',
        descritption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        isLoack: false,
    }
];

class CoursesLessonsScreen extends Component {

    state = {
        showSnackbar: false,
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', flex: 1, }}>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {
                        courseLessonsList.map(item => (
                            this.renderItem({ item })
                        ))
                    }
                </ScrollView>
                <Snackbar
                    style={{ position: 'absolute', bottom: -10.0, left: -10.0, right: -10.0, backgroundColor: '#333333' }}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    First purchase this course then you access this lesson.
                </Snackbar>
            </View>

        )
    }

    renderItem({ item }) {
        return (
            <View key={item.id}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        item.isLoack ?
                            ToastAndroid.showWithGravity(
                                'First purchase this course then you access this lesson',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                ToastAndroid.CENTER,
                            )
                            :
                            this.props.navigation.navigate('WatchTrailer')
                    }}
                    style={styles.lessonInfoContainerStyle}>
                    <Image
                        source={item.image}
                        style={styles.lessonInfoImageStyle}
                        resizeMode="cover"
                    />
                    <View style={{
                        marginLeft: Sizes.fixPadding,
                        width: width - 140,
                        marginVertical: 3.0,
                    }}>
                        <Text style={{ ...Fonts.black17Bold }}>
                            {item.title}
                        </Text>
                        <Text style={{ ...Fonts.gray16Regular, marginVertical: Sizes.fixPadding }}>
                            {item.descritption}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {item.isLoack ?
                                <MaterialIcons name="lock" size={22} color="black" />
                                :
                                <MaterialIcons name="lock-open" size={22} color="black" />}
                            <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}>
                                {item.isLoack ? 'Locked' : 'Unlocked'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividerStyle}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lessonInfoContainerStyle: {
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    },
    lessonInfoImageStyle: {
        height: 110.0,
        width: 110.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding
    },
    dividerStyle: {
        backgroundColor: 'gray',
        height: 0.30,
        marginVertical: Sizes.fixPadding
    }
});

CoursesLessonsScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(CoursesLessonsScreen);