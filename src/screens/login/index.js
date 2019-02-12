import React from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { connect } from "react-redux";
import {
    logIn,
} from "../../store/authentication";
import Colors from '../../Colors';
import Text from '../../components/Text';
import Navbar from '../../components/Navbar';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userName: '',
            passWord: '',
            errorUserName: false,
            errorPassword: false,
            errorLoggingIn: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loginState !== nextProps.loginState) {
            if (!nextProps.loginState.loading) {
                if (nextProps.loginState.isLoggedIn) {
                    this.props.navigation.navigate('App');
                }
                else {
                    this.setState({
                        errorLoggingIn: true
                    });
                }
            }
        }
    }


    onUserNameChange = (userName) => {
        this.setState({
            userName
        });
    }

    onPasswordChange = (passWord) => {
        this.setState({
            passWord
        });
    }

    validateFields = () => {
        let { userName, passWord } = this.state;
        if (!userName) {
            this.setState({
                errorUserName: true,
                errorPassword: false,
            });
            return true;
        } else if (!passWord) {
            this.setState({
                errorPassword: true,
                errorUserName: false
            });
            return true;
        }
        else {
            this.setState({
                errorPassword: false,
                errorUserName: false
            });
            return false;
        }
    }

    login = () => {
        let error = this.validateFields();
        if (!error) {
            let { userName, passWord } = this.state;
            this.props.login(userName, passWord);
        }
    }

    register = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        var left = (
            <Left style={{ flex: 1 }}>
                <Button onPress={() => Actions.pop()} transparent>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
        );
        var right = (
            <Right style={{ flex: 1 }}>
                <Button onPress={() => Actions.search()} transparent>
                    <Icon name='search' />
                </Button>
                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='cart' />
                </Button>
            </Right>
        );
        if (this.props.loginState.loading) {
            return <Spinner />
        }
        else {
            return (
                <Container style={{ backgroundColor: '#fdfdfd' }}>
                    <Navbar left={left} right={right} title="LOGIN" />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
                        <View style={{ marginBottom: 35, width: '100%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor }}>Welcome back, </Text>
                            <Text style={{ fontSize: 18, textAlign: 'left', width: '100%', color: '#687373' }}>Login to continue </Text>
                        </View>
                        <Item>
                            <Icon active name='person' style={{ color: "#687373" }} />
                            <Input placeholder='Username' onChangeText={(text) => this.setState({ username: text })} placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='lock' style={{ color: "#687373" }} />
                            <Input placeholder='Password' onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} placeholderTextColor="#687373" />
                        </Item>
                        {this.state.hasError ? <Text style={{ color: "#c0392b", textAlign: 'center', marginTop: 10 }}>{this.state.errorText}</Text> : null}
                        <View style={{ alignItems: 'center' }}>
                            <Button onPress={() => this.login()} style={{ backgroundColor: Colors.navbarBackgroundColor, marginTop: 20 }}>
                                <Text style={{ color: '#fdfdfd' }}>Login</Text>
                            </Button>
                        </View>
                    </View>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userName, passWord) => dispatch(logIn(userName, passWord)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


