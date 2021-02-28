import React from 'react';
import {View, InputLabel, Picker, MenuItem} from '@react-native/native';
export default function Department(props) {
  const {text, v, oc, n, id, f } = props
  return (
  <View style={styles.row}>
            <View style={styles.col, styles.s10, styles.offset-s2, styles.m6, styles.l5, styles.offset-l4}>
            <InputLabel htmlFor={f}> { text } &nbsp; </InputLabel>
          <Picker
            value= {v}
            onChange={oc}
            inputProps={{
              name: n,
              id: id,
            }}
          >
            <MenuItem value="Software Engineering">Software Engineering</MenuItem>
            <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
            <MenuItem value="Mass communication">Mass communication</MenuItem>
            <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
            <MenuItem value="Accounting and Finance">Accounting and Finance</MenuItem>
            <MenuItem value="Information Technology">Information Technology</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Chemical Engineering">Chemical Engineering</MenuItem>
            <MenuItem value="Telecommunication">Telecommunication</MenuItem>
          </Picker>
          </View>
          </View>
  )
}
