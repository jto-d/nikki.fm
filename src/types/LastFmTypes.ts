export interface WeekData {
    period: {
        from: string;
        to: string;
    };
    artistData: Artist[];
    trackData: Track[];
    albumData: Album[];
}

// Album types
export interface AlbumAttributes {
    rank: string;
}

export interface AlbumArtist {
    mbid: string;
    name: string;
    url: string;
}

export interface Album {
    mbid: string;
    url: string;
    image: any;
    name: string;
    artist: AlbumArtist;
    "@attr": AlbumAttributes;
    playcount: string;
}

export interface GetWeeklyAlbumChartResponse {
    weeklyalbumchart: {
        album: Album[];
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
    };
}

// Artist types
export interface ArtistAttributes {
    rank: string;
}

export interface Artist {
    mbid: string;
    url: string;
    name: string;
    image: any;
    "@attr": ArtistAttributes;
    playcount: string;
}

export interface GetWeeklyArtistChartResponse {
    weeklyartistchart: {
        artist: Artist[];
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
    };
}

// Track types
export interface TrackAttributes {
    rank: string;
}

export interface Track {
    mbid: string;
    url: string;
    image: any;
    name: string;
    artist: {
        mbid: string;
        name: string;
        url: string;
    };
    "@attr": TrackAttributes;
    playcount: string;
}

export interface GetWeeklyTrackChartResponse {
    weeklytrackchart: {
        track: Track[];
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
    };
}

// User Info types
export interface GetUserInfoResponse {
    user: {
        name: string;
        playcount: string;
        subscriber: string;
        country: string;
        age: string;
        gender: string;
        playlists: string;
        bootstrap: string;
        registered: {
            unixtime: string;
        };
    };
}

/**
 * Represents the response from user.getweeklychartlist API method.
 */
export interface WeeklyChartList {
    chart: {
        from: string;
        to: string;
    }[];
    "@attr": {
        user: string;
    };
}

/**
 * Represents the complete response from user.getweeklychartlist API method.
 */
export interface GetWeeklyChartListResponse {
    weeklychartlist: WeeklyChartList;
}

export type LastFmResponse<T> = T;