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
        // mensagens de debug
        const [ sucessMessage, setSucess ] = useState('')
        const [ errorMessage, setError ] = useState('')

    // EFFECTS
    // recupera os cards
    async function loadData() {
        const realm = await getRealm()

        const data = realm.objects('Soils')

        
        if(data.length !== 0) {
            setData(data)
        } else {
            setError('Sem dados')
        }
    }

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
        loadData()
    })

    // HANDLERS
    // logout do usuario
    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('signIn')
    }

    // abra a tela de adicionar o card
    function handleAddCard() {
        console.log("apertei esse botao")
        setAddCard(true)
    }

    // abre a tela para envia o card para a base de dados
    function handleSendCard({ item }) {
        setItem(item)
        setSendCard(true)
    }

    // abre a tela para deletar o card selecionado
    function handleDeleteCard({ item }) {
        setItem(item)
        setDeleteCard(true)
    }
    
    // fecha a tela de adicionar o card
    function handleCloseCard() {
        setAddCard(false)
        setDeleteCard(false)
        setSendCard(false)
        setItem([])
    }

    // toggle o menu
    function handleMenu() {
        console.log("Ta no handleMneu")
        if (menu){
            setMenu(false)
            console.log(menu)
        } else {
            setMenu(true)
            console.log(menu)
        }
    }

    // cria o card, salvando ele na memória do celular
    async function handleCreateCard() {
        try{
            if(campo.length === 0 && ponto <= 0 && profundidade <= 0 && umidade <= 0){
                setError("Preencha todos os campos")
                return errorMessage
            }

            const date = new Date()

            const data = {
                id: Math.random()*1000,
                campo: campo,
                ponto: ponto,
                profundidade: profundidade,
                umidade: Number(umidade),
                dt_create: date,
                user_create: user,
                envio: envio
            }

            const realm = await getRealm()

            realm.write(() => {
                realm.create('Soils', data, 'modified')
            })

            setCampo('')
            setUmidade('')
            setSucess('Card adicionado')
            Keyboard.dismiss()

            loadData()
        } catch (err) {
            setError(err.message)
        }
    }

    // deleta o card da memória do celular
    async function handleDropCard() {
        try{
            const realm = await getRealm()

            // recuperando todos os dados
            const datas = realm.objects('Soils')

            // filtro de ids
            const card = datas.find((data) => data.id === item.id)

            // deletando o card
            realm.write(() => {
                realm.delete(card)
            })
                

            setItem([])
            
            handleCloseCard()
        } catch(err) {
            setError(err.message)
            handleCloseCard()
        }
    }

    // envia o card para a base de dados
    async function handleSendingCard() {
        try{
            const realm = await getRealm()

            // recuperando todos os dados
            const datas = realm.objects('Soils')

            // filtro de ids
            const card = datas.find((data) => data.id === item.id)

            // atualizando o card
            realm.write(() => {
                card.envio = true
            })


            handleCloseCard()
        } catch(err) {
            setError(err.message)
            handleCloseCard()
        }
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

            {/* Botão de adicionar um card */}
            <AddView>
                <AddButton onPress={handleAddCard}>
                    <Icon name="add" size={30} />
                </AddButton>
            </AddView>

            {/* conteúdo */}
            <Content>

            </Content>

            {/* tela para adicionar o card */}
            {
                addCard && (
                    <AddContainer>

                        <AddCard>
                            <AddCardHeader>
                                <Text>Adicionar Card</Text>
                                <TouchableHighlight onPress={handleCloseCard}>
                                    <Icon name="close" size={20} />
                                </TouchableHighlight>
                            </AddCardHeader>

                            <AddCardContent>

                                <AddCardLabel>Campo</AddCardLabel>
                                <AddInput 
                                    value={campo}
                                    onChangeText={setCampo}
                                />

                                <AddCardLabel>Ponto de Monitoramento</AddCardLabel>
                                <AddCardSelect
                                    selectedValue={ponto}
                                    onValueChange={(itemValue) => setPonto(itemValue)}
                                >
                                    <AddCardSelect.Item label="1" value={1} />
                                    <AddCardSelect.Item label="2" value={2} />
                                    <AddCardSelect.Item label="3" value={3} />
                                </AddCardSelect>

                                <AddCardLabel>Profundidade</AddCardLabel>
                                <AddCardSelect
                                    selectedValue={profundidade}
                                    onValueChange={(itemValue) => setProfundidade(itemValue)}
                                >
                                    <AddCardSelect.Item label="1" value={1} />
                                    <AddCardSelect.Item label="2" value={2} />
                                    <AddCardSelect.Item label="3" value={3} />
                                </AddCardSelect>

                                <AddCardLabel>Umidade</AddCardLabel>
                                <AddInput 
                                    value={umidade}
                                    onChangeText={setUmidade}
                                />

                                { sucessMessage.length !== 0 && <Text>{sucessMessage}</Text> }
                            </AddCardContent>

                            <AddCardFooter>
                                <TouchableHighlight onPress={handleCreateCard}>
                                    <Icon name="save" size={30} />
                                </TouchableHighlight>
                            </AddCardFooter>
                        </AddCard>

                    </AddContainer>
                )
            }

            {/* Menu */}
            { menu && (
                <Menu>
                    <TouchableHighlight onPress={handleLogout}>
                        <Text>Sair</Text>
                    </TouchableHighlight>
                </Menu>
            ) }

        </Container>
    )
}
