import axios from 'axios'
const refreshSession = async() => {
    const Uri = `http://localhost:8000/api/v1/auth/session`
    const initialSession = localStorage.getItem('sessionId')
    try {
        if (initialSession !== '') {
            const response = await axios.post(Uri, { session: initialSession })
            const newSession = response.data.sessionId
            return newSession
        }
    } catch (error) {
        localStorage.removeItem('sessionId')
    }
}
const api = axios.create({
    baseUrl: "http://localhost:8000/api/v1"
})
api.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response
        }
    },
    async(error) => {
        if (error.response && error.response.status === 401) {
            try {
                const newSession = await refreshSession()
                if (newSession) {
                    localStorage.setItem('sessionId', newSession)
                    error.config.headers.Authorization = `bearer ${newSession}`
                }
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
api.interceptors.request.use(
    (config) => {
        let session = localStorage.getItem('sessionId') || ""
        if (session !== "") {
            config.headers.Authorization = "Bearer " + session
        }
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)