import axios from 'axios'
import { binarySearch } from '@/utils/data'
import { 
    GetUserInfoResponse,
    GetWeeklyChartListResponse,
    LastFmResponse,
    GetWeeklyArtistChartResponse,
    GetWeeklyTrackChartResponse,
    GetWeeklyAlbumChartResponse,
    WeekData
} from '@/types'

/**
 * @description Fetches the valid weeks from the Last.FM API and returns the weeks that are possible for a given user
 * 
 * @param userId - The Last.fm username
 * @param userRegisteredDate - The Unix string representing the date the user registered for Last.FM
 * @returns - A promise that resolves to a sorted array of valid weeks for the user
 */
export const getValidWeeks = async (
    userId: string,
    userRegisteredDate: string
): Promise<{ from: string; to: string }[]> => {
    const response = await axios.get<LastFmResponse<GetWeeklyChartListResponse>>('', {
        params: {
            method: 'user.getweeklychartlist',
            user: userId,
        }
    })

    const data = response.data
    
    const periods = data.weeklychartlist.chart
    const targetDate = Number(userRegisteredDate)
    const index = binarySearch(periods, targetDate)

    const validPeriods = periods.slice(index)

    return validPeriods
}

export const getUserInfo = async (userId: string): Promise<GetUserInfoResponse> => {
    const response = await axios.get<LastFmResponse<GetUserInfoResponse>>('', {
        params: {
            method: 'user.getinfo',
            user: userId,
        }
    })
    console.log(response.data)
    return response.data
}

/**
 * Fetches weekly artist, track, and album data for a specific period.
 * 
 * @param userId - The Last.fm username
 * @param period - An object containing 'from' and 'to' UNIX timestamps
 * @returns A promise that resolves to the weekly artist, track, and album data
 */
export const getWeekData = async (
    userId: string,
    period: {from: string, to: string}
): Promise<WeekData> => {

    const artistResponse = await axios.get<LastFmResponse<GetWeeklyArtistChartResponse>>('', {
        params: {
            method: 'user.getweeklyartistchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const trackResponse = await axios.get<LastFmResponse<GetWeeklyTrackChartResponse>>('', {
        params: {
            methods: 'user.getweeklytrackchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const albumResponse = await axios.get<LastFmResponse<GetWeeklyAlbumChartResponse>>('', {
        params: {
            methods: 'user.getweeklyalbumchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const data = {
        "period": period,
        "artistData": artistResponse.data.weeklychartlist.artist,
        "trackData": trackResponse.data.weeklychartlist.track,
        "albumData": albumResponse.data.weeklychartlist.album,
    }

    return data
}

/**
 * Fetches all weekly data for a user across valid periods
 * 
 * @param userId - The Last.fm username
 * @param periods - Valid weeks for the user
 */
export const getAllWeeklyData = async (
    userId: string,
    periods: { from: string; to: string }[]
): Promise<WeekData[]> => {
    const allWeeklyData = await Promise.all(
        periods.map(period => getWeekData(userId, period))
    );
    return allWeeklyData
}



export const getUserDiaryInfo = async (userId: string) => {
    const userInfo = await getUserInfo(userId)

    const userRegisteredDate = userInfo.user
    // const data = await getValidWeeks(userId)
    // console.log(periods)

    // const artistData = await getWeeklyData(userId, {"from": periods[1000]["from"], "to": periods[1000]["to"]})

    // console.log(artistData)
}
