import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Platform,
    TouchableOpacity,
    Pressable,
} from 'react-native'
import * as IosTouchable from 'react-native-gesture-handler'

//ionicons
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'react-native-elements'

//colors
import colors from '../constants/colors'

const { width, height } = Dimensions.get('window')

const CustomHeaderBasic = (props) => {
    let TouchableCmp = IosTouchable.TouchableOpacity

    if (Platform.OS === 'android') {
        TouchableCmp = TouchableOpacity
    }

    const iconStyle =
        props.iconName === 'menu-outline' || props.rightIcon === 'add'
            ? {
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
              }
            : null

    let defaultIcon = 'chevron-back-outline'
    if (Platform.OS === 'android') {
        defaultIcon = 'chevron-back-outline'
    }
    return (
        <View style={{ ...styles.outerCont, ...props.style }}>
            <View style={styles.middleCont}>
                <Text
                    style={{ ...styles.headerText, ...props.headerColor }}
                    maxFontSizeMultiplier={colors.maxFontSizeMultiplier}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {props?.header}
                </Text>
                {props.transitionedHeader}
            </View>
            <View style={styles.xCont}>
                <TouchableCmp onPress={props.goBack}>
                    {/* <View style={styles.circle}> */}
                    <Ionicons
                        name={props.iconName ? props.iconName : defaultIcon}
                        size={30}
                        color={colors.darkestColorP1}
                        style={iconStyle}
                    />
                    {/* </View> */}
                </TouchableCmp>
                {props.rightButton || props.rightButtonWithText ? (
                    <View style={styles.rightButtonsCont}>
                        {props.secondRightButton ? (
                            <Pressable onPress={props.onPressSecondRight}>
                                {/* <View style={styles.circle}> */}
                                <Ionicons
                                    name={
                                        props.secondRightIcon
                                            ? props.secondRightIcon
                                            : null
                                    }
                                    size={
                                        props.secondRightIconSize
                                            ? props.secondRightIconSize
                                            : 30
                                    }
                                    color={colors.darkestColorP1}
                                    style={styles.rightIcons}
                                    maxFontSizeMultiplier={
                                        colors.maxFontSizeMultiplier
                                    }
                                />
                                {/* </View> */}
                            </Pressable>
                        ) : null}
                        {props.rightButton ? (
                            <TouchableCmp onPress={props.onPressRight}>
                                {/* <View style={styles.circle}> */}
                                <Ionicons
                                    name={
                                        props.rightIcon ? props.rightIcon : null
                                    }
                                    size={
                                        props.rightIconSize
                                            ? props.rightIconSize
                                            : 30
                                    }
                                    color={colors.darkestColorP1}
                                    style={styles.rightIcons}
                                    maxFontSizeMultiplier={
                                        colors.maxFontSizeMultiplier
                                    }
                                />
                                {/* </View> */}
                            </TouchableCmp>
                        ) : null}
                        {props.rightButtonWithText ? (
                            <TouchableCmp onPress={props.onRightButtonPressed}>
                                <View style={styles.headerBCont}>
                                    <Text
                                        style={styles.rightButtonText}
                                        maxFontSizeMultiplier={
                                            colors.maxFontSizeMultiplier
                                        }
                                    >
                                        {props.rightButtonText}
                                    </Text>
                                </View>
                            </TouchableCmp>
                        ) : null}
                    </View>
                ) : null}
            </View>
            <View style={styles.children}>{props.children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerCont: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0)',
    },
    xCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0)',

        // paddingTop: 5,
    },
    middleCont: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        height: 40,
        backgroundColor: 'rgba(255,255,255,0)',
    },
    rightButtonsCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: colors.semiBold,
    },
    rightIcons: {
        marginLeft: 10,
    },
    circle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.lightTint,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 10,
        },
    },
    children: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
    },

    //right button text button styles
    headerBCont: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        paddingVertical: 5,
    },

    rightButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: colors.font,
    },
})

export default CustomHeaderBasic
