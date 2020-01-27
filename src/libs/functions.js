// IMPORTS
import NetInfo from '@react-native-community/netinfo'
// FUNÇÕES AUXILIARES
    // formata a data
    export const formataData = (data) => {
        return data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate()
    }

    // Se inscreve para receber atualizações da conexão
    export const unsubscribe = () => NetInfo.addEventListener(state => {
        console.log('Connection type: ' + state.type);
        console.log('Is connected?: ' + state.isConnected);
        console.log('Is internet reachable?: ' + state.isInternetReachable);
    })

    // Recupera o estado da conexão apenas uma vez
    export const getNetwork = () => NetInfo.fetch().then(state => {
        console.log('Connection type: ' + state.type);
        console.log('Is connected?: ' + state.isConnected);
    })