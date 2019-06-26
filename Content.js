import React from 'react';
import { Text, View, Button } from 'react-native';
import { getMessage, setUser, setMessage } from './Globals';
import { styles } from './Styles';
// import Header from './Header';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        };
    }

    logout() {
        setUser('');
        setMessage('You have been logged out');
        this.props.navigation.push('Home');
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Inside the Demo Web Application:</Text>
                <Text style={styles.message}>{getMessage()}</Text>                                       
                    <Text style={styles.normal}>Here you can access our valuable content.</Text>
                    <Text style={styles.normal}>For example, you can register new users:</Text>
                    <Button
                        title="Register"
                        onPress={() =>
                            this.props.navigation.navigate('Register')
                        }
                    />                   
                    <Text style={styles.normal}>Or you can logout</Text>
                    <Button
                        title="Logout"
                        onPress={() =>
                            this.logout()
                        }
                    />                   
            </View>
        );
    }
}