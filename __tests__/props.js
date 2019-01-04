export default {
  navigation: {
    navigate: function() {
      return;
    },
    state: {
      params: {
        category: "Beer",
        id: 1,
        data: {
          meridians: {
            latitude: 49.270621,
            longitude: -123.135671
          }
        }
      }
    }
  },
  screenProps: {
    user_id: 1,
    currentSearch: "Pilsner",
    currentSearchCategory: "Beer",
    favorites: [
      {
      beer_id: 1,
      category: "Porter",
      beer_name: "Nitro Milk Stout",
      brewery_name: "Left Hand Brewing Company",
      ibu: 25,
      abv: "6.0%",
      img_url: "https://products3.imgix.drizly.com/ci-left-hand-milk-stout-nitro-1cc9bd255865b63b.png?auto=format%2Ccompress&fm=jpeg&q=20"
      },
      {
      beer_id: 3,
      category: "Hefeweizen",
      beer_name: "Weissbier",
      brewery_name: "Erdinger Brewery",
      ibu: 10,
      abv: "5.3%",
      img_url: "https://www.totalwine.com/media/sys_master/twmmedia/h7c/he3/8820602306590.png"
      }
      ]
  }
}