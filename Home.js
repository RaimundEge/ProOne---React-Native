import React from 'react';
import { Text, View, Button } from 'react-native';
import { getMessage, user } from './Globals';
import { styles } from './Styles';

// import Header from './Header';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: '' };
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Home ' + user,
        };
    };

    render() {
        if (user === '') {
            return (          
                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome to the Demo Web Application:</Text>
                    <Text style={styles.message}>{ getMessage() }</Text>                                       
                        <Text style={styles.normal}>To access our valuable content you need to </Text>
                        <Button
                            title="Sign In"
                            onPress={() =>
                                this.props.navigation.navigate('Signin')
                            }
                        />                   
                </View>
            )
        } else { 
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>Welcome to the Demo Web Application:</Text>
                    <Text style={styles.message}>{ getMessage() }</Text>                   
                    <Text style={styles.normal}>You can proceed to our valuable content</Text> 
                    <Button
                        title="content"
                        onPress={() =>
                            this.props.navigation.navigate('Content')
                        }
                    />                   
                </View>
            )
        };
    }
}