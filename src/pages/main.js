import React, { useState, useEffect } from 'react';
import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Main = ({ navigation }) => {

  const [productInfo, setProductInfo] = useState({})
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts(page)
  }, [])

  loadProducts = (queryPage = 1) => {
    api.get(`/products?page=${queryPage}`).then((response) => {
      const { docs, page, ...productInfo } = response.data
      setProducts([...products, ...docs])
      setPage(queryPage)
      setProductInfo(productInfo)
    })
  }

  loadMore = () => {
    if(page === productInfo.pages) return

    const pageNumber = page + 1

    this.loadProducts(pageNumber)
  }

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Product', { product: item })
      }} style={styles.productButton}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item._id}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

Main.navigationOptions = {
  title: "JSHunt"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold'
  }
})

export default Main;
