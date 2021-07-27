import React, {
    useCallback,
    useRef,
    useMemo,
    useImperativeHandle,
    forwardRef,
    useState,
} from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    BottomSheetFlatList,
    BottomSheetView,
    BottomSheetBackdrop,
    useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'

//file system
import * as FileSystem from 'expo-file-system'

//safe area
import { useSafeAreaInsets } from 'react-native-safe-area-context'

//ionicons
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'react-native-elements'

//colors
import colors from '../constants/colors'

//redux
import { deleteGallery } from '../store/event/action'
import { useDispatch, useSelector } from 'react-redux'

const CustomHandleComponent = () => {
    return <View style={{ borderRadius: 20, width: '100%', height: 15 }}></View>
}
const ActionBottomSheet = forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
    const [showConfirm, setShowConfirm] = useState(false)

    const bottomSheetModalRef = useRef()
    const snapPoints = useMemo(() => [150, 150, 200], [])
    useImperativeHandle(ref, () => ({
        handlePresentModalPress: () => {
            bottomSheetModalRef.current.present()
        },
    }))
    const handleSheetChangesModal = useCallback((index) => {}, [])

    //----------------------------------------------------------------DELETING GALLERY----------------------------------------------------------------
    const deleteGalleryHandler = useCallback(async () => {
        await dispatch(deleteGallery(props.galleryID))
        bottomSheetModalRef.current?.close()
        props.refreshGalleryList()
    }, [props])
    //----------------------------------------------------------------DELETING GALLERY----------------------------------------------------------------

    //----------------------------------------------------------------CONFIRMATION ANIMATION----------------------------------------------------------------
    const animatedOpacity = useSharedValue(0)
    const opacity = useAnimatedStyle(() => {
        return {
            opacity: animatedOpacity.value,
        }
    })
    const animate = () => {
        animatedOpacity.value = withTiming(1, { duration: 200 })
    }
    //----------------------------------------------------------------CONFIRMATION ANIMATION----------------------------------------------------------------

    //----------------------------------------------------------------ANIMATION CONFIG----------------------------------------------------------------
    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 200,
    })
    //----------------------------------------------------------------ANIMATION CONFIG----------------------------------------------------------------

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundComponent={null}
                animationConfigs={animationConfigs}
                // onChange={handleSheetChangesModal}
                backdropComponent={({ animatedIndex, style }) => {
                    const containerAnimatedStyle = useAnimatedStyle(() => ({
                        opacity: interpolate(
                            animatedIndex.value,
                            [0, 1],
                            [0, 1],
                            Extrapolate.CLAMP
                        ),
                    }))
                    const containerStyle = useMemo(
                        () => [
                            style,
                            {
                                backgroundColor: 'rgba(32,32,32,0.54)',
                            },
                            containerAnimatedStyle,
                        ],
                        [style, containerAnimatedStyle]
                    )
                    return (
                        <Animated.View
                            style={containerStyle}
                            onTouchStart={() => {
                                animatedOpacity.value = 0
                                bottomSheetModalRef.current?.close()
                            }}
                        />
                    )
                }}
                dismissOnPanDown={true}
                handleComponent={CustomHandleComponent}
                style={{ backgroundColor: 'transparent' }}
            >
                <View
                    style={{
                        paddingBottom: insets.bottom,
                        height: 101,
                        backgroundColor: 'white',
                        marginHorizontal: 15,
                        borderRadius: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            bottomSheetModalRef.current?.snapTo(2)
                            animate()
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            height: 50,
                        }}
                    >
                        <Text
                            style={styles.deleteText}
                            maxFontSizeMultiplier={colors.maxFontSizeMultiplier}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: '#e0e0e0',
                        }}
                    ></View>
                    <TouchableOpacity
                        onPress={() => {
                            bottomSheetModalRef.current?.snapTo(2)
                            animate()
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            height: 50,
                        }}
                    >
                        <Text
                            style={styles.darkText}
                            maxFontSizeMultiplier={colors.maxFontSizeMultiplier}
                        >
                            Make Private
                        </Text>
                    </TouchableOpacity>
                    <Animated.View style={[styles.actionButton2, opacity]}>
                        <Text
                            style={styles.confirmQuestion}
                            maxFontSizeMultiplier={colors.maxFontSizeMultiplier}
                        >
                            Are you sure?
                        </Text>
                        <View style={styles.yesNo}>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteGalleryHandler()
                                    animatedOpacity.value = 0
                                    bottomSheetModalRef.current?.close()
                                    props.refreshGalleryList()
                                }}
                            >
                                <Text
                                    style={styles.confirmQuestion}
                                    maxFontSizeMultiplier={
                                        colors.maxFontSizeMultiplier
                                    }
                                >
                                    Yes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    animatedOpacity.value = 0
                                    bottomSheetModalRef.current?.close()
                                }}
                            >
                                <Text
                                    style={styles.confirmQuestion}
                                    maxFontSizeMultiplier={
                                        colors.maxFontSizeMultiplier
                                    }
                                >
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </BottomSheetModal>
            {/* {showConfirm && (
                <View style={[...styles.modal, StyleSheet.absoluteFill]}>
                    <Card></Card>
                </View>
            )} */}
        </BottomSheetModalProvider>
    )
})

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 2,
    },
    actionButton: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: 10,
        alignItems: 'center',
    },
    actionButton2: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    deleteText: {
        color: 'red',
        fontSize: 20,
    },
    darkText: {
        fontSize: 20,
    },
    yesNo: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 100,
        marginRight: 20,
    },
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ActionBottomSheet
