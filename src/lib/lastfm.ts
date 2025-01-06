import apiClient from './apiClient'
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
    const response = await apiClient.get<LastFmResponse<GetWeeklyChartListResponse>>('', {
        params: {
            method: 'user.getweeklychartlist',
            user: userId,
        }
    })

    const data = response.data
    console.log(data)
    
    const periods = data.weeklychartlist.chart
    const targetDate = Number(userRegisteredDate)
    const index = binarySearch(periods, targetDate)

    const validPeriods = periods.slice(index)

    return validPeriods
}

export const getUserInfo = async (userId: string): Promise<GetUserInfoResponse> => {
    const response = await apiClient.get<LastFmResponse<GetUserInfoResponse>>('', {
        params: {
            method: 'user.getinfo',
            user: userId,
        }
    })
    return response.data
}

/**
 * Fetches all time track data for a user
 * 
 * @param userId - The Last.fm username
 * @returns - A promise that resolves to the user's all time top artists, albums, and track
 *            in JSON format
 */
export const getAllTimeData = async (
    userId: string
) => {
    const artistResponse = await apiClient.get<LastFmResponse<any>>('', {
        params: {
            method: 'user.gettopartists',
            user: userId,
            period: 'overall',
            limit: '10'
        }
    })

    const albumResponse = await apiClient.get<LastFmResponse<any>>('', {
        params: {
            method: 'user.gettopalbums',
            user: userId,
            period: 'overall',
            limit: '10'
        }
    })
    const trackResponse = await apiClient.get<LastFmResponse<any>>('', {
        params: {
            method: 'user.gettoptracks',
            user: userId,
            period: 'overall',
            limit: '10'
        }
    })

    const data = {
        "topArtists": artistResponse.data.topartists,
        "topAlbums": albumResponse.data.topalbums,
        "topTracks": trackResponse.data.toptracks,
    }

    return data
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
    const artistResponse = await apiClient.get<LastFmResponse<GetWeeklyArtistChartResponse>>('', {
        params: {
            method: 'user.getweeklyartistchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const trackResponse = await apiClient.get<LastFmResponse<GetWeeklyTrackChartResponse>>('', {
        params: {
            method: 'user.getweeklytrackchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const albumResponse = await apiClient.get<LastFmResponse<GetWeeklyAlbumChartResponse>>('', {
        params: {
            method: 'user.getweeklyalbumchart',
            user: userId,
            from: period.from,
            to: period.to,
        }
    })

    const data = {
        "period": period,
        "artistData": artistResponse.data.weeklyartistchart.artist,
        "trackData": trackResponse.data.weeklytrackchart.track,
        "albumData": albumResponse.data.weeklyalbumchart.album,
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


/**
 * Fetches all data needed for creating a diary
 * 
 * @param userId - The Last.fm username
 * @returns A promise that resolves to user diary data
 */
export const getUserDiaryInfo = async (userId: string) => {
    const userInfo = await getUserInfo(userId)
    console.log(userInfo)

    const userRegisteredDate = userInfo.user.registered.unixtime

    const validWeeks = await getValidWeeks(userId, userRegisteredDate)

    const lastfmData = await getAllWeeklyData(userId, validWeeks)

    const allTimeData = await getAllTimeData(userId)

    const data = {
        "lastfmData": lastfmData,
        "allTimeData": allTimeData,
    }
    console.log(data)

    return data

    

}
