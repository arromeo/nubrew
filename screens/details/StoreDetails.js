// import React from 'react';
// import { TouchableOpacity, View, Text, FlatList } from 'react-native';

// export default class StoreDetails extends React.Component {
//   render() {
//     const styles = this.props.styles;
//     return (
//         <FlatList
//         data={this.props.data}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => 
//           <TouchableOpacity style={styles.listItemContainer}
//             onPress={() => {
//               this.props.navigate('Detail', {
//                 category: "Store",
//                 id: item.id,
//               })}
//             }
//           >
//             <View style={styles.searchResultContainer}>
//               <Text>{item.name}</Text>
//               <Text>{item.description}</Text>
//               <Text>{item.street_address}, {item.city}, {item.province}, {item.postal_code}</Text>
//             </View>
//           </TouchableOpacity>
//         }
//         />
//     )
//   }
// }

import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default class StoreDetails extends React.Component {
  render() {
    const store = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: store.img_url}} resizeMode='contain'/>
        <Text style={styles.detailsTitle}>{store.name}</Text>
        <View style={styles.addressCard}>
          <Text>{store.street_address}</Text>
          <Text>{store.city}, {store.province}</Text>
          <Text>{store.postal_code}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addressCard: {
    marginLeft: 15,
    marginTop: 15,
    alignItems: 'center'
  },
  description: {
    marginTop: 15
  }
});