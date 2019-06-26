import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { URL, secret, setMessage } from './Globals';
import { getMessage, user } from './Globals';
import { styles } from './Styles';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    handleSubmit(event) {
        if (this.state.fullname === undefined || this.state.username === undefined || this.state.password === undefined) {
            this.setState({error: 'you must enter a fullname, username and password'});
        } else {
            console.log('looking up user: ' + this.state.username);

            fetch(URL + this.state.username, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Basic ' + secret
                })
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log('Success: ', response)
                    if (response.username === this.state.username) {
                        this.setState({ error: 'Username is not available' });
                    } else {
                        var data = { 
                            fullname: this.state.fullname, 
                            username: this.state.username,
                            password: this.state.password
                        };
                        fetch(URL, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: new Headers({
                                'Authorization': 'Basic ' + secret,
                                'Content-Type': 'application/json'
                            })
                        }).then(res => res.json())
                            .catch(error => {
                                console.error('Error:', error);
                                this.setState({ error: error });
                            })
                            .then(response =>  {
                                console.log('Success:', response);
                                setMessage('New user registered: ' + this.state.fullname);
                                this.setState({ error: 'done' });
                                this.props.navigation.push('Content');
                            });                   
                    }
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Register new User</Text>
                <View style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',}}>
                <Text style={{ textAlign: 'center', flex: 1, padding: 10 }}>Full name: &nbsp; </Text>
                <TextInput style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    flex: 1,
                    padding: 10,
                }} placeholder="enter full name" onChangeText={(fullname) => this.setState({fullname})}/>
                </View>
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
                    title="Register"
                    onPress={() =>
                        this.handleSubmit()
                    }
                />
                <Text style={styles.message}>{this.state.error}</Text>
            </View>
        );
    }
}
