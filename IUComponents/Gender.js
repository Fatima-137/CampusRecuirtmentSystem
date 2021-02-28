import React from 'react'
import { View, Text, Label, Input } from 'react-native';

function Gender(props) {
  const { oc, v,} = props;
  return (
    <View style={styles.row}>
      <View style={styles.col, styles.l8, styles.s10, styles.offset-l3, styles.offset-s1}>
        <View style={styles.input-field}>
          <Text style={styles.grey-text}>Gender</Text>
 
    <Text>
            <Label><Input value="Female" onChange={oc} style={styles.with-gap} name="Gender" checked={v === "Female"} type="radio" /><Text>Female</Text></Label>
    <Label><Input value="Male" onChange={oc} style={styles.with-gap} name="Gender" type="radio" checked={v === "Male"} /><Text>Male</Text></Label>
           </Text>
        </View>
      </View>
    </View>
  )
}

export default Gender;
