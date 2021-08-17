import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

//colors
import colors from '../../constants/colors'

const StatsContainer = (props) => {
    return (
        <View style={styles.stats}>
            <Pressable
                style={styles.statCubes1}
                onPress={props.followingsPressedHandler}
            >
                <Text style={styles.numbers}>{props.followingCount}</Text>
                <Text style={styles.titles}>Following</Text>
            </Pressable>
            <Pressable
                style={styles.statCubes2}
                onPress={props.followersPressedHandler}
            >
                <Text style={styles.numbers}>{props.followersCount}</Text>
                <Text style={styles.titles}>Followers</Text>
            </Pressable>
            <View style={styles.statCubes3}>
                <Text style={styles.numbers}>23,6k</Text>
                <Text style={styles.titles}>Likes Received</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        height: 60,
        marginHorizontal: 10,
        flexDirection: 'row',
        // borderColor: colors.separatorLine,
        borderRadius: colors.borderRadius,
        backgroundColor: 'rgba(145,145,145,0.6)',
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 10,
    },
    statCubes1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'white',
    },
    statCubes2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'white',
    },
    statCubes3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statCubeInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    numbers: {
        fontSize: 18,
        color: 'white',
        fontFamily: colors.semiBold,
    },
    titles: {
        color: 'white',
        fontFamily: colors.font,
    },
})

export default StatsContainer
