import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Dimensions,
    Linking,
    Alert,
    View,
    Text,
    FlatList,
    Modal,
    Pressable,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//components
import ScreenWrapper from '../components/ScreenWrapper'
import HeaderBasic from '../components/HeaderBasic'
import Button from '../components/Button'
import BottomNavBar from '../components/BottomNavBar'
import NuemorphicNavBar from '../components/NuemorphicNavBar'
import StatsContainer from '../components/ProfileScreen/StatsContainer'
import ProfileTopElements from '../components/ProfileScreen/ProfileTopElements'
import Thumbnail from '../components/Thumbnail'
import ThumbnailSmall from '../components/ThumbnailSmall'
import ProfileTabBar from '../components/ProfileScreen/ProfileTabBar'
import DeleteConfirmation from '../components/DeleteConfirmation'
import ActionBottomSheet from '../components/ActionBottomSheet'

//redux
import { loadPermissions } from '../store/permissions/actions'
import {
    setGalleries,
    shouldRefreshSet,
    setTaggedGalleries,
    deleteGallery,
} from '../store/event/action'
import {
    setShouldRefreshProfile,
    loadProfile,
} from '../store/signup-auth/actions'
import { useDispatch, useSelector } from 'react-redux'

//colors
import colors from '../constants/colors'

//safe area
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// big list
import BigList from 'react-native-big-list'

const { width } = Dimensions.get('window')

//expo camera
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'

//useFocus InteractionManager
import { InteractionManager } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

//ionicons
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'react-native-elements'

const loadNumber = 10
let page = 1

const ProfileScreen = (props) => {
    //personal info
    const personalInfo = useSelector((state) => state.signupReducer.userInfo)
    // console.log(
    //     '🚀 ~ file: ProfileScreen.js ~ line 53 ~ ProfileScreen ~ personalInfo',
    //     personalInfo
    // )
    const showBackButton = props?.route?.params?.showBackButton
    //insets
    const insets = useSafeAreaInsets()

    //dispatch
    const dispatch = useDispatch()

    // sheet ref
    const bottomSheetRef = useRef()

    //is focused
    const isFocused = useIsFocused()

    // for animating tabBar
    const animatedTabBarRef = useRef()

    //for scrolling To X position
    const pagerScrollViewRef = useRef()

    //tab bar height
    const tabBarHeight = useBottomTabBarHeight()

    let shouldAnimateProfile
    shouldAnimateProfile = props.route.params?.shouldAnimateProfile

    console.log('loaded profile screen')

    //----------------------------------------------------------------ACTION SHEET LOGIC---------------------------------------------------------------
    const [showConfirmationBool, setShowConfirmationBool] = useState()
    const [deleteID, setDeleteID] = useState({ id: '', index: '' })

    const showConfirmation = useCallback(() => {
        setTimeout(() => {
            setShowConfirmationBool(true)
        }, 180)
    }, [])

    const dismissConfirmation = useCallback(() => {
        setTimeout(() => {
            setShowConfirmationBool(false)
            setOpenModal(false)
        }, 150)
    }, [])

    const onConfirmPressed = useCallback(async () => {
        try {
            await dispatch(deleteGallery(deleteID))
            setTimeout(() => {
                setShowConfirmationBool(false)
                setOpenModal(false)
            }, 150)
        } catch (err) {
            console.log('Error deleting gallery', err)
        }
    }, [deleteID])

    //----------------------------------------------------------------ACTION SHEET LOGIC--------------------------------------------------------------

    //----------------------------------------------------------------LOAD GALLERIES----------------------------------------------------------------
    const [loadingGalleries, setLoadingGalleries] = useState(false)

    const galleries = useSelector((state) => state.galleryReducer.galleries)

    const taggedGalleries = [
        {
            eventDate: '2021-07-26',
            galleryID: '300',
            galleryName: 'Gacias Grad',
            thumbnail: 'http://144.126.212.5/uploads/thumb/60fe3ca1c6950.webp',
        },
        {
            eventDate: '2021-08-06',
            galleryID: '657',
            galleryName: 'Fmdjdjd',
            thumbnail: 'none',
        },
        {
            eventDate: '2021-08-06',
            galleryID: '74',
            galleryName: 'Vcff',
            thumbnail: 'none',
        },
        {
            eventDate: '2021-08-11',
            galleryID: '856',
            galleryName: 'Couples Trip ',
            thumbnail: 'http://144.126.212.5/uploads/thumb/61143fa3c8988.webp',
        },
        {
            eventDate: '2021-08-13',
            galleryID: '8979',
            galleryName: 'Test',
            thumbnail: 'http://144.126.212.5/uploads/thumb/6116ac2b68302.webp',
        },
        {
            eventDate: '2021-08-14',
            galleryID: '4797',
            galleryName: 'Yhhhh',
            thumbnail: 'http://144.126.212.5/uploads/thumb/611759a5676dd.webp',
        },
    ]

    const shouldRefresh = useSelector(
        (state) => state.galleryReducer.shouldRefresh
    )

    const loadGalleries = useCallback(async () => {
        // setLoadingGalleries(true)
        // setError(null)
        page = 1
        try {
            await dispatch(setGalleries(null, loadNumber, page, true))
        } catch (error) {
            // setError(error.message)
        }
        // setLoadingGalleries(false)
    }, [dispatch])

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            loadGalleries()
        })
        return () => task.cancel()
    }, [])

    useFocusEffect(() => {
        const refreshConditionally = async () => {
            if (shouldRefresh) {
                loadGalleries()
                await dispatch(shouldRefreshSet(false))
            }
        }
        refreshConditionally()
    })
    //----------------------------------------------------------------LOAD GALLERIES----------------------------------------------------------------

    //----------------------------------------------------------------LOAD TAGGED GALLERIES----------------------------------------------------------------
    const shouldRefreshTaggedGalleries = useSelector(
        (state) => state.galleryReducer.shouldRefresh
    )

    const loadTaggedGalleries = useCallback(async () => {
        // setLoadingGalleries(true)
        // setError(null)
        try {
            await dispatch(setTaggedGalleries(userID))
        } catch (error) {
            // setError(error.message)
        }
        // setLoadingGalleries(false)
    }, [dispatch])

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            loadTaggedGalleries()
        })
        return () => task.cancel()
    }, [])

    useFocusEffect(() => {
        const refreshConditionally = async () => {
            if (shouldRefreshTaggedGalleries) {
                loadTaggedGalleries()
                await dispatch(shouldRefreshSet(false))
            }
        }
        refreshConditionally()
    })
    //----------------------------------------------------------------LOAD TAGGED GALLERIES----------------------------------------------------------------

    //----------------------------------------------------------------FLAT LIST FUNCTIONS--------------------------------------------------------------
    const galleryPressedHandler = useCallback((galleryID, thumbnail, index) => {
        props.navigation.navigate('GalleryView', {
            galleryID,
            thumbnail,
            index,
        })
    }, [])

    const [openModal, setOpenModal] = useState(false)
    const oneEllipsisPressed = useCallback((galleryID, index) => {
        setOpenModal(true)
        setTimeout(() => {
            bottomSheetRef.current?.handlePresentModalPress()
        }, 50)
        setDeleteID({ id: galleryID, index: index })
    }, [])

    const closeModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><GALLERIES ITEMS><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    const renderMyGalleries = useCallback(({ item, index }) => {
        return (
            <Thumbnail
                images={item}
                galleryPressedHandler={() => {
                    galleryPressedHandler(item.galleryID, item.thumbnail, index)
                }}
                navigation={props.navigation}
                galleryName={item.galleryName}
                oneEllipsisPressed={() => {
                    oneEllipsisPressed(item.galleryID, index)
                }}
                key={item.galleryID}
                imageURI={`${item.thumbnail}`}
            />
        )
    }, [])
    const itemHeightMyGalleries = useMemo(() => width / 2 + 40)

    const layOutMyGalleries = useCallback(
        (data, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
        }),
        []
    )
    const keyExtractorMyGalleries = useCallback(
        (item) => `${item.galleryID}`,
        []
    )
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><GALLERIES ITEMS><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><LIKED PICS><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    const pics = useSelector((state) => state.galleryReducer.pics)

    const keyExtractorLiked = useCallback((item) => item.id, [])

    const getItemLayoutLiked = useCallback(
        (data, index) => ({
            length: width / 2,
            offset: (width / 2) * index,
            index: index,
        }),
        []
    )

    const renderLiked = useCallback(({ item, index }) => {
        return (
            <ThumbnailSmall
                key={item.id}
                images={item}
                picturePressedHandler={() => {
                    picturePressedHandler(pics, index, item.id, item.fullPath)
                }}
                navigation={props.navigation}
            />
        )
    }, [])

    const itemHeightLiked = useMemo(() => width / 2 + 40)
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><LIKED PICS><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

    const RenderHeader = useCallback(() => {
        return (
            <ProfileTopElements
                normalizedSource={normalizedSource}
                handleProfilePhotoPressed={handleProfilePhotoPressed}
                profileInfo={personalInfo}
                isCurrentUser={true}
            >
                <Button
                    text="Edit"
                    textStyle={{ color: colors.darkGrey }}
                    style={styles.button}
                    onPress={editPressedHandler}
                />
                {/* <Pressable
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}
                    onPress={editPressedHandler}
                >
                    <Icon
                        name="edit-2"
                        type="feather"
                        size={20}
                        color="white"
                    />
                </Pressable> */}
                <StatsContainer
                    followingCount={personalInfo?.followingCount}
                    followersCount={personalInfo?.followersCount}
                    followingsPressedHandler={() => {
                        followingsPressedHandler('following')
                    }}
                    followersPressedHandler={() => {
                        followingsPressedHandler('followers')
                    }}
                />
            </ProfileTopElements>
        )
    }, [personalInfo])

    const RenderSectionHeader = useCallback(() => {
        return (
            <ProfileTabBar
                ref={animatedTabBarRef}
                onLeftPressed={() => {
                    // setListShown('galleries')
                    myGalleriesPressed()
                }}
                onMiddlePressed={() => {
                    // setListShown('liked')
                    taggedGalleriesPressed()
                }}
            />
        )
    }, [])

    const onEndReached = useCallback(async () => {
        const nextPage = (page += 1)
        if (activePage === 'myGalleries') {
            try {
                await dispatch(setGalleries(null, loadNumber, nextPage))
            } catch (error) {
                // setError(error.message)
            }
        }

        if (activePage === 'taggedGalleries') {
            // try {
            //     await dispatch(setGalleries(null, loadNumber, nextPage))
            // } catch (error) {
            //     // setError(error.message)
            // }
        }

        if (activePage === 'likedContent') {
            // try {
            //     await dispatch(setGalleries(null, loadNumber, nextPage))
            // } catch (error) {
            //     // setError(error.message)
            // }
        }
    }, [activePage])
    //----------------------------------------------------------------FLAT LIST FUNCTIONS--------------------------------------------------------------

    //----------------------------------------------------------------PROFILE PHOTO PRESSED----------------------------------------------------------------
    const handleProfilePhotoPressed = useCallback(() => {
        props.navigation.push('PhotoEditScreen', { id: '1' })
    }, [])
    //----------------------------------------------------------------PROFILE PHOTO PRESSED----------------------------------------------------------------

    //----------------------------------------------------------------EDIT PRESSED HANDLER----------------------------------------------------------------
    const editPressedHandler = useCallback(() => {
        props.navigation.push('ProfileEditScreen', { id: '1' })
    }, [])
    //----------------------------------------------------------------EDIT PRESSED HANDLER----------------------------------------------------------------

    //----------------------------------------------------------------FOLLOWINGS PRESSED HANDLER----------------------------------------------------------------
    const followingsPressedHandler = useCallback((followType) => {
        props.navigation.push('ProfileFollowsScreen', {
            username: personalInfo?.userName,
            userID: personalInfo?.userID,
            followType: followType,
        })
    }, [])
    //----------------------------------------------------------------FOLLOWINGS PRESSED HANDLER----------------------------------------------------------------

    //----------------------------------------------------------------NORMALIZE URI----------------------------------------------------------------
    const normalizedSource = useCallback(() => {
        const imageString = `${personalInfo?.avatarThumbPath}`
        const normalizedSource =
            imageString &&
            typeof imageString === 'string' &&
            !imageString.split('http')[1]
                ? null
                : imageString
        return normalizedSource
    }, [personalInfo?.avatarThumb])
    //----------------------------------------------------------------NORMALIZE URI----------------------------------------------------------------

    //----------------------------------------------------------------ANIMATED TAB BAR BUTTONS----------------------------------------------------------------
    const myGalleriesPressed = useCallback(() => {
        pagerScrollViewRef.current?.scrollTo({ x: 0, animated: true })
    }, [])

    const taggedGalleriesPressed = useCallback(() => {
        pagerScrollViewRef.current?.scrollTo({ x: width, animated: true })
    }, [])
    //----------------------------------------------------------------ANIMATED TAB BAR BUTTONS----------------------------------------------------------------

    //----------------------------------------------------------------SCROLLVIEW FUNCTIONS----------------------------------------------------------------
    //currently visible slide
    const [activePage, setActivePage] = useState('myGalleries')

    //bool to control which galleries are shortened
    const [shortenMyGalleries, setShortenMyGalleries] = useState()
    const [shortenMyTaggedGalleries, setShortenMyTaggedGalleries] = useState()
    const [shortenMyLikedContent, setShortenMyLikedContent] = useState()

    //shortenedGalleries
    const [reducedGalleries, setReducedGalleries] = useState()

    const onMomentumScrollEnd = useCallback((ev) => {
        const index = Math.round(ev.nativeEvent.contentOffset.x / width)

        if (index === 0) {
            setActivePage('myGalleries')
            setShortenMyGalleries(false)
            setShortenMyLikedContent(true)
            setShortenMyTaggedGalleries(true)
            animatedTabBarRef.current?.animateToLeft()
        }
        if (index === 1) {
            setActivePage('taggedGalleries')
            setShortenMyTaggedGalleries(false)
            setShortenMyGalleries(true)
            setShortenMyLikedContent(true)

            const allGalleries = [...galleries]
            const reducedGal = allGalleries.slice(0, 8)
            setReducedGalleries(reducedGal)
            animatedTabBarRef.current?.animateToMiddle()
        }
        if (index === 2) {
            setActivePage('likedContent')
            setShortenMyLikedContent(false)
            setShortenMyGalleries(true)
            setShortenMyTaggedGalleries(true)
            const allGalleries = [...galleries]
            const reducedGal = allGalleries.slice(0, 8)
            setReducedGalleries(reducedGal)
            animatedTabBarRef.current?.animateToMiddle()
        }
    }, [])
    //----------------------------------------------------------------SCROLLVIEW FUNCTIONS----------------------------------------------------------------

    return (
        <ScreenWrapper
            style={{
                paddingBottom: tabBarHeight,
            }}
            topColor={{ backgroundColor: colors.currentMainColor }}
        >
            <HeaderBasic
                iconName={
                    showBackButton ? 'chevron-back-outline' : 'menu-outline'
                }
                goBack={() => {
                    showBackButton
                        ? props.navigation.goBack()
                        : props.navigation.toggleDrawer()
                }}
                headerColor={{ color: colors.textColor }}
                style={{ backgroundColor: colors.currentMainColor }}
                iconColor="white"
            >
                {showBackButton ? null : (
                    <Ionicons
                        name="notifications-outline"
                        size={26}
                        color="white"
                        style={styles.notifications}
                        onPress={() => {
                            props.navigation.navigate('NotificationsScreen')
                        }}
                    />
                )}
            </HeaderBasic>
            <FlatList
                StickySectionHeadersEnabled={true}
                nestedScrollEnabled={true}
                stickyHeaderIndices={[2]}
                ListHeaderComponent={() => <RenderHeader />}
                contentContainerStyle={{
                    minHeight: '100%',
                    width: width,
                    backgroundColor: 'white',
                }}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.2}
                data={[{ id: '1' }, { id: '3' }, { id: '4' }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    if (index === 1) {
                        return <RenderSectionHeader />
                    }
                    if (index === 2) {
                        return (
                            <ScrollView
                                ref={pagerScrollViewRef}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    width: width,
                                    minHeight: '100%',
                                }}
                                horizontal={true}
                                snapToInterval={width}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                onMomentumScrollEnd={onMomentumScrollEnd}
                                bounces={false}
                            >
                                <View style={styles.bigList}>
                                    <BigList
                                        data={
                                            !shortenMyGalleries
                                                ? galleries
                                                : reducedGalleries
                                        }
                                        renderItem={renderMyGalleries}
                                        itemHeight={itemHeightMyGalleries}
                                        layOut={layOutMyGalleries}
                                        keyExtractor={keyExtractorMyGalleries}
                                        numColumns={2}
                                        contentContainerStyle={{
                                            paddingBottom: 10,
                                        }}
                                        // onRefresh={loadGalleries}
                                        // refreshing={loadingGalleries}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        // onEndReached={() => {
                                        //     console.log('End Reached')
                                        //     onEndReached()
                                        // }}
                                    />
                                </View>
                                <View style={styles.bigList}>
                                    <BigList
                                        data={taggedGalleries}
                                        renderItem={renderMyGalleries}
                                        itemHeight={itemHeightMyGalleries}
                                        layOut={layOutMyGalleries}
                                        keyExtractor={keyExtractorMyGalleries}
                                        numColumns={2}
                                        // onRefresh={loadGalleries}
                                        // refreshing={loadingGalleries}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        // onEndReached={() => {
                                        //     console.log('End Reached')
                                        //     onEndReached()
                                        // }}
                                    />
                                </View>
                            </ScrollView>
                        )
                    }
                }}
            />
            <Modal
                style={StyleSheet.absoluteFill}
                visible={openModal}
                animationType="fade"
                transparent
            >
                <ActionBottomSheet
                    ref={bottomSheetRef}
                    showConfirmation={showConfirmation}
                    closeModal={() => {
                        console.log('called')
                        closeModal()
                    }}
                />
                {showConfirmationBool && (
                    <DeleteConfirmation
                        dismissConfirmation={dismissConfirmation}
                        onConfirmPressed={onConfirmPressed}
                        message="This will permanently delete all of the pictures
                            inside this gallery"
                    />
                )}
            </Modal>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    topCont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.placeHolder,
    },
    header: {
        position: 'absolute',
        top: 0,
    },
    button: {
        width: 100,
        marginTop: 5,
        height: 30,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    columCont: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: colors.separatorLine,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: -20,
    },
    bigList: {
        flex: 1,
        width: width,
    },
    bigListContentCont: {
        marginLeft: 10,
        paddingBottom: 15,
    },
    notifications: {
        fontFamily: colors.semiBold,
        position: 'absolute',
        top: 0,
        right: 10,
    },
})

export default ProfileScreen
