import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';

const InfoProductos = ({ route }) => {
    console.log("route ", route.params.producto)
    const [Producto, setProducto] = useState(route.params.producto);
    const { width } = useWindowDimensions();
   

    const tagsStyles = {
        p: {
          fontSize: 13,
          color: 'gray',
          textAlign:"center"
        },
      };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{Producto.title}</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.carouselContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {Producto.images.map((card) => (
                        <View key={card.id} style={styles.cardContainer}>
                            <Image source={{ uri: card.imagen }} style={styles.logo} />
                        </View>
                    ))}
                </ScrollView>



            </View>

            <View >
                <Text style={styles.sectioneDescripcion}>Descripcion</Text>
                <HTML source={{ html: Producto.description }} contentWidth={width} 
                tagsStyles={tagsStyles}
                />

            </View>
            <View >
                <Text style={styles.sectionCategoria}>Categoría</Text>
                <Text style={styles.sectionItemDesc}>{Producto.categorie.name}</Text>
            </View>

            <View >
                <Text style={styles.sectionCategoria}>Precio</Text>
                <Text style={styles.sectionItemDesc}>{Producto.price_soles} Bs</Text>
            </View>

        </>
    );
};


const styles = StyleSheet.create({
    sectioneDescripcion: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        // flex: 1
       
        textAlign: "center"

    },
    sectionCategoria: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
       
        textAlign: "center"


    },
    sectionItemDesc: {
        fontSize: 13,
        color: 'gray',
      
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center"

    },
    container: {
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2ecc71',
    },
    cardContainer: {
        marginHorizontal: 10,
        width: 300,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 6,
        borderBottomColor: '#ccc',
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 4,
        marginBottom: 10,
    },
    cardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardInfoItem: {
        flex: 1,
    },
    cardInfoLabel: {
        fontSize: 12,
        color: 'gray',
    },
    cardInfoValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    carouselContainer: {
        marginVertical: 2,
        alignItems: 'center',
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    paymentButton: {
        backgroundColor: '#00008B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default InfoProductos;