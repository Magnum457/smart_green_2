// LIBS
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons'

// STYLE
import {
    Container,
    Img,
    InputField,
    Input,
    Button,
    ButtonText,
    ErrorMessage
} from './styles'

// ASSETS
import logo from '../../../assets/img/logoCircleWhite.png'

// SERVICES
import api from '../../services/api'

// FUNCTIONAL COMPONENT
export default function signIn({ navigation }) {
    // STATES
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')

    // EFFECTS
    useEffect(() => {
        // verifica se um usuário está logado
        async function recuperaUser() {
            AsyncStorage.getItem('access').then(access => {
                if(access) {
                    navigation.navigate('main', { token })
                }else{
                    navigation.navigate('signIn')
                }
            })

            AsyncStorage.getItem('refresh').then(refresh => {
                if(!refresh){
                    
                }
            })
        }

        recuperaUser()
    })

    // HANDLERS
    // realiza o login do usuário
    async function handleSignIn() {
        // validação dos campos vazios
        if (login.length === 0 || senha.length === 0) {
            setError('Preencha o seu login e senha!')
        } else {
            try{

                console.log("chamando a API")
                // verificação dos dados foram corretos
                const response = await api.post('token/', {
                    login,
                    senha
                }, { timeout: 25000 })

                console.log("chamada finalizada")
                // if(!response){
                //     setError('Erro ao se comunicar!!')
                // }

                // const { access, refresh } = response.data

                // console.log(access)
                // console.log(refresh)

                // await AsyncStorage.setItem('access', access)
                // await AsyncStorage.setItem('refresh', refresh)
                
            } catch(err) {
                setError(err.message)
                console.log("Não conseguiu se conectar")
            }
        }
    }

    // redireciona para a página de cadastro
    function handleSignUp(){
        navigation.navigate('signUp')
    }

    // RENDER 
    return (
        <Container>
            <Img source={logo}></Img>
            <InputField>
                <Icon></Icon>
                <Input 
                    placeholder="Digite o seu login"
                    placeholderTextColor='#999'
                    value={login}
                    onChangeText={setLogin}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </InputField>
            <InputField>
                <Icon></Icon>
                <Input 
                    placeholder="Digite a sua senha"
                    placeholderTextColor="#999"
                    value={senha}
                    onChangeText={setSenha}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </InputField>
            { error.length !== 0 && (<ErrorMessage> {error} </ErrorMessage>) }
            <Button onPress={handleSignIn}>
                <ButtonText>Logar</ButtonText>
            </Button>
        </Container>
    )
}