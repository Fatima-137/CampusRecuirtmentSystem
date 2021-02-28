import React from "react";
import {View, Label} from 'react-native';
const Input = (props) => {
    const {f,d,l,n,t, oc, v, } = props;
    return(
        <View style={styles.row}>
        <View style={styles.input-field, styles.col, styles.s10, styles.offset-s1, styles.m6, styles.l6, styles.offset-l3}>
        <Input value={v} name={n} id={d} type={t} 
        style={styles.validate} onChange={oc}/>
        <Label htmlFor={f} style={styles.active}>{l}</Label>
        </View>
        </View>
    )
}
export default Input;