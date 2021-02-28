import React from 'react';
import {View} from 'react-native';
const Button = (props) => {
    
    const check = () => {
        const {t , cn , oc, Sid} = props;
        if(oc === undefined){
            return <Button style={styles.cn}>{t}</Button>
        }
        else if(Sid === undefined){
            return <Button style={styles.cn} onClick={() => {oc()}}>{t}</Button>
        }
        else {return <Button style={styles.cn} onClick={() => {oc(Sid)}}>{t}</Button>}
    }
    return(
    <View>
        {check()}
    </View>
    )
}
export default Button;