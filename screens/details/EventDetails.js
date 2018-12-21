// import React from 'react';
// import { TouchableOpacity, View, Text, FlatList } from 'react-native';

// export default class EventDetails extends React.Component {
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
//                 category: "Event",
//                 id: item.id,
//               })}
//             }
//           >
//             <View style={styles.searchResultContainer}>
//               <Text>{item.name}</Text>
//               <Text>{item.time}</Text>
//               <Text>{item.details}</Text>
//             </View>
//           </TouchableOpacity>
//         }
//         />
//     )
//   }
// }

import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default class EventDetails extends React.Component {
  render() {
    const event = this.props.data[0];
    console.log(event);
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: event.img_url}} resizeMode='contain'/>
        <Text style={styles.detailsTitle}>{event.name}</Text>
        <Text style={styles.description}>{event.store_name}</Text>
        <Text style={styles.description}>{event.details}</Text>
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