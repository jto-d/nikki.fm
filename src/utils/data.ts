/**
 * @description Utils for processing of Last.FM data
 */

/**
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