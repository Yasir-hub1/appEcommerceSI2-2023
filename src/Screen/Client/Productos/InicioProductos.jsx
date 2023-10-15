import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { showToast } from '../../../Components/funciones';
import { listarProductos } from '../../../Services/AuthService';


const ProductCard = ({ item, onIncrement, onDecrement,navigation }) => {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={()=>{navigation.navigate("InfoProductos",{producto:item})}}>
      <Image source={{ uri: item.imagen }} style={styles.productImage} />

      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        {/* <Text style={styles.productDescription}>{item.description}</Text> */}
        <Text style={styles.productPrice}>Bs {item.price_soles.toFixed(2)} </Text>
      </View>
      <View style={styles.productAmount}>
        <TouchableOpacity style={styles.amountButton} onPress={onDecrement}>
          <Text style={styles.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.amountText}>{item.amount}</Text>
        <TouchableOpacity style={styles.amountButton} onPress={onIncrement}>
          <Text style={styles.amountButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Productos  = ({navigation}) => {
  // console.log("navigation ",navigation)
  const [isVisibleBtnContinue, setIsVisibleBtnContinue] = useState(false);
  const [Productos, setProductos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [countProduct, setCountProduct] = useState(0);

  async function listaDeProductos() {
    try {

      const listaProductos = await listarProductos();
      // console.log("desde el front ",listaProductos)
      setProductos(listaProductos)
      // console.log("front AREAS ", listaProductos);
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = async () => {
		setRefreshing(true);
		try {
			const resp = await listarProductos();
			setProductos(resp);
			showToast("cargando...","#2ecc71")
		} catch (error) {
			console.error(error);
		} finally {
			setRefreshing(false);
		}
	};

  useEffect(() => {
    listaDeProductos();
  }, [])


  const handleIncrement = (item) => {
    setProductos(
      Productos.map((product) =>
        product.id === item.id ? { ...product, amount: product.amount + 1 } : product
      )
    );
  };

   const handleDecrement = (item) => {
    setProductos(
      Productos.map((product) =>
        product.id === item.id ? { ...product, amount: Math.max(0, product.amount - 1) } : product
      )
    );
  };

  const renderProductItem = ({ item }) => (
    <ProductCard item={item} onIncrement={() => handleIncrement(item)} onDecrement={() => handleDecrement(item)} navigation={navigation}/>
  ); 
 

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    // Cambia la visibilidad del TabBar según la posición de desplazamiento
    if (yOffset > 10) {
      // Oculta el TabBar
      setIsVisibleBtnContinue(true);

      navigation.getParent().setOptions({tabBarStyle:{display:"none"}});
    } else {
      // Muestra el TabBar
      setIsVisibleBtnContinue(false);

      navigation.getParent().setOptions({tabBarStyle:{display:"flex"}});
    }
  };

  

  return (
    <View style={styles.container}>
       <View style={{ justifyContent: "flex-start" }}><Text style={{ fontSize: 35, left: 18, fontWeight: "600", top: 8 }}>Productos</Text></View>
      <FlatList
        data={Productos}
        style={styles.productList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      />
      {isVisibleBtnContinue && (
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('ProcesoDePago')}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop:40,
  },
  productList: {
    flex: 1,
    paddingTop: 16,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    // marginRight: 1,
   
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  productAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountButton: {
    width: 30,
    height: 30,
    backgroundColor: '#ffa726',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  continueButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Productos ;