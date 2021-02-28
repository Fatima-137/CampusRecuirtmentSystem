import React from 'react';
import {View, Navigation, ListItem} from 'react-native';

const SignUpLinks = (props) => {
    return (
        <View style={styles.row}>
            <View style={styles.col, styles.s6, styles.l6, styles.m6, styles.offset-l5, styles.offset-s3}>
                <Navigation>
                    <ListItem style={styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => { props.props.history.push("/SignUp", "Student") }}>
                        <Text>Student</Text>

                    </ListItem>
                    <ListItem style={styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => { props.props.history.push("/SignUp", "Company") }}>
                        <Text>Company</Text>

                    </ListItem>
                    <ListItem style={styles.flow-text, styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => { props.props.history.push("/SignUp", "Admin") }}>
                        <Text>Admin</Text>
                    </ListItem>
                </Navigation>
            </View>
        </View>
    );
}

export default SignUpLinks;