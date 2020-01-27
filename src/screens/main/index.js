// LIBS
import React, { useState, useEffect } from 'react'
import { StatusBar, Text, TouchableHighlight, Keyboard, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'

import { formataData } from '../../libs/functions'

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

// FUNCTIONAL COMPONENT
export default function main({ navigation }) {
    // STATES
        // dados a serem cadastrados
        const [ fazenda, setFazenda ] = useState('')
        const [ campo, setCampo ] = useState('')
        const [ ponto, setPonto ] = useState(0)
        const [ solo, setSolo ] = useState(0)
        const [ potencialMatrico, setPotencialMatrico ] = useState(0) 
        const [ envio, setEnvio ] = useState(false)
        // dados a serem manipulados
        const [ dadosFazendas, setDadosFazendas ] = useState([])
        const [ dadosCampos, setDadosCampos ] = useState([])
        const [ dadosPontos, setDadosPontos ] = useState([])
        const [ dadosSolos, setDadosSolos ] = useState([])
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
        // teste de conexão
        const netInfo = useNetInfo()

    // EFFECTS
    // recupera os cards

    // verificar se o usuário está logado
    useEffect(() => {
        
        recuperaUser()
        recuperaDados('fazenda')

    },[])
    
    // FUNÇÕES PARA OS EFFECTS
    // verifica se um usuário está logado
    async function recuperaUser() {
        try {
            const Access = await AsyncStorage.getItem('access')
            const Refresh = await AsyncStorage.getItem('refresh')
            if (!Access || !Refresh) {
                navigation.navigate('signIn')
            }    
        } catch (error) {
            console.log(error);
            
        }
    }

    // recupera os dados da api
    async function recuperaDados(type) {
        if (type === 'fazenda') {
            console.log('pegando os dados das fazendas');
            
            try {
                const response = await api.get('farm/')
                const fazendas = response.data
                setDadosFazendas(fazendas)
                console.log(response.data);
                console.log('lalalal');
                
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.detail);
                    // console.log("Status: " + error.response.status);
                    // console.log(error.response.headers);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            }
        } else if (type === 'campo') {
            console.log('pegando os dados dos campos');
            try {
                if(fazenda !== 0) {
                    const response = await api.get(`farm/${fazenda}/field`)
                    const campos = response.data
                    
                    setDadosCampos(campos)
                }

            } catch (error) {
                console.log(error)
            }
        } else if(type === 'pontos'){
            console.log('pegando os dados dos pontos');
            try {
                if(fazenda !== 0) {
                    const responsePontos = await api.get(`farm/${fazenda}/field/${campo}/monitoringpoint`)
                    const pontos = responsePontos.data
                    const responseSolos = await api.get(`farm/${fazenda}/field/${campo}/soillayer`)
                    const solos = responseSolos.data
                
                    setDadosPontos(pontos)
                    setDadosSolos(solos)
                }

            } catch (error) {
                console.log(error)
            }
            
        } else {
            setError('Erro ao consultar o banco')
        }
    }
    
    // HANDLERS
    // toggle o menu
    async function handleMenu() {
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
    async function handleButton() {
        try {
            if (!foundFazenda) {
                await recuperaDados('campo')
                setFoundFazenda(true)
            } else if(!foundCampo) {
                await recuperaDados('pontos')
                setFoundCampo(true)
            } else {
                try {
                    const date = new Date()
                    const response = await api.post('soilmoisturedata/', {
                        matric_potential: parseFloat(potencialMatrico),
                        Soil_Layer: solo,
                        Field: campo,
                        Monitoring_Point: ponto,
                        date: formataData(date)
                    }, { timeout: 5000 })
                    
                    if(!response){
                        setError('Erro ao se comunicar!!')
                    }else {
                        console.log('deu certo');
                        setFoundCampo(false)
                        setFoundFazenda(false)
                        setSucess('Dado enviado com sucesso!!')
                    }

                } catch (error) {
                    setError(error)
                    console.log(error.message);
                    console.log(error.config);              
                }
            }
            
        } catch (error) {
            setError('Erro ao recuperar os dados')
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
                            <AddCardSelect
                                selectedValue={fazenda}
                                onValueChange={(itemValue) => setFazenda(itemValue)}
                                enabled={foundFazenda ? false : true}
                                mode={"dropdown"}
                            >
                                <AddCardSelect.Item label={'Selecione uma fazenda'} value={0} key={0}/>
                                {
                                    dadosFazendas.map(item => {
                                        return (
                                            <AddCardSelect.Item label={`${item.id}`} value={item.id} key={item.id}/>
                                            )
                                    })
                                }
                            </AddCardSelect>
                            {
                                foundFazenda && (
                                    <>
                                        <AddCardLabel>Campo</AddCardLabel>
                                        <AddCardSelect
                                            selectedValue={campo}
                                            onValueChange={(itemValue) => setCampo(itemValue)}
                                            enabled={foundCampo ? false : true}
                                            mode={"dropdown"}
                                        >
                                            <AddCardSelect.Item label={'Selecione um campo'} value={0} key={0}/>
                                            {
                                                dadosCampos.map(item => {
                                                    return (
                                                        <AddCardSelect.Item label={`${item.id}`} value={item.id} key={item.id}/>
                                                        )
                                                })
                                            }
                                        </AddCardSelect>
                                    </>
                                )
                            }
                            {
                                foundCampo && (
                                    <>
                                        <AddCardLabel>Solos</AddCardLabel>
                                        <AddCardSelect
                                            selectedValue={solo}
                                            onValueChange={(itemValue) => setSolo(itemValue)}
                                            mode={"dropdown"}
                                        >
                                            <AddCardSelect.Item label={'Selecione um tipo de solo'} value={0} key={0}/>
                                            {
                                                dadosSolos.map(item => {
                                                    return (
                                                        <AddCardSelect.Item label={`${item.id}`} value={item.id} key={item.id}/>
                                                        )
                                                })
                                            }
                                        </AddCardSelect>
                                        <AddCardLabel>Pontos de monitoramento</AddCardLabel>
                                        <AddCardSelect
                                            selectedValue={ponto}
                                            onValueChange={(itemValue) => setPonto(itemValue)}
                                            mode={"dropdown"}
                                        >
                                            <AddCardSelect.Item label={'Selecione um tipo de solo'} value={0} key={0}/>
                                            {
                                                dadosPontos.map(item => {
                                                    return (
                                                        <AddCardSelect.Item label={`${item.description}`} value={item.id} key={item.id}/>
                                                        )
                                                })
                                            }
                                        </AddCardSelect>
                                        <AddCardLabel>Pontencial Mátrico</AddCardLabel>
                                        <AddInput
                                            value={potencialMatrico.toString()}
                                            onChangeText={setPotencialMatrico}
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                        />
                                    </>
                                )
                            }
                            { sucessMessage.length !== 0 && <Text>{sucessMessage}</Text> }
                            { errorMessage.length !== 0 && <Text>{sucessMessage}</Text> }
                        </AddCardContent>

                        <AddCardFooter>
                            <TouchableHighlight onPress={handleButton}>
                                <Icon name={foundCampo ? "save" : "search"} size={30}/>
                            </TouchableHighlight>
                        </AddCardFooter>
                    </AddCard>
                </AddContainer>
            ) }
        </Container>
    )
}
