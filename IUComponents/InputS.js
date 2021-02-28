import React from 'react'
import { View, Label } from 'react-native';

const  InputS = (props) => {
    const {f,d,l,n,t, oc, v,m, e, p, edit = false} = props;
  return (
    <View style={styles.row}>
    <View style={styles.input-field, styles.col, styles.s10, styles.m10, styles.l10}>
    <Input value={v} name={n} id={d} type={t} style={styles.validate} onChange={oc}/>
    {edit ? (<Label htmlFor={f} style={styles.active}>{l}</Label>) :(<Label htmlFor={f} >{l}</Label>)}
    {e ? <View style={styles.red-text}>{m}</View> : null}
    {p ? <View style={styles.red-text}>{m}</View> : null}
    </View>
    </View>
  )
}

export default InputS
