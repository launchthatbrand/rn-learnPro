import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions, Image, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Video } from 'expo-av';
import { TouchableOpacity } from "expo-custom-switch/build/Elements";
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import CollapsingToolbar from "../../component/sliverAppBar";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const courseLessonsList = [
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

const ShowVideo = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View style={styles.videoContainerStyle}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/video/video.mp4')}
                useNativeControls
                resizeMode="cover"
                isLooping
                shouldPlay={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {status.isPlaying ?
                null :
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    style={styles.button}>
                    <Ionicons name="md-caret-forward" size={30} color="black"
                    />
                </TouchableOpacity>
            }
        </View>
    );
}

class watchTrailerScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={24}
                            color={Colors.blackColor}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    element={<ShowVideo />}
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={250}
                    isImage={false}
                    childrenMinHeight={730}
                >
                    <View style={{ paddingTop: Sizes.fixPadding * 3.0, paddingBottom: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black25Bold, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                            Trailer
                        </Text>
                        <Text style={{
                            ...Fonts.gray19Regular, marginHorizontal: Sizes.fixPadding + 5.0,
                            marginVertical: Sizes.fixPadding + 3.0
                        }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        {courseLessonsList.map(item => (this.renderItem({ item })))}
                    </View>
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    renderItem({ item }) {
        return (
            <View key={item.id}>
                <View style={styles.lessonInfoContainerStyle}>
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
                </View>

            </View>
        )
    }
}

watchTrailerScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

const styles = StyleSheet.create({
    videoContainerStyle: {
        backgroundColor: 'black',
    },
    video: {
        alignSelf: 'center',
        width: width,
        height: 250,
    },
    button: {
        position: "absolute",
        backgroundColor: Colors.whiteColor,
        left: width / 2.3,
        top: 90.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    },
    lessonInfoContainerStyle: {
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding + 7.0,
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
})

export default withNavigation(watchTrailerScreen);