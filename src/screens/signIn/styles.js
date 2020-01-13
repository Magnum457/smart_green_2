// libs
import styled from 'styled-components'

// components
export const Container  = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #e5f0ea;
`

export const Img = styled.Image`
    height: 80px;
    width: 80px;
    margin-bottom: 50px;
`

export const InputField = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    margin: 20px;
    width: 90%;
`

export const Input = styled.TextInput`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 5px;
    background-color: #FFF;
    align-self: stretch;
    margin: 15px 20px;
    font-size: 16px;
    text-align: center;
`

export const ErrorMessage = styled.Text`
    text-align: center;
    color: #ce2029;
    font-size: 16px;
    margin-bottom: 15px;
    margin-left: 20px;
    margin-right: 20px;
`

export const Button = styled.TouchableHighlight`
    padding: 20px;
    border-radius: 5px;
    background-color: #226655;
    align-self: stretch;
    margin: 15px;
    margin-left: 20px;
    margin-right: 20px;
`

export const ButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
`

export const SignUpLink = styled.TouchableHighlight`
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
`

export const SignUpText = styled.Text`
    color: #333;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
`