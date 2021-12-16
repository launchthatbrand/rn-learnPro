import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TextInput, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import CollapsingToolbar from "../../component/sliverAppBar";


class SearchScreen extends Component {

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
        isTextFieldFocus: false
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <CollapsingToolbar
                    element={
                        <View style={styles.textInputContainerStyle}>
                            <MaterialIcons name="search" size={24}
                                color={this.state.isTextFieldFocus ? Colors.primaryColor : "gray"}
                                style={{
                                    position: 'absolute', left: 20.0, alignSelf: 'center',
                                    top: 13.0, bottom: 10.0
                                }}
                            />
                            <TextInput
                                placeholder="Try Easy ways write a novel"
                                style={{ marginLeft: Sizes.fixPadding * 6.0, ...Fonts.black15Regular }}
                                onFocus={() => this.setState({ isTextFieldFocus: true })}
                                onBlur={() => this.setState({ isTextFieldFocus: false })}
                            />
                        </View>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={40}
                    toolbarMaxHeight={230}
                    src={require('../../assets/images/appbar_bg.png')}>
                    <View style={{
                        paddingBottom: Sizes.fixPadding * 7.0, paddingTop: Sizes.fixPadding * 4.0,
                        paddingHorizontal: Sizes.fixPadding * 2.0
                    }}>
                        {this.popularTagsTitle()}
                        {this.popularTag({ search: 'Business & Management' })}
                        {this.popularTag({ search: 'Creative Art & Media' })}
                        {this.popularTag({ search: 'Health & Psychology' })}
                        {this.popularTag({ search: 'History' })}
                        {this.popularTag({ search: 'Languages & Cultures' })}
                        {this.popularTag({ search: 'Science,Engineering & Maths' })}
                        {this.popularTag({ search: 'Study Skills' })}
                        {this.popularTag({ search: 'Tech & Coding' })}
                    </View>
                    <StatusBar backgroundColor="transparent" />
                </CollapsingToolbar>
            </SafeAreaView>
        )
    }

    popularTag({ search }) {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 3.0 }}>
                <Text style={{ ...Fonts.gray19Regular }}>{search}</Text>
                <View style={{ backgroundColor: 'gray', height: 0.3, marginTop: Sizes.fixPadding }}></View>
            </View>
        )
    }

    popularTagsTitle() {
        return (
            <Text style={{ ...Fonts.black25Bold }}>
                Popular Tags
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    textInputContainerStyle: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding,
    }
});

SearchScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SearchScreen);