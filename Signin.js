import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { URL, secret, user, setUser, setMessage, errMsg, setError } from './Globals';
import { styles } from './Styles';
// import Header from './Header';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    handleSubmit() {
        if (this.state.username === undefined || this.state.password === undefined) {
            this.setState({error: 'you must enter a username and password'});
        } else {
            console.log('looking up user: ' + this.state.username);

            return fetch(URL + this.state.username, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Basic ' + secret
                })
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log('Success:', response)
                    if (response.username === this.state.username) {
                        setUser(response.fullname);
                        setMessage(response.fullname + ": welcome back !");
                        setError('') ;
                        this.props.navigation.navigate('Content')
                    } else {
                        setError('Username/password invalid');
                        this.setState({error: 'Username/password invalid'});
                    }
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Please Log In</Text>
                <View style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',}}>
                <Text style={{ textAlign: 'center', flex: 1, padding: 10 }}>Username: &nbsp; </Text>
                <TextInput style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    flex: 1,
                    padding: 10,
                }} placeholder="enter username" onChangeText={(username) => this.setState({username})}/>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={{ textAlign: 'center', flex: 1, padding: 10 }}>Password: &nbsp; </Text>
                <TextInput style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    flex: 1,
                    padding: 10,
                }} placeholder="enter password" onChangeText={(password) => this.setState({password})}/>
                </View>
                <Button
                    title="Login"
                    onPress={() =>
                        this.handleSubmit()
                    }
                />
                <Text style={styles.small}>(Hint: try username student with password student)</Text>
                <Text style={styles.message}>{this.state.error}</Text>
            </View>
        );
    }
}