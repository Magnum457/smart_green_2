// libs
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

// variaveis auxiliares
let isRefreshing = false
let subscribers = []

// instância da api de requisições
    const api = axios.create({
        baseURL: 'http:/192.168.0.126:8000/api/',
        timeout: 5000
    })

// recuperando os tokens de acesso e de refresh
    getAccessToken = async () => {
        try {
            return await AsyncStorage.getItem('access')
        } catch (error) {
            return error
        }
    }

    getRefreshToken = async () => {
        try {
            return await AsyncStorage.getItem('refresh')
        } catch (error) {
            return error
        }
    }
    
// interceptors para a autenticação caso o token exista
    api.interceptors.request.use(
        async config => {
            const token = await getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer  ${token}`
            }

            const url = config.url.split('/')

            if(url[url.length - 1] === 'token/') {
                delete config.headers.Authorization
            }

            return config
        },
        error => {
            return Promise.resolve(error)
        }
    )

    api.interceptors.response.use( undefined, async (err) => {
        const { config, response: { status } } = err;
        const originalRequest = config;
      
        if (status === 401) {
          if (!isRefreshing) {
            isRefreshing = true;
            const refresh_token = await getRefreshToken()
            api.post('token/refresh/', {
                refresh: refresh_token
            }).then(response => {
                const { data } = response
                isRefreshing = false
                onRefreshed(data.access)
                AsyncStorage.setItem('access', data.access)
                subscribers
            })
          }
          const requestSubscribers = new Promise(resolve => {
            subscribeTokenRefresh(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });
          return requestSubscribers;
        }
        return Promise.reject(err);
      });
    

// armazenando os tokens
    function subscribeTokenRefresh(cb) {
        subscribers.push(cb)
    }

    function onRefreshed(token) {
        subscribers.map(cb => cb(token))
    }

export default api