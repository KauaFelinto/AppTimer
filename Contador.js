import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

export default function Contador(props){

    var done = false;

    useEffect(() => {
        const timer = setInterval(() => {
            props.setSegundos(props.segundos-1);

            if(props.segundos <= 0){
                if(props.minutos > 0){
                    props.setMinutos(minutos-1);
                    props.setSegundos(59);
                }else{
                    if(!done){
                        done = true;
                        props.setEstado('selecionar');
                        props.setMinutos(0);
                        props.setSegundos(1);
                        playSound();
                    }
                }
            }

        }, 1000)

        return () => clearInterval(timer);
    })


    async function playSound(){
        const soundObject = new Audio.Sound();
        try{
            var alarme;
            props.alarmes.map(function(val){
                if(val.selecionado){
                    alarme = val.file;
                }
            })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();

            //await soundObject.unloadAsync();
        } catch(error){

        }
    }

    function resetar(){
        props.setEstado('selecionar');
        props.setMinutos(0);
        props.setSegundos(1);
    }

    function formatNumber(number){
        var finalNumber = "";
        if(number < 10){
            finalNumber = "0"+number;
        }else{
            finalNumber = number;
        }
        return finalNumber;
    }

    var segundos =  formatNumber(props.segundos);
    var minutos = formatNumber(props.minutos)


    return(
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

        <View style={{flexDirection: 'row'}}>
            <Text style={styles.contadorText}>{minutos} : </Text>
            <Text style={styles.contadorText}>{segundos}</Text>
        </View>
        <TouchableOpacity onPress={() => resetar()} style={styles.btnIniciar}><Text style={{textAlign: 'center', paddingTop: 32, color: '#fff', fontSize: 20}}>Resetar</Text></TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contadorText: {
        color: '#fff',
        fontSize: 40
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
})  