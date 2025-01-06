/**
 * @description Utils for processing of Last.FM data
 */

export const createDiary = (data: any) => {
    const lastfmData = data.lastfmData
    const allTimeData = extractTopAllTime(data.allTimeData)
    console.log(allTimeData)

    // for (const week of lastfmData) {
    //     const weeklyMatches = checkWeekForFlag(week, allTimeData)
    // }

    
}


/**
 * Extracts the top album, artists, and track for a user and stores the names of each
 * in an array
 * 
 * @param data - The unparsed data from last.fm
 * @returns - 3 arrays of length 10 with the names for the respective data type
 */
export const extractTopAllTime = (data: any) => {
    const topAlbums: string[] = data.topAlbums.album.map((album: { name: string }) => album.name) 
    const topArtists: string[] = data.topArtists.artist.map((artist: { name: string }) => artist.name) 
    const topTracks: string[] = data.topTracks.track.map((track: { name: string }) => track.name) 

    return {
        "topAlbums": topAlbums,
        "topArtists": topArtists,
        "topTracks": topTracks,
    }
}

/**
 * Helper function for checking for matching names
 * 
 * @param data - The top data for an artist, album, or track
 * @param set - The set of names created for the weekData
 * @returns - An array with matches between the top and the week
 */
const findMatchingNames = (data: string[], set: Set<string>): string[] => {
    const matches: string[] = [];

    for (const name of data) {
        if (set.has(name)) {
            matches.push(name)
        }
    }

    return matches
}

/**
 * Checks the data for a week for a predefined "flag"
 * 
 * @param week - The data for a week
 * @param top - The top artists, albums, tracks for a user
 */
export const checkWeekForFlag = (weekData: any, topData: any) => {
    const artistNames: string[] = weekData.artistData.map((item: { name: any }) => item.name)
    const artistSet: Set<string> = new Set(artistNames)

    const artistMatches = findMatchingNames(topData.topArtists, artistSet)
    console.log(artistMatches)

}

/**
 * Performs binary search
 * 
 * @param ranges 
 * @param target 
 * @returns 
 */
export const binarySearch = (ranges: any, target: number): number => {
    let low = 0
    let high = ranges.length - 1
    let result = -1

    while (low <= high) {
        let mid = Math.floor((low + high) / 2)
        let midTo = Number(ranges[mid].to)
        let midFrom = Number(ranges[mid].from)

        if (midTo > target && midFrom < target) {
            result = mid
            return result
        } else if (midTo < target) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return result
}