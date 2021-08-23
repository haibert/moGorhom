import React, { useEffect, useCallback, useRef } from 'react'
import {
    Platform,
    View,
    Alert,
    Linking,
    useColorScheme,
    Pressable,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { enableScreens } from 'react-native-screens'

//MARK ROUSAVY
import { TransitionPresets } from '@react-navigation/stack'

//custom screen options
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
//enableScreens
enableScreens()

//shared element
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

// signup screens
import ASignupScreen from '../screens/signupScreens/ASignupScreen'
import BConfirmationScreen from '../screens/signupScreens/BConfirmationScreen'
import CAddYourName from '../screens/signupScreens/CAddYourName'
import DCreatePassword from '../screens/signupScreens/DCreatePassword'
import EAddYourBirthday from '../screens/signupScreens/EAddYourBirthday'
import FUserName from '../screens/signupScreens/FUserName'

//screens
import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'
import FeedScreen from '../screens/FeedScreen'
import CameraScreen from '../screens/CameraScreen'
import GalleryView from '../screens/GalleryView'
import GalleryDetailScreen from '../screens/GalleryDetailScreen'
import StartUpScreen from '../screens/StartUpScreen'
import SearchScreen from '../screens/SearchScreen'
import OtherProfileScreen from '../screens/OtherProfileScreen'
import OtherProfilePhotoScreen from '../screens/OtherProfilePhotoScreen'
import OtherGalleryView from '../screens/OtherGalleryView'
import OtherFollowsScreen from '../screens/OtherFollowsScreen'
import CommentsScreen from '../screens/CommentsScreen'
import DesignTest from '../screens/DesignTest'
import EditGalleryScreen from '../screens/EditGalleryScreen'

// Profile / edit profile
import ProfileScreen from '../screens/ProfileScreen'
import PhotoEditScreen from '../screens/profileScreen/PhotoEditScreen'
import ProfileEditScreen from '../screens/profileScreen/ProfileEditScreen'
import EditNameScreen from '../screens/profileScreen/EditNameScreen'
import EditBirthdayScreen from '../screens/profileScreen/EditBirthdayScreen'
import EditPhoneScreen from '../screens/profileScreen/EditPhoneScreen'
import EditUsernameScreen from '../screens/profileScreen/EditUsernameScreen'
import NotificationsScreen from '../screens/profileScreen/NotificationsScreen'
import ProfileFollowsScreen from '../screens/profileScreen/ProfileFollowsScreen'

//event creation
import CreateEventScreen from '../screens/eventCreation/CreateEventScreen'
import QrCodeScreen from '../screens/eventCreation/QrCodeScreen'
import JoinEventScreen from '../screens/eventCreation/JoinEventScreen'

import { useIsFocused } from '@react-navigation/native'

//custom drawer content
import DrawerContent from '../screens/drawerContent/DrawerContent'

//colors
import colors from '../constants/colors'

//ionicons
import { Ionicons } from '@expo/vector-icons'

//redux
import {
    savePermissionsStatus,
    loadPermissions,
} from '../store/permissions/actions'
import { useDispatch, useSelector } from 'react-redux'

//expo camera
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'

//lottie
import LottieView from 'lottie-react-native'

//all SVGs
import HomeSVG from '../components/animatedNavBarTest/HomeSVG'
import SearchSVG from '../components/animatedNavBarTest/SearchSVG'
import PersonSVG from '../components/animatedNavBarTest/PersonSVG'
import CameraSVG from '../components/animatedNavBarTest/CameraSVG'
import PlusSVG from '../components/animatedNavBarTest/PlusSVG'
import NuemorphicNavBar from '../components/NuemorphicNavBar'
import FloatingButton from '../components/FloatingButton'

//test screens
import ProfileTest from '../screens/ProfileTest'
import NotificationTest from '../screens/NotificationTest'

const MainStack = createStackNavigator()

//----------------------------------------------------------------CUSTOM DRAWER BEHAVIORS----------------------------------------------------------------
function getDrawerState(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'DashboardScreen'
    console.log(routeName)

    switch (routeName) {
        case 'GalleryView':
            return false
        case 'GalleryDetailScreen':
            return false
        case 'OtherProfileScreen':
            return false
        case 'CameraScreen':
            return false
    }
}

function showHideBottomTab(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    console.log(
        '🚀 ~ file: navigation.js ~ line 128 ~ showHideBottomTab ~ routeName',
        routeName
    )
    switch (routeName) {
        case 'GalleryDetailScreen':
            return false
        case 'GalleryView':
            return false
        case 'OtherGalleryView':
            return false
        case 'EditGalleryScreen':
            return false
        default:
            return true
    }
}
function changeTabToAbsolute(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
        case 'GalleryDetailScreen':
            return {
                style: {
                    position: 'absolute',
                },
            }
        default:
            return {
                style: {
                    position: 'relative',
                },
            }
    }
}
//----------------------------------------------------------------CUSTOM DRAWER BEHAVIORS----------------------------------------------------------------

//----------------------------------------------------------------TRANSITION SPEC----------------------------------------------------------------
const iosTransitionSpec = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 1000,
        mass: Platform.OS === 'android' ? 3 : 1.9,
        overshootClamping: true,
        restDisplacementThreshold: 10,
        restSpeedThreshold: 10,
    },
}
//----------------------------------------------------------------TRANSITION SPEC----------------------------------------------------------------

//----------------------------------------------------------------CHANGING NAV OPTIONS----------------------------------------------------------------
const cardStyleInterpolatorFunc = ({ current: { progress } }) => {
    return {
        cardStyle: {
            opacity: progress,
        },
    }
}

const gestureResponseVertical = {
    vertical: 1000,
}

const gestureResponseHorizontal = {
    horizontal: Platform.OS === 'android' ? 50 : 1000,
}

const gestureResponseDynamic = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)

    switch (routeName) {
        case 'CameraScreen':
            return { horizontal: 1000 }
    }
}

const gestureDirectionVertical = 'vertical'
const gestureDirectionHorizontal = 'horizontal'
//----------------------------------------------------------------CHANGING NAV OPTIONS----------------------------------------------------------------

//----------------------------------------------------------------NULL ANIMATION CONFIG----------------------------------------------------------------
const nullAnimationConfig = (route) => {
    return [
        {
            id: null,
        },
    ]
}

//----------------------------------------------------------------NULL ANIMATION CONFIG----------------------------------------------------------------

const SignUpNavigation = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            detachInactiveScreens={true}
        >
            <MainStack.Screen name="ASignupScreen" component={ASignupScreen} />
            <MainStack.Screen
                name="BConfirmationScreen"
                component={BConfirmationScreen}
            />
            <MainStack.Screen name="CAddYourName" component={CAddYourName} />
            <MainStack.Screen
                name="DCreatePassword"
                component={DCreatePassword}
            />
            <MainStack.Screen
                name="EAddYourBirthday"
                component={EAddYourBirthday}
            />
            <MainStack.Screen name="FUserName" component={FUserName} />
        </MainStack.Navigator>
    )
}
const FeedSEStack = createSharedElementStackNavigator()
const FeedSharedElementStack = ({ navigation, route }) => {
    return (
        <FeedSEStack.Navigator
            mode="modal"
            initialRouteName="DashboardScreen"
            screenOptions={{
                useNativeDriver: true,
                transitionSpec: {
                    open: iosTransitionSpec,
                    close: iosTransitionSpec,
                },
            }}
            detachInactiveScreens={true}
        >
            <FeedSEStack.Screen
                name="DashboardScreen"
                component={FeedScreen}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                }}
            />
            <FeedSEStack.Screen
                name="GalleryView"
                component={GalleryView}
                options={() => ({
                    headerShown: false,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    // gestureResponseDistance: gestureResponseVertical,
                    // gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: galleryID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            <FeedSEStack.Screen
                name="OtherGalleryView"
                component={OtherGalleryView}
                options={() => ({
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: [galleryID],
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            <FeedSEStack.Screen
                name="GalleryDetailScreen"
                component={GalleryDetailScreen}
                options={() => ({
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                })}
                sharedElementsConfig={(route) => {
                    const { picID } = route.params
                    return [
                        {
                            id: Platform.OS === 'android' ? picID : picID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                        },
                    ]
                }}
            />
            <FeedSEStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={() => ({
                    headerShown: false,
                    // animationEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                })}
                // sharedElementsConfig={(route) => {
                //     return [
                //         {
                //             id: '1',
                //             animation:
                //                 Platform.OS === 'android' ? 'fade-out' : null,
                //             resize: 'auto',
                //         },
                //     ]
                // }}
            />
            <FeedSEStack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
                options={{
                    headerShown: false,
                    useNativeDriver: true,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
                sharedElementsConfig={(navigation) => {
                    const animatePlease = navigation.name === 'ProfileScreen'
                    console.log(
                        '🚀 ~ file: navigation.js ~ line 292 ~ DashModalStack ~ animatePlease',
                        animatePlease
                    )
                    return [
                        {
                            id: animatePlease ? '1' : null,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : null,
                            resize: 'auto',
                        },
                    ]
                }}
            />

            {/* <FeedSEStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                    // ...TransitionPresets.SlideFromRightIOS,
                }}
            /> */}
            <FeedSEStack.Screen
                name="OtherProfileScreen"
                component={OtherProfileScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />

            {/* ALL HORIZONTAL SCREENS BELLOW */}

            <FeedSEStack.Screen
                name="ProfileFollowsScreen"
                component={ProfileFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <FeedSEStack.Screen
                name="OtherFollowsScreen"
                component={OtherFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />

            {/* <FeedSEStack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            /> */}

            {/* ALL EDIT SCREENS BELLOW */}
            <FeedSEStack.Screen
                name="EditNameScreen"
                component={EditNameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <FeedSEStack.Screen
                name="EditBirthdayScreen"
                component={EditBirthdayScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />

            <FeedSEStack.Screen
                name="EditPhoneScreen"
                component={EditPhoneScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <FeedSEStack.Screen
                name="EditUsernameScreen"
                component={EditUsernameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <FeedSEStack.Screen
                name="EditGalleryScreen"
                component={EditGalleryScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <FeedSEStack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <FeedSEStack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
        </FeedSEStack.Navigator>
    )
}

const ProfileSEStack = createSharedElementStackNavigator()
const ProfileSharedElementStack = () => {
    return (
        <ProfileSEStack.Navigator
            mode="modal"
            initialRouteName="ProfileScreen"
            screenOptions={{
                useNativeDriver: true,
                transitionSpec: {
                    open: iosTransitionSpec,
                    close: iosTransitionSpec,
                },
            }}
            detachInactiveScreens={true}
        >
            <ProfileSEStack.Screen
                name="GalleryView"
                component={GalleryView}
                options={() => ({
                    headerShown: false,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    // gestureResponseDistance: gestureResponseVertical,
                    // gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: galleryID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            <ProfileSEStack.Screen
                name="GalleryDetailScreen"
                component={GalleryDetailScreen}
                options={() => ({
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                })}
                sharedElementsConfig={(route) => {
                    const { picID } = route.params
                    return [
                        {
                            id: Platform.OS === 'android' ? picID : picID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                        },
                    ]
                }}
            />

            <ProfileSEStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={() => ({
                    headerShown: false,
                    animationEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                })}
                // sharedElementsConfig={(route) => {
                //     return [
                //         {
                //             id: '1',
                //             animation:
                //                 Platform.OS === 'android' ? 'fade-out' : null,
                //             resize: 'auto',
                //         },
                //     ]
                // }}
            />
            <ProfileSEStack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
                options={{
                    headerShown: false,
                    useNativeDriver: true,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
                sharedElementsConfig={(navigation) => {
                    const animatePlease = navigation.name === 'ProfileScreen'
                    console.log(
                        '🚀 ~ file: navigation.js ~ line 292 ~ DashModalStack ~ animatePlease',
                        animatePlease
                    )
                    return [
                        {
                            id: animatePlease ? '1' : null,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : null,
                            resize: 'auto',
                        },
                    ]
                }}
            />
            <ProfileSEStack.Screen
                name="OtherProfileScreen"
                component={OtherProfileScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <ProfileSEStack.Screen
                name="OtherGalleryView"
                component={OtherGalleryView}
                options={() => ({
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: [galleryID],
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            {/* ALL HORIZONTAL SCREENS BELLOW */}

            <ProfileSEStack.Screen
                name="ProfileFollowsScreen"
                component={ProfileFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <ProfileSEStack.Screen
                name="OtherFollowsScreen"
                component={OtherFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />

            {/* ALL EDIT SCREENS BELLOW */}
            <ProfileSEStack.Screen
                name="EditNameScreen"
                component={EditNameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <ProfileSEStack.Screen
                name="EditBirthdayScreen"
                component={EditBirthdayScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <ProfileSEStack.Screen
                name="EditPhoneScreen"
                component={EditPhoneScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <ProfileSEStack.Screen
                name="EditUsernameScreen"
                component={EditUsernameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <ProfileSEStack.Screen
                name="EditGalleryScreen"
                component={EditGalleryScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <ProfileSEStack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <ProfileSEStack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
        </ProfileSEStack.Navigator>
    )
}

const SearchSEStack = createSharedElementStackNavigator()
const SearchSharedElementStack = () => {
    return (
        <SearchSEStack.Navigator
            mode="modal"
            initialRouteName="SearchScreen"
            screenOptions={{
                useNativeDriver: true,
                transitionSpec: {
                    open: iosTransitionSpec,
                    close: iosTransitionSpec,
                },
            }}
            detachInactiveScreens={true}
        >
            <SearchSEStack.Screen
                name="DashboardScreen"
                component={FeedScreen}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                }}
            />
            <SearchSEStack.Screen
                name="GalleryView"
                component={GalleryView}
                options={() => ({
                    headerShown: false,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    // gestureResponseDistance: gestureResponseVertical,
                    // gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: galleryID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            <SearchSEStack.Screen
                name="GalleryDetailScreen"
                component={GalleryDetailScreen}
                options={() => ({
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                })}
                sharedElementsConfig={(route) => {
                    const { picID } = route.params
                    return [
                        {
                            id: Platform.OS === 'android' ? picID : picID,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                        },
                    ]
                }}
            />
            <SearchSEStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={() => ({
                    headerShown: false,
                    // animationEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                })}
                // sharedElementsConfig={(route) => {
                //     return [
                //         {
                //             id: '1',
                //             animation:
                //                 Platform.OS === 'android' ? 'fade-out' : null,
                //             resize: 'auto',
                //         },
                //     ]
                // }}
            />
            <SearchSEStack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
                options={{
                    headerShown: false,
                    useNativeDriver: true,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
                sharedElementsConfig={(navigation) => {
                    const animatePlease = navigation.name === 'ProfileScreen'
                    console.log(
                        '🚀 ~ file: navigation.js ~ line 292 ~ DashModalStack ~ animatePlease',
                        animatePlease
                    )
                    return [
                        {
                            id: animatePlease ? '1' : null,
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : null,
                            resize: 'auto',
                        },
                    ]
                }}
            />

            <SearchSEStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                    // ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <SearchSEStack.Screen
                name="OtherProfileScreen"
                component={OtherProfileScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />

            <SearchSEStack.Screen
                name="OtherGalleryView"
                component={OtherGalleryView}
                options={() => ({
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                })}
                sharedElementsConfig={(route) => {
                    const { galleryID, galName } = route.params
                    return [
                        {
                            id: [galleryID],
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                            align: 'auto',
                        },
                        {
                            id: [galleryID + galName],
                            animation: 'fade',
                            resize: 'clip',
                            align: 'auto',
                        },
                    ]
                }}
            />
            {/* ALL HORIZONTAL SCREENS BELLOW */}
            <SearchSEStack.Screen
                name="ProfileFollowsScreen"
                component={ProfileFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <SearchSEStack.Screen
                name="OtherFollowsScreen"
                component={OtherFollowsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: { horizontal: 1000 },
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            {/* ALL EDIT SCREENS BELLOW */}
            <SearchSEStack.Screen
                name="EditNameScreen"
                component={EditNameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <SearchSEStack.Screen
                name="EditBirthdayScreen"
                component={EditBirthdayScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <SearchSEStack.Screen
                name="EditPhoneScreen"
                component={EditPhoneScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <SearchSEStack.Screen
                name="EditUsernameScreen"
                component={EditUsernameScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <SearchSEStack.Screen
                name="EditGalleryScreen"
                component={EditGalleryScreen}
                options={{
                    headerShown: false,
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                }}
            />
            <SearchSEStack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <SearchSEStack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
        </SearchSEStack.Navigator>
    )
}

const CommonSharedElementStack = createSharedElementStackNavigator()
const FeedModalsSharedElementStack = () => {
    return (
        <CommonSharedElementStack.Navigator
            mode="modal"
            initialRouteName="BottomTabNav"
            screenOptions={{
                headerShown: false,
                useNativeDriver: true,
                transitionSpec: {
                    open: iosTransitionSpec,
                    close: iosTransitionSpec,
                },
            }}
            detachInactiveScreens={true}
        >
            <CommonSharedElementStack.Screen
                name="BottomTabNav"
                component={BottomTabNav}
                screenOptions={{
                    headerShown: false,
                    useNativeDriver: true,
                    transitionSpec: {
                        open: iosTransitionSpec,
                        close: iosTransitionSpec,
                    },
                }}
                detachInactiveScreens={true}
            />
            <CommonSharedElementStack.Screen
                name="PhotoEditScreen"
                component={PhotoEditScreen}
                options={{
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                }}
                sharedElementsConfig={(route) => {
                    return [
                        {
                            id: '1',
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                        },
                    ]
                }}
            />
            <CommonSharedElementStack.Screen
                name="OtherProfilePhotoScreen"
                component={OtherProfilePhotoScreen}
                options={{
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                    gestureResponseDistance: gestureResponseVertical,
                    gestureDirection: gestureDirectionVertical,
                    cardStyleInterpolator: cardStyleInterpolatorFunc,
                }}
                sharedElementsConfig={(route) => {
                    return [
                        {
                            id: '2',
                            animation:
                                Platform.OS === 'android' ? 'fade-out' : 'move',
                            resize: 'auto',
                        },
                    ]
                }}
            />
            <CommonSharedElementStack.Screen
                name="CreateEventScreen"
                component={CreateEventScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    // gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
            <CommonSharedElementStack.Screen
                name="QrCodeScreen"
                component={QrCodeScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureResponseDistance: gestureResponseHorizontal,
                    gestureDirection: gestureDirectionHorizontal,
                }}
            />
        </CommonSharedElementStack.Navigator>
    )
}
const BottomTab = createBottomTabNavigator()
const BottomTabNav = ({ state, descriptors, navigation, route }) => {
    const homeLottieRef = useRef()
    const searchLottieRef = useRef()
    const profileLottieRef = useRef()

    const focusedScreen = getFocusedRouteNameFromRoute(route)

    // green on camera permissions
    const greenLightOnPermissions = useSelector(
        (state) => state.permissionsReducer.permissions.camera
    )
    console.log(
        '🚀 ~ file: navigation.js ~ line 1149 ~ BottomTabNav ~ greenLightOnPermissions',
        greenLightOnPermissions
    )

    //----------------------------------------------------------------TAB BAR BUTTON FUNCTIONS----------------------------------------------------------------
    const feedPressed = () => {
        if (focusedScreen === 'FeedSEStack') {
            navigation.navigate('FeedSEStack', { screen: 'DashboardScreen' })
        } else {
            navigation.navigate('FeedSEStack')
        }
        homeLottieRef.current?.play()
    }
    const searchPressed = () => {
        if (focusedScreen === 'SearchSEStack') {
            navigation?.navigate('SearchSEStack', { screen: 'SearchScreen' })
        } else {
            navigation.navigate('SearchSEStack')
        }
        searchLottieRef.current?.play()
    }
    const profilePressed = () => {
        if (focusedScreen === 'ProfileSEStack') {
            navigation?.navigate('ProfileSEStack', { screen: 'ProfileScreen' })
        } else {
            navigation.navigate('ProfileSEStack')
        }
        profileLottieRef.current?.play()
    }

    const cameraPressed = async () => {
        if (greenLightOnPermissions === 'granted') {
            navigation.navigate('CameraScreen')
        } else {
            const { status } = await Camera.getPermissionsAsync()
            const audioStatus = await Audio.getPermissionsAsync()

            // setHasCameraPermission(status === 'granted')
            if (status && audioStatus.status === 'granted') {
                dispatch(loadPermissions('granted'))
                navigation.navigate('CameraScreen')
            } else if (status || audioStatus.status === 'undetermined') {
                const results = await Camera.requestPermissionsAsync()
                const audioResults = await Audio.requestPermissionsAsync()
                if (results.status && audioResults.status === 'granted') {
                    navigation.navigate('CameraScreen')
                } else if (results.status || audioResults.status === 'denied') {
                    sendUserToSettingsHandler()
                    return
                }
            } else if (status || audioResults.status === 'denied') {
                const results2 = await Camera.requestPermissionsAsync()
                const audioResults2 = await Audio.requestPermissionsAsync()
                if (results2.status && audioResults2 === 'granted') {
                    navigation.navigate('CameraScreen')
                } else {
                    sendUserToSettingsHandler()
                    return
                }
            }
        }
    }

    const openSettings = useCallback(
        Platform.select({
            ios: async () => {
                const supported = await Linking.canOpenURL('app-settings:')
                try {
                    if (!supported) {
                        //Can't handle settings url
                        Alert.alert(
                            'Failed to Open Settings',
                            'Please go to this app settings manually.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                            ]
                        )
                    } else {
                        return Linking.openURL('app-settings:')
                    }
                } catch (err) {
                    Alert.alert(
                        'Something Went Wrong.',
                        'Please try again later.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ]
                    )
                }
            },
            android: () => {
                Linking.openSettings()
            },
        }),
        []
    )

    const alertMessage =
        'Turn on camera permissions to allow EventShare to take pictures, videos, and scan QR codes.'

    const sendUserToSettingsHandler = useCallback(
        Platform.select({
            ios: () => {
                Alert.alert(
                    'EventShare Needs Access to Your Camera',
                    alertMessage,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Settings',
                            onPress: () => {
                                openSettings()
                            },
                        },
                    ]
                )
            },
            android: () => {
                Alert.alert(
                    'EventShare Needs Access to Your Camera',
                    alertMessage,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Settings',
                            onPress: () => {
                                openSettings()
                            },
                        },
                    ]
                )
            },
        }),
        []
    )
    //----------------------------------------------------------------TAB BAR BUTTON FUNCTIONS----------------------------------------------------------------
    const test = showHideBottomTab(route)
    console.log(
        '🚀 ~ file: navigation.js ~ line 1313 ~ BottomTabNav ~ test',
        test
    )
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBarOptions={{
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    position: 'absolute',
                },
            }}
        >
            <BottomTab.Screen
                name="FeedSEStack"
                component={FeedSharedElementStack}
                options={({ route }) => ({
                    tabBarLabel: 'Feed',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={feedPressed}
                            >
                                {focused ? null : (
                                    <HomeSVG size={30} color={colors.grey} />
                                )}
                                {focused ? (
                                    <LottieView
                                        ref={homeLottieRef}
                                        style={{
                                            width: 28,
                                            height: 28,
                                        }}
                                        source={require('../../assets/homeLottie.json')}
                                        loop={false}
                                        autoPlay={false}
                                        speed={1}
                                    />
                                ) : null}
                            </View>
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <Pressable
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...props}
                                onPress={feedPressed}
                            >
                                {props.children}
                            </Pressable>
                        )
                    },
                    tabBarVisible: showHideBottomTab(route),
                })}
            />
            <BottomTab.Screen
                name="SearchSEStack"
                component={SearchSharedElementStack}
                options={({ route }) => ({
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? null : (
                                    <SearchSVG size={24} color={colors.grey} />
                                )}
                                {focused ? (
                                    <LottieView
                                        ref={searchLottieRef}
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                        source={require('../../assets/searchLottie.json')}
                                        loop={false}
                                        autoPlay={false}
                                        speed={1.5}
                                    />
                                ) : null}
                            </View>
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <Pressable
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...props}
                                onPress={searchPressed}
                            >
                                {props.children}
                            </Pressable>
                        )
                    },
                    tabBarVisible: showHideBottomTab(route),
                })}
            />

            <BottomTab.Screen
                name="PlusButton"
                component={SearchSharedElementStack}
                options={{
                    tabBarButton: (...props) => {
                        return <FloatingButton {...props}></FloatingButton>
                    },
                }}
            />

            <BottomTab.Screen
                name="ProfileSEStack"
                component={ProfileSharedElementStack}
                options={({ route }) => ({
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? null : (
                                    <PersonSVG size={24} color={colors.grey} />
                                )}
                                {focused ? (
                                    <LottieView
                                        ref={profileLottieRef}
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                        source={require('../../assets/personLottie.json')}
                                        loop={false}
                                        autoPlay={false}
                                        speed={1}
                                    />
                                ) : null}
                            </View>
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <Pressable
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...props}
                                onPress={profilePressed}
                            >
                                {props.children}
                            </Pressable>
                        )
                    },
                    tabBarVisible: showHideBottomTab(route),
                })}
            />
            <BottomTab.Screen
                name="Camera"
                component={CameraScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, ...props }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...props}
                            >
                                <CameraSVG size={40} color={colors.grey} />
                            </View>
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <Pressable
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...props}
                                onPress={cameraPressed}
                            >
                                {props.children}
                            </Pressable>
                        )
                    },
                    tabBarVisible: showHideBottomTab(route),
                })}
            />
        </BottomTab.Navigator>
    )
}

const Drawer = createDrawerNavigator()
function DrawerNav({ navigation, route }) {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            drawerStyle={{
                width: '60%',
            }}
            // initialRouteName="DashboardScreen"
            drawerContentOptions={{
                activeTintColor: colors.textColor,
                activeBackgroundColor: colors.buttonPinkTransparent,
            }}
            detachInactiveScreens={true}
            screenOptions={{
                transitionSpec: {
                    open: iosTransitionSpec,
                    close: iosTransitionSpec,
                },
            }}
        >
            <Drawer.Screen
                name="DashModalStack"
                component={FeedModalsSharedElementStack}
                options={({ route }) => ({
                    drawerLabel: 'Home',
                    drawerIcon: (config) => (
                        <Ionicons
                            name="home-outline"
                            color={config.color}
                            size={config.size}
                        />
                    ),
                    // unmountOnBlur: true
                    /*Whether this screen should be unmounted when navigating away from it.
                    Unmounting a screen resets any local state in the screen as well as state
                    of nested navigators in the screen. Defaults to false.*/
                    swipeEnabled: getDrawerState(route),
                })}
            />
            <Drawer.Screen
                name="NotificationTest"
                component={NotificationTest}
                options={({ route }) => ({
                    drawerLabel: 'Notification Test',
                    drawerIcon: (config) => (
                        <Ionicons
                            name="home-outline"
                            color={config.color}
                            size={config.size}
                        />
                    ),

                    swipeEnabled: getDrawerState(route),
                })}
            />
            <Drawer.Screen
                name="ProfileTest"
                component={ProfileTest}
                options={({ route }) => ({
                    drawerLabel: 'Profile Test',
                    drawerIcon: (config) => (
                        <Ionicons
                            name="home-outline"
                            color={config.color}
                            size={config.size}
                        />
                    ),

                    swipeEnabled: getDrawerState(route),
                })}
            />
        </Drawer.Navigator>
    )
}

const AppNavigator = () => {
    //----------------------------------------------------------------PERMISSION CHECKER----------------------------------------------------------------
    const dispatch = useDispatch()
    const checkPermission = useCallback(async () => {
        const { status } = await Camera.getPermissionsAsync()
        const audioStatus = await Audio.getPermissionsAsync()

        if (status && audioStatus.status === 'granted') {
            await dispatch(loadPermissions('granted'))
        } else if (status === 'undetermined') {
            await dispatch(loadPermissions('undetermined'))
        } else if (status === 'denied') {
            await dispatch(loadPermissions('denied'))
        }
    }, [])
    useEffect(() => {
        checkPermission()
    }, [dispatch])
    //----------------------------------------------------------------PERMISSION CHECKER----------------------------------------------------------------
    const navigationRef = useRef()
    const routeNameRef = useRef()
    const scheme = useColorScheme()

    // const LightTheme = {
    //     dark: false,
    //     colors: {
    //         primary: 'rgb(255, 45, 85)',
    //         background: 'rgb(242, 242, 242)',
    //         card: 'rgb(255, 255, 255)',
    //         text: 'rgb(28, 28, 30)',
    //         border: 'rgb(199, 199, 204)',
    //         notification: 'rgb(255, 69, 58)',
    //         button: 'purple',
    //     },
    // }
    // const DarkTheme = {
    //     dark: false,
    //     colors: {
    //         primary: 'rgb(255, 45, 85)',
    //         background: 'rgb(242, 242, 242)',
    //         card: 'rgb(255, 255, 255)',
    //         text: 'rgb(28, 28, 30)',
    //         border: 'rgb(199, 199, 204)',
    //         notification: 'rgb(255, 69, 58)',
    //         button: 'red',
    //     },
    // }
    return (
        <NavigationContainer
        // theme={scheme === 'dark' ? DarkTheme : LightTheme}
        // onStateChange={async () => {
        //     const previousRouteName = routeNameRef.current
        //     const currentRouteName =
        //         navigationRef.current.getCurrentRoute().name

        //     if (previousRouteName !== currentRouteName) {
        //         // The line below uses the expo-firebase-analytics tracker
        //         // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
        //         // Change this line to use another Mobile analytics SDK
        //         await Analytics.setCurrentScreen(currentRouteName)
        //     }

        //     // Save the current route name for later comparison
        //     routeNameRef.current = currentRouteName
        // }}
        >
            <MainStack.Navigator
                screenOptions={{
                    transitionSpec: {
                        open: iosTransitionSpec,
                        close: iosTransitionSpec,
                    },
                }}
            >
                <MainStack.Screen
                    name="StartUpScreen"
                    component={StartUpScreen}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                    detachInactiveScreens={true}
                />
                <MainStack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                    detachInactiveScreens={true}
                />

                <MainStack.Screen
                    name="SignUpNavigation"
                    component={SignUpNavigation}
                    options={{
                        headerShown: false,
                    }}
                />

                <MainStack.Screen
                    name="DrawerNav"
                    component={DrawerNav}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                        gestureEnabled: false,
                    }}
                />
                <MainStack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                    options={() => ({
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                        gestureResponseDistance: { horizontal: 1000 },
                        gestureDirection: gestureDirectionHorizontal,
                    })}
                />
                <MainStack.Screen
                    name="JoinEventScreen"
                    component={JoinEventScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                        gestureResponseDistance: gestureResponseHorizontal,
                        gestureDirection: gestureDirectionHorizontal,
                    }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
