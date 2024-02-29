import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';

export default function App() {

LogBox.ignoreAllLogs();

  const [estado, setEstado] = useState('selecionar');

  const [segundos, setSegundos] = useState(1);

  const [minutos, setMinutos] = useState(0);

  const [alarmSound, setAlarmSound] = useState([
    {
      id: 1,
      selecionado: true,
      som: 'alarme 1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id: 2,
      selecionado: false,
      som: 'alarme 2',
      file: require('./assets/alarme2.mp3')
    },
    {
      id: 3,
      selecionado: false,
      som: 'alarme 3',
      file: require('./assets/alarme3.mp3')
    }
  ])

  var numeros = [];
  for (let i = 0; i <= 60; i++) {
    numeros.push(i);
    
  }

  function setarAlarme(id){
    let alarmesTemp = alarmSound.map(function(val){
      if (id != val.id)
        val.selecionado = false;
      else
        val.selecionado = true;

      return val;
    })
    setAlarmSound(alarmesTemp);
  }


  if(estado == 'selecionar'){
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
        // Background Linear Gradient
        colors={['rgba(59,29,105,1)', 'rgba(59,29,105,0.6)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%'
        }}
      />
      <Text style={{color: '#fff', fontSize: 30}}>Selecione seu tempo:</Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#fff', paddingTop: 16}}>Min: </Text>
        <Picker 
        style={{height: 50, width: 100, color: '#fff'}}
        selectedValue={minutos}
        onValueChange={(itemValue, itemIndex) => setMinutos(itemValue)
  }
        >
        <Picker.Item label='0' value='0' />
          {
            numeros.map(function(val){
              return(<Picker.Item label={val.toString()} value={val.toString()} />)
            })
          }
        </Picker>
        <Text style={{color: '#fff', paddingTop: 16}}>Seg: </Text>
        <Picker style={{height: 50, width: 100, color: '#fff'}}
                selectedValue={segundos}
                onValueChange={(itemValue, itemIndex) => setSegundos(itemValue)
          }
        >

          {
            numeros.map(function(val){
              return(<Picker.Item label={val.toString()} value={val.toString()} />)
            })
          }
        </Picker>
      </View>

      <View style={{flexDirection: 'row'}}>
        {
          alarmSound.map(function(val){
            if (val.selecionado) {
              return(
                <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.bntChangeSelected}>
                <Text style={{color: '#fff'}}>
                  {val.som}
                </Text>
              </TouchableOpacity>
              )
            }else{
              return(
                <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.bntChange}>
                <Text style={{color: '#fff'}}>
                  {val.som}
                </Text>
              </TouchableOpacity>
              )
            }

          })
        }
      </View>
        <TouchableOpacity onPress={() => setEstado('iniciar')} style={styles.btnIniciar}><Text style={{textAlign: 'center', paddingTop: 32, color: '#fff', fontSize: 20}}>Iniciar</Text></TouchableOpacity>
    </View>
  );
  }else if(estado == 'iniciar'){
    return(
      <Contador alarmes={alarmSound} setMinutos={setMinutos} setSegundos={setSegundos} setEstado={setEstado} minutos={minutos} segundos={segundos}></Contador>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bntChange: {
    marginRight: 10,
    padding: 8,
    backgroundColor: 'rgb(116, 67, 191)'
  },
  bntChangeSelected: {
    marginRight: 10,
    padding: 8,
    backgroundColor: 'rgba(116, 67, 191, 0.3)',
    borderColor: '#fff',
    borderWidth: 1
  },
  btnIniciar: {
    backgroundColor: 'rgb(116, 67, 191)',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: '#fff',
    borderWidth: 2
  }
});
