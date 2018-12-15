import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // containers
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cameraIconContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center',
  },
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  eventDetailsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '70%',
    margin: 10,
  },
  // images

  recommendationImage: {

  },
  welcomeImage: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  eventImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    margin: 10,
    width: '20%',
  },

  // font styles
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  mainHeaderText: {
    fontSize: 17,
    color: "black",
  },
  subHeaderText: {
    fontSize: 14,
    color: "black",
  },
  keywordsText: {
    fontSize: 10,
    color: "white",
    backgroundColor: "black",
  },
  paragraphText: {
    fontSize: 12,
    color: "black",
  },

  // icons
  cameraIcon: {
    paddingBottom: 20,
  },

  // misc
  
  homeScreenFilename: {
    marginVertical: 7,
  },
  optionScreenFilename: {
    marginVertical: 7,
  }
})