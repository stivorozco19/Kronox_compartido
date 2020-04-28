import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function TopEmpresas(){
    return(
      <View style={styles.container}>
            <Text>
                Estamos en top de empresas
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
