// FUNÇÕES AUXILIARES
export const formataData = (data) => {
    return data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + " às " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
}