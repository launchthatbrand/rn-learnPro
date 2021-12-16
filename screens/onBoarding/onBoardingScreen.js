import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity, Image,
    Dimensions,
    BackHandler,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors, Fonts, Sizes } from "../../constant/styles";

const { width } = Dimensions.get('screen');

class OnBoardingScreen extends Component {

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
        pageIndex: 0
    }

    Square = ({ isLight, selected }) => {
        let backgroundColor;
        let width;
        let height;
        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)';
            width = selected ? 12 : 7;
            height = selected ? 12 : 7;
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
            <View
                style={{
                    width,
                    height,
                    borderRadius: width / 2,
                    backgroundColor,
                    marginHorizontal: 2,
                    backgroundColor: this.state.pageIndex == 2 ? 'transparent' : backgroundColor,
                }}
            />
        );
    };

    Done = () => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { this.props.navigation.navigate('SignIn') }}
            style={{ position: 'absolute', left: -80.0, top: -10.0 }}>
            <Text style={{
                ...Fonts.white16Bold
            }}>GET STARTED NOW
            </Text>
        </TouchableOpacity>
    );

    render() {                                                                                            
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor='rgba(0,0,0,0)' />
                <Onboarding
                    pages={[
                        {
                            backgroundColor: '#FAFAFA',
                            image: <Image source={require('../../assets/images/onboarding/1.jpg')}
                                resizeMode="contain"
                                style={{ width: '100%', height: 300.0 }} />,
                            title:
                                <View style={styles.titleContainerStyle}>
                                    <Text style={{
                                        ...Fonts.black25Bold,
                                    }}>Learn from the best
                                    </Text>
                                </View>,

                            subtitle:
                                <View style={styles.subTitleContainerStyle}>
                                    <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                        {`Online classes taught by the world's best.\nGordon Ramsay,Stephen Curry and more.`}
                                    </Text>
                                </View>
                        },
                        {
                            backgroundColor: 'white',
                            image: <Image source={require('../../assets/images/onboarding/2.jpg')}
                                resizeMode="contain"
                                style={{ width: '100%', height: 300.0 }} />,

                            title:
                                <View style={styles.titleContainerStyle}>
                                    <Text style={{
                                        textAlign: 'center',
                                        ...Fonts.black25Bold,
                                    }}>Download and watch anytime
                                    </Text>
                                </View>,
                            subtitle: <View style={styles.subTitleContainerStyle}>
                                <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                    Download up to 10 digestible lessons that you can watch offline at any time.,
                                </Text>
                            </View>
                        },
                        {
                            backgroundColor: Colors.primaryColor,
                            image: <Image source={require('../../assets/images/onboarding/3.jpg')}
                                resizeMode="contain"
                                style={{ width: '100%', height: 300.0 }} />,
                            title:
                                <View style={styles.titleContainerStyle}>
                                    <Text style={{
                                        textAlign: 'center',
                                        ...Fonts.black25Bold,
                                    }}>Explore a range of topics
                                    </Text>
                                </View>,
                            subtitle: < View style={styles.subTitleContainerStyle}>
                                <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                    Perfect homemade paste, or write a novel...All wit access 100+ class.
                                </Text>
                            </View>
                        },
                    ]
                    }
                    DotComponent={this.Square}
                    DoneButtonComponent={this.Done}
                    containerStyles={{ backgroundColor: '#FFFFFF' }}
                    skipToPage={2}
                    skipLabel={
                        < Text style={{ ...Fonts.primaryColor16Regular }}> SKIP</Text >}
                    nextLabel={< Text style={{ ...Fonts.primaryColor16Regular }}> NEXT</Text >}
                    bottomBarColor={this.state.pageIndex == 2 ? Colors.primaryColor : '#FAFAFA'}
                    pageIndexCallback={this.getPageIndex}
                />
            </SafeAreaView>

        )
    }

    getPageIndex = (pageIndex) => {
        this.setState({
            pageIndex,
        });
    }
}

const styles = StyleSheet.create({
    titleContainerStyle: {
        width: '100%',
        alignItems: 'center',
        bottom: width / 0.65,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        position: 'absolute'
    },
    subTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: width / 2.0,
        position: 'absolute',
    },
});

OnBoardingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OnBoardingScreen);