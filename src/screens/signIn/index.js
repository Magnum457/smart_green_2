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
    SignUpLink,
    SignUpText,
    ErrorMessage
} from './styles'

// ASSETS
import logo from '../../../assets/img/logoCircleWhite.png'

// SERVICES

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
            AsyncStorage.getItem('smartGreen:token').then(token => {
                if(token) {
                    navigation.navigate('main', { token })
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
                // verificação dos dados foram corretos
                if (login === "Magno" && senha === "senha") {
                    
                    await AsyncStorage.setItem('user', login)

                    navigation.navigate('main', { login })
                } else {
                    setError("Dados inválidos")
                }
            } catch(err) {
                setError(err.message)
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
            <SignUpLink onPress={handleSignUp}>
                <SignUpText>Cadastrar</SignUpText>
            </SignUpLink>
        </Container>
    )
}