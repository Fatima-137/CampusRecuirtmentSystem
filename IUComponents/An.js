import React from 'react';
import {Text} from 'react-native';

const An = (props) =>{
    const{cn, oc, t} = props
  return (
      <Text style={styles.cn} onClick={oc}>{t}</Text>
  )
}

export default An;
