import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from "./component/loadingScreen";
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import CategoriesScreen from "./screens/category/categoriesScreen";
import CourseDetailScreen from "./screens/courseDetail/courseDetailScreen";
import InstructorScreen from "./screens/instructor/instructorScreen";
import TakeCourseScreen from "./screens/takeCourse/takeCourseScreen";
import NotificationScreen from "./screens/notification/notificationScreen";
import AccountSettingsScreen from "./screens/accountSetting/accountSettingsScreen";
import AppSettingScreen from "./screens/appSetting/appSettingScreen";
import WatchTrailerScreen from "./screens/watchTrailer/watchTrailerScreen";
import SigninScreen from "./screens/auth/signinScreen";
import SignupScreen from "./screens/auth/signupScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import OnBoardingScreen from "./screens/onBoarding/onBoardingScreen";
import SplashScreen from "./screens/splashScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createStackNavigator({
    Splash: SplashScreen,
    OnBoarding: OnBoardingScreen,
    SignIn: SigninScreen,
    SignUp: SignupScreen,
    Verification: VerificationScreen,
    BottomTabScreen: BottomTabBarScreen,
    Category: CategoriesScreen,
    CourseDetail: CourseDetailScreen,
    Instructor: InstructorScreen,
    TakeCourse: TakeCourseScreen,
    WatchTrailer: WatchTrailerScreen,
    Notification: NotificationScreen,
    AccountSetting: AccountSettingsScreen,
    AppSetting: AppSettingScreen,

  }),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
