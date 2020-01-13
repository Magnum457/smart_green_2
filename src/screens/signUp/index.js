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
    SignInLink,
    SignInText,
    ErrorMessage,
    SucessMessage
} from './styles'

// ASSETS
import logo from '../../../assets/img/logoCircleWhite.png'

// SERVICES

// FUNCTIONAL COMPONENT
export default function signUp({ navigation }) {
    // STATES
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')
    const [sucess, setSucess] = useState('')

    // EFFECTS
    useEffect(() => {
        // verifica se um usuário está logado
        async function recuperaUser() {
            AsyncStorage.getItem('smartGreen:token').then(token => {
                if(token) {
                    navigation.navigate('main', { token })
                }
            })
        }

        recuperaUser()
    })

    // HANDLERS
    // redirecionam para o login
    function handleSignIn() {
        navigation.navigate('signIn')
    }

    // realiza o cadastro
    async function handleSignUp() {

    }

    // render
    return(
        <Container>
            { sucess.length !== 0 && ( <SucessMessage>{ sucess }</SucessMessage> ) }
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
            { (error.length !== 0 ) && (<ErrorMessage> {error} </ErrorMessage>) }
            <Button onPress={handleSignUp}>
                <ButtonText>Cadastrar</ButtonText>
            </Button>
            <SignInLink onPress={handleSignIn}>
                <SignInText>Voltar ao Login</SignInText>
            </SignInLink>
        </Container>
    )
}