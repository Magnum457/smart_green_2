// LIBS
import React, { useState, useEffect } from 'react'
import { StatusBar, Text, TouchableHighlight, Keyboard, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

// STYLES
import {
    Container,
    Img,
    Header,
    AddView,
    AddButton,
    AddContainer,
    AddCard,
    AddCardHeader,
    AddCardContent,
    AddCardLabel,
    AddInput,
    AddCardSelect,
    AddCardFooter,
    Content,
    List,
    ItemList,
    ItemText,
    ItemView,
    ItemHeader,
    ItemHeaderText,
    ItemSend,
    ItemData,
    ItemDataText,
    ItemLabel,
    ItemFooter,
    SendButton,
    DeleteButton,
    SendContainer,
    DeleteContainer,
    ContainerContent,
    SimButton,
    NaoButton,
    Menu
} from './styles'

// ASSETS
import logo from '../../../assets/img/darkLogoHome.png'

// SERVICES
import getRealm from '../../services/realm'
import api from '../../services/api'

// FUNÇÕES AUXILIARES
const formataData = (data) => {
    return data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + " às " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
}

// FUNCTIONAL COMPONENT
export default function main({ navigation }) {
    // STATES
        // tokens
        const [ access, setAccess ] = useState('')
        const [ refresh, setRefresh ] = useState('')
        // dados a serem cadastrados
        const [ fazenda, setFazenda ] = useState('')
        const [ campo, setCampo ] = useState('')
        const [ ponto, setPonto ] = useState(1)
        const [ profundidade, setProfundidade ] = useState(1)
        const [ umidade, setUmidade ] = useState('')
        const [ envio, setEnvio ] = useState(false)
        // dados a serem manipulados
        const [ user, setUser ] = useState('')
        const [ data, setData] = useState([])
        const [ item, setItem ] = useState([])
        // handlers
        const [ addCard, setAddCard ] = useState(false)
        const [ sendCard, setSendCard ] = useState(false)
        const [ deleteCard, setDeleteCard ] = useState(false)
        const [ menu, setMenu] = useState(false)
        const [ foundFazenda, setFoundFazenda ] = useState(false)
        const [ foundCampo, setFoundCampo ] = useState(false)
        // mensagens de debug
        const [ sucessMessage, setSucess ] = useState('')
        const [ errorMessage, setError ] = useState('')

    // EFFECTS
    // recupera os cards

    // verificar se o usuário está logado
    useEffect(() => {
        // verifica se um usuário está logado
        async function recuperaUser() {
            AsyncStorage.getItem('access').then(access => {
                // if(access) {
                    
                // }else{
                //     navigation.navigate('signIn')
                // }
            })

            AsyncStorage.getItem('refresh').then(refresh => {
                if(!refresh){
                    
                }
            })
        }

        recuperaUser()
    })

    // HANDLERS
    // toggle o menu
    function handleMenu() {
        if (menu){
            setMenu(false)
        } else {
            setMenu(true)
        }
    }

    // logout do usuario
    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('signIn')
    }

    // abra a tela de adicionar o card
    function handleAddCard() {
        setAddCard(true)
    }
    
    // fecha os modais abertos
    function handleCloseCard() {
        setAddCard(false)
        setDeleteCard(false)
        setSendCard(false)
        setItem([])
    }

    // manipula o botão do addCard
    async function hendleButton() {
        
    }
    
    // RENDER
    return(
        <Container>
            <Header>
                <Img source={logo}></Img>
                <TouchableHighlight onPress={handleMenu}>
                    <Icon name="menu" size={30} />
                </TouchableHighlight>
            </Header>

            {/* Menu */}
            { menu && (
                <Menu>
                    <TouchableHighlight onPress={handleLogout}>
                        <Text>Sair</Text>
                    </TouchableHighlight>
                </Menu>
            ) }

            {/* Botão de adicionar um card */}
            <AddView>
                <AddButton onPress={handleAddCard}>
                    <Icon name="add" size={30} />
                </AddButton>
            </AddView>

            {/* Modal de adição de card */}
            {addCard && (
                <AddContainer>
                    <AddCard>
                        <AddCardHeader>
                            <Text>Adicionar Card</Text>
                            <TouchableHighlight onPress={handleCloseCard}>
                                <Icon name="close" size={20} />
                            </TouchableHighlight>
                        </AddCardHeader>

                        <AddCardContent>
                            <AddCardLabel>Fazenda</AddCardLabel>
                            <AddInput
                                value={fazenda}
                                onChangeText={setFazenda}
                                editable={ foundFazenda ? true : false }
                            />

                            { sucessMessage.length !== 0 && <Text>{sucessMessage}</Text> }
                        </AddCardContent>

                        <AddCardFooter>
                            <TouchableHighlight>
                                <Icon name={foundCampo ? "save" : "search"} size={30}/>
                            </TouchableHighlight>
                        </AddCardFooter>
                    </AddCard>
                </AddContainer>
            ) }

        </Container>
    )
}
