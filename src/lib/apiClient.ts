import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
// TODO: store this in an env file
const LASTFM_API_KEY = '62f1f25b65449fd441be4bfe9d9e1be4'

if (!LASTFM_API_KEY) {
    throw new Error('Missing Last.fm API key in .env')
}

const apiClient: AxiosInstance = axios.create({
    baseURL: LASTFM_BASE_URL,
    params: {
        api_key: LASTFM_API_KEY,
        format: 'json'
    },
})

// interceptors here if needed
