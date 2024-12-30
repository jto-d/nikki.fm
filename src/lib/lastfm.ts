import axios from 'axios'
import { binarySearch } from '@/utils/data'

/**
 * @description Fetches the valid weeks from the Last.FM API and returns the weeks that are possible for a given user
 * 
 * @param userId - The Last.FM username
 * @param userRegisteredDate - The Unix string representing the date the user registered for Last.FM
 * @returns - A promise that resolves to a sorted array of valid weeks for the user
 */
export const getValidWeeks = async (userId: string, userRegisteredDate: string) => {
    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklychartlist&user=${userId}&api_key=62f1f25b65449fd441be4bfe9d9e1be4&format=json`)
    const data = response.data
    
    const periods = data.weeklychartlist.chart
    const targetDate = Number(userRegisteredDate)
    const index = binarySearch(periods, targetDate)

    const validPeriods = periods.slice(index)

    return validPeriods
}

export const getUserInfo = async (userId: string): Promise<any> => {
    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${userId}&api_key=62f1f25b65449fd441be4bfe9d9e1be4&format=json`)
    console.log(response.data)
    return response.data
}

export const getWeekData = async (userId: string, period: {from: string, to: string}) => {
    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${userId}&from=${period["from"]}&to=${period["to"]}&api_key=62f1f25b65449fd441be4bfe9d9e1be4&format=json`)

    return response.data
}



export const getUserDiaryInfo = async (userId: string) => {
    // const data = await getValidWeeks(userId)
    // console.log(periods)

    // const artistData = await getWeeklyData(userId, {"from": periods[1000]["from"], "to": periods[1000]["to"]})

    // console.log(artistData)
}
