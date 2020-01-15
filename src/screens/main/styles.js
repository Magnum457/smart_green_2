// LIBS
import styled from 'styled-components'

// COMPONENTS
    export const Container  = styled.View`
        flex: 1;
        background-color: #e5f0ea;
    `

    export const Img = styled.Image`
        height: 97%;
        width: 25%;
        
    `

// cabeçalho    
    export const Header = styled.View`
        width: 100%;
        height: 5%;
        padding-right: 15px;
        padding-left: 15px;
        flex-direction: row;
        justify-content: space-between;
        background-color: #047231;
    ` 

// Botão para adicionar Cards
    export const AddView = styled.View`
        position: absolute;
        top: 90%;
        left:80%;
        z-index: 2;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
        background-color: #ccc;
        border-radius: 25px;
    `

    export const AddButton = styled.TouchableOpacity`
        border-radius: 15px;
        align-items: center;
        justify-content: center;
    `

// Container para adicionar os cards
    export const AddContainer = styled.View`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        justify-content: center;
        align-items: center;
        z-index: 2;
    `

    export const AddCard = styled.View`
        background-color: #fff;
        width: 80%;
        align-self: auto;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        z-index: 2;
    `

    export const AddCardHeader = styled.View`
        background-color: #ddd;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-radius: 5px;
        padding: 5px;
    `

    export const AddCardContent = styled.View`
        background-color: transparent;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        margin-left: 3px;
        margin-right: 3px;
        margin-bottom: 5px;
    `

    export const AddCardLabel = styled.Text`
        font-size: 14px;
        font-weight: bold;
        color: #333;
    `

    export const AddInput = styled.TextInput`
        padding: 5px;
        border: solid 1px #777;
        border-radius: 5px;
        align-self: stretch;
        align-items: center;
        font-size: 13px;
    `

    export const AddCardSelect = styled.Picker`
        padding: 5px;
        border: solid 1px #777;
        border-radius: 5px;
        align-self: stretch;
        align-items: center;
        text-align: right;
    `

    export const AddCardFooter = styled.View`
        padding: 5px;
        margin-top: 5px;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        background-color: #ddd;
    `

// modal para enviar o card
export const SendContainer = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
`

// modal para deletar o card
export const DeleteContainer = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    align-self: stretch;
`

export const ContainerContent = styled.View`
    background-color: #fff;
    flex-direction: row;
    width: 80%;
    align-self: auto;
    border-radius: 5px;
    padding: 15px;
    justify-content: space-between;
    align-items: center;
`

export const SimButton = styled.TouchableOpacity`
    background-color: #30a970;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
`

export const NaoButton = styled.TouchableOpacity`
    background-color: #ad4035;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
`

// Lista de cards
export const Content = styled.ScrollView`
    z-index: 1;
    align-self: stretch;
    background-color: #FFF;
    padding: 2%;
`

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false
})`
    margin-top: 10px;
`

export const ItemList = styled.View`
    border-radius: 4px;
    background: #eee;
    margin-bottom: 15px;
    padding: 5px;
`

export const ItemView = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

`

export const ItemHeader = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #30a970;
    margin-bottom: 5px;
    flex-direction: row;
`

export const ItemHeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

export const ItemSend = styled.View`
    justify-content: center;
    align-items: center;
`

export const ItemLabel = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #333;
`

export const ItemText = styled.Text`
    font-size: 14px;
    color: #999;
`

export const ItemData = styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px;
`

export const ItemDataText = styled.Text`
    font-size: 10px;
    font-style: italic;
    color: #999;
`

export const ItemFooter = styled.View`
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    padding-left: 25px;
    padding-right: 25px;
    margin-top: 10px;
`
export const SendButton = styled.TouchableOpacity`
    background-color: #30a970;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 2px;
`

export const DeleteButton = styled.TouchableOpacity`
    background-color: #ad4035;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-left: 2px;
`
export const Menu = styled.View`
    width: 30%;
    top: 5%;
    left:80%;
    right: 0;
    position: absolute;
    z-index: 2;
    background: #FFF;
    border: 1px solid #ddd
`