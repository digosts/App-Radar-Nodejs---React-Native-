import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, TextInput} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';
import {connect, disconnect} from '../services/socket';

export default function Main() {
    const [servico, setServico] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [listProfissional, setListProfissional] = useState([]);

    useEffect(() => {
        async function loadInitialPosition(){   
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy:true
                });

                const {latitude, longitude } = location.coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta:0.04,
                    longitudeDelta:0.04
                });
            }
        }

        loadInitialPosition();
    },[])

    function setupWebsocket(){
        const {latitude, longitude } = currentRegion;

        connect(latitude, longitude, servico);
    }

    async function handleRegionChanged(region){
        setCurrentRegion(region);
    }
  
    async function loadServices(){
        const {latitude, longitude } = currentRegion;

        let objPost = {
            servicos:servico,
            latitude:latitude,
            longitude:longitude
        }

        const response = await api.get('/prestador', {objPost});

        setListProfissional(response.data);
        setupWebsocket();
    }

    if(!currentRegion){
        return null;
    }

    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                style={styles.map} 
                initialRegion={currentRegion}
            >    
                {listProfissional.map(profissional =>(
                    <Marker 
                        key={profissional._id}
                        coordinate={{
                            latitude:profissional.location[1], 
                            longitude:profissional.location[0]
                        }}
                    >
                        <Image 
                            style={styles.avatar} 
                            source={{uri:profissional.avatar}}
                        />
                        
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.name}>{profissional.nome}</Text>
                                <Text style={styles.descricao}>{profissional.descricao}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.search}>
                <TextInput style={styles.input}
                    placeholder='Digite o serviço...'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    onChangeText={setServico}
                />
                <TouchableOpacity onPress={loadServices} style={styles.loadButton}>
                    <MaterialIcons name='my-location' size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles =  StyleSheet.create({
    map:{
        flex:1
    },
    avatar:{
        width:54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#fff'
    },
    callout:{
        width:260
    },
    name:{
        fontWeight:'bold',
        fontSize:16
    },
    descricao:{
        color:'#666',
        marginTop:5
    },
    search:{
        position:'absolute',
        top:20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row'
    },
    input:{
        flex:1,
        height:50,
        backgroundColor:'#fff',
        color:'#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowOffset:{
            height:4,
            width:4
        },
        elevation:2,
    },
    loadButton:{
        width:50,
        height:50,
        backgroundColor:'#005cb2',
        borderRadius:25,
        justifyContent:"center",
        alignItems:'center',
        marginLeft:25
    }
});
