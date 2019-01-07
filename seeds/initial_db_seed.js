
exports.seed = function(knex, Promise) {

  function clearAllTables() {
    return clearDependentTables()
    .then(()=> knex('breweries').del())
    .then(()=> knex('users').del())
    .then(()=> knex('beers').del())
    .then(()=> knex('stores').del())
    .then(()=> knex('categories').del());
  }

  function clearDependentTables() {
    return Promise.all([
      knex('beers_users_tried').del(),
      knex('events').del(),
      knex('beers_stores').del(),
      knex('beers_breweries').del(),
      knex('store_hours').del()
    ]);
  }

  function seedCategoriesTable() {
    console.log('Setting up categories...')
    return knex('categories').insert([
      {id: 1, category: 'Amber'},
      {id: 2, category: 'Brown Ale'},
      {id: 3, category: 'Cream Ale'},
      {id: 4, category: 'IPA'},
      {id: 5, category: 'Kolsch'},
      {id: 6, category: 'Pale Ale'},
      {id: 7, category: 'Scotch Ale'},
      {id: 8, category: 'Dunkleweizen'},
      {id: 9, category: 'Hefeweizen'},
      {id: 10, category: 'Wheat'},
      {id: 11, category: 'Lager'},
      {id: 12, category: 'Pilsner'},
      {id: 13, category: 'Radler'},
      {id: 14, category: 'Shandy'},
      {id: 15, category: 'Pale Lager'},
      {id: 16, category: 'Sour'},
      {id: 17, category: 'Lambic'},
      {id: 18, category: 'Stout'},
      {id: 19, category: 'Porter'},
      {id: 20, category: 'Belgian'},
      {id: 21, category: 'Saison'},
      {id: 22, category: 'Fruit'},
      {id: 23, category: 'Barleywine'}
    ]);
  }

  function seedBreweriesTable() {
    return knex('breweries').insert([
      {
        id: 1,
        name: 'Granville Island Brewing',
        description: 'This is where the magic happens. Stop by for a tasting or tour, and see our Brewmaster, Kevin, in his natural habitat.',
        street_address: '1441 Cartwright St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6H 3R7',
        img_url: 'http://www.gib.ca/app/themes/gib/dist/images/header-logo.png',
        meridians: {
          latitude: 49.270621,
          longitude: -123.135671
        }
      },
      {
        id: 2,
        name: 'Erdinger Brewery',
        description: 'Cheery microbrewery serving its house beers with diverse pub grub including steaks, pizza & chili.',
        street_address: 'Franz-Brombach-Straße 1',
        city: 'Erding',
        province: 'Germany',
        postal_code: '85435',
        img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpw2VoX1ZZfsm13DuhYStVrA-TFASmEl0aJy7ihITDHx5xI8rdg',
        meridians: {
          latitude: 48.315717,
          longitude: 11.891505
        }
      },
      {
        id: 3,
        name: '33 Acres Brewing Company',
        description: 'House-brewed craft beer & cafe fare offered in a cool, minimalist space with rustic accents.',
        street_address: '15 W 8th Ave',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V5Y 1M8',
        img_url: 'http://33acresbrewing.com/app/themes/33acres/assets/images/logo.svg',
        meridians: {
          latitude: 49.264329,
          longitude: -123.105369
        }
      },
      {
        id: 4,
        name: 'Elysian',
        description: '',
        street_address: '1221 E Pike St',
        city: 'Seattle',
        province: 'WA',
        postal_code: '98122',
        img_url: 'https://www.elysianbrewing.com/assets/images/temp-logo.png',
        meridians: {
          latitude: 47.614301, 
          longitude: -122.315983
        }
      },
      {
        id: 5,
        name: 'Left Hand Brewing Company',
        description: '',
        street_address: '1265 Boston Ave',
        city: 'Longmont',
        province: 'CO',
        postal_code: '80501',
        img_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Left_Hand_Logo.jpg',
        meridians: {
          latitude: 40.158654,
          longitude: -105.098068
        }
      },
      {
        id: 6,
        name: 'Steamworks',
        description: '',
        street_address: '375 Water St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1B8',
        img_url: 'https://pbs.twimg.com/profile_images/844693056888553472/9Ug5p3Ha.jpg',
        meridians: {
          latitude: 49.285035,
          longitude: -123.110537
        }
      },
      {
        id: 7,
        name: 'Driftwood',
        description: '',
        street_address: '476-336 Hillside Ave',
        city: 'Victoria',
        province: 'BC',
        postal_code: 'V8T 1Y7',
        img_url: 'https://driftwoodbeer.com/app/themes/driftwood/dist/images/driftwood-full-logo.png',
        meridians: {
          latitude: 48.437176,
          longitude: -123.373320
        }
      },
      {
        id: 8,
        name: 'Persephone Brewing Company',
        description: '',
        street_address: '1053 Stewart Rd',
        city: 'Gibsons',
        province: 'BC',
        postal_code: 'V0N 1V7',
        img_url: 'http://www.persephonebrewing.com/wp-content/uploads/2015/05/Persephone_Logo.png',
        meridians: {
          latitude: 49.420801,
          longitude:  -123.508033
        }
      },
      {
        id: 9,
        name: 'Red Truck Beer Company',
        description: '',
        street_address: '295 E 1st Ave',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V5T 1A7',
        img_url: 'https://pbs.twimg.com/profile_images/820024782376706049/4YmBSKDG_400x400.jpg',
        meridians: {
          latitude: 49.269148, 
          longitude: -123.096510
        }
      },
      {
        id: 10,
        name: 'Whistler Brewing Company',
        description: '',
        street_address: '1045 Millar Creek Rd',
        city: 'Whistler',
        province: 'BC',
        postal_code: 'V0N 1B1',
        img_url: 'http://www.whistlerbeer.com/wp-content/themes/whislter_brewery/_assets/img/whistler_brewery.jpg',
        meridians: {
          latitude: 50.088109, 
          longitude: -123.040801
        }
      },
      {
        id: 11,
        name: 'Russell Brewing Company',
        description: '',
        street_address: '13018 80 Ave',
        city: 'Surrey',
        province: 'BC',
        postal_code: 'V3W 2B2',
        img_url: 'https://www.brewersjournal.ca/wp-content/uploads/2016/10/Breweries-300x300.jpg',
        meridians: {
          latitude: 49.147837, 
          longitude: -122.861953
        }
      },
      {
        id: 12,
        name: 'Red Racer Brewery',
        description: '',
        street_address: '11411 Bridgeview Drive',
        city: 'Surrey',
        province: 'BC',
        postal_code: 'V3R 0C2',
        img_url: 'http://transatlanticbrews.com/wp-content/uploads/2015/07/redracer.rev_1000.png',
        meridians: {
          latitude: 49.210186,
          longitude: -122.863677
        }
      },
    ]);
  }

  function seedStoresTable() {
    return knex('stores').insert([
      {
        id: 1,
        name: 'Steamworks',
        description: 'Cheery microbrewery serving its house beers with diverse pub grub including steaks, pizza & chili.',
        street_address: '375 Water St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1B8',
        img_url: 'https://forgetsomeday.com/wp-content/uploads/Vancouver-52.jpg',
        meridians: {
          latitude: 49.285035,
          longitude: -123.110537
        }
      },
      {
        id: 2,
        name: 'Library Square Public House',
        description: 'Lively hangout with local craft brews & gourmet bar food turns clubby after dark when music plays.',
        street_address: '300 W Georgia',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 6B4',
        img_url: 'http://donnellygroup.ca/library-square/wp-content/uploads/sites/16/2015/09/LSVenueSlides_Venue4.jpg',
        meridians: {
          latitude: 49.280313,
          longitude: -123.114890
        }
      },
      {
        id: 3,
        name: 'The Railway Club',
        description: 'Long-time stop for pub grub offering many craft & import beers, plus live music & a bohemian vibe.',
        street_address: '579 Dunsmuir St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1Y4',
        img_url: 'https://d2ciprw05cjhos.cloudfront.net/files/v3/styles/gs_large/public/images/17/04/the_railway.png?itok=f-VR0gFV',
        meridians: {
          latitude: 49.283155,
          longitude: -123.114978
        }
      },
      {
        id: 4,
        name: 'St Regis Fine Wine & Spirts',
        description: '',
        street_address: '30-678 Dunsmuir St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1N3',
        img_url: 'https://i.pinimg.com/originals/ee/b2/f4/eeb2f476b5844212cf7644fff6dc8a80.jpg',
        meridians: {
          latitude: 49.282654,
          longitude: -123.117711
        }
      },
      {
        id: 5,
        name: 'BC Liquor Stores',
        description: '',
        street_address: '555 W Hastings St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 4N6',
        img_url: 'https://ssmscdn.yp.ca/image/resize/fe4ccdea-4741-4627-b87b-8df31a08bead/ypui-d-mp-pic-gal-lg/bc-liquor-store-storefront-1.jpg',
        meridians: {
          latitude: 49.284851,
          longitude: -123.111935
        }
      }
    ])
  }

  function seedUsersTable() {
    return knex('users').insert([
      {
        id: 1,        
        first_name: 'Adam',
        last_name: 'Romeo',
        email: 'adam.r.romeo@gmail.com',
        password: 'password'
      },
      {
        id: 2,
        first_name: 'Bert',
        last_name: 'Bae',
        email: 'burt@bey.com',
        password: 'password'
      }
    ]);
  }

  function seedBeersTable() {
    return knex('beers').insert([
      {
        id: 1,
        name: 'Nitro Milk Stout',
        description: 'Dark & delicious.',
        ibu: 25,
        abv: '6.0%',
        vote_count: 12,
        category_id: 19,
        img_url: 'https://products3.imgix.drizly.com/ci-left-hand-milk-stout-nitro-1cc9bd255865b63b.png?auto=format%2Ccompress&fm=jpeg&q=20',
      },
      {
        id: 2,
        name: 'Space Dust',
        description: 'The hopping is pure starglow energy, with Chinook to bitter and late and dry additions of Citra and Amarillo.',
        ibu: 73,
        abv: '8.2%',
        vote_count: 22,
        category_id: 4,
        img_url: 'http://brewpublic.com/wp-content/uploads/2014/07/Elysian-Space-Dust-IPA-Bottle-325x1024.png',
      },
      {
        id: 3,
        name: 'Weissbier',
        description: 'The Premium Weissbier at the top of its class.',
        ibu: 10,
        abv: '5.3%',
        vote_count: 2,
        category_id: 9,
        img_url: 'https://www.totalwine.com/media/sys_master/twmmedia/h7c/he3/8820602306590.png',
      },
      {
        id: 4,
        name: 'Signature Pale Ale',
        description: 'Plenty of British Crystal malt in the grist lends this ale its rich color, its caramel maltiness, and adds the occasional whiff of toffee to the nose.',
        ibu: 35,
        abv: '5.2%',
        vote_count: 4,
        category_id: 6,
        img_url: 'http://www.beerwulf.com/globalassets/catalog/beerwulf/beers/pale-ale/steamworks---pale-ale.png',
      },
      {
        id: 5,
        name: '33 Acres of Darkness',
        description: 'No description available.',
        ibu: 30,
        abv: '5.0%',
        vote_count: 14,
        category_id: 18,
        img_url: 'https://gullliquorstore.com/wp-content/uploads/2017/11/838797.jpg',
      },
      {
        id: 6,
        name: 'White Bark',
        description: '',
        ibu: 8,
        abv: '5.0%',
        vote_count: 45,
        category_id: 10,
        img_url: 'https://bigpetesliquorstore.com/wp-content/uploads/2018/04/186718.jpg'
      },
      {
        id: 7,
        name: 'Arcus Pilsner',
        description: '',
        ibu: 30,
        abv: '5.0%',
        vote_count: 12,
        category_id: 12,
        img_url: 'http://hiredgunscreative.com/wp-content/uploads/2017/06/arcus-01.jpg'
      },
      {
        id: 8,
        name: 'Old Cellar Dweller',
        description: '',
        ibu: 100,
        abv: '14.00%',
        vote_count: 8,
        category_id: 23,
        img_url: 'https://driftwoodbeer.com/app/uploads/2016/02/OldCellarDweller.png'
      },
      {
        id: 9,
        name: 'Keller Pilsner',
        description: '',
        ibu: 33,
        abv: '5.0%',
        vote_count: 12,
        category_id: 12,
        img_url: 'http://www.persephonebrewing.com/wp-content/uploads/2015/10/KELLER-PILSNER-BOTTLE-MOCK-copy-1.jpg'
      },
      {
        id: 10,
        name: 'Lager',
        description: '',
        ibu: 15,
        abv: '5.0%',
        vote_count: 3,
        category_id: 11,
        img_url: 'https://cdn.justwineapp.com/assets/beer/bottle/red-truck-beer-company-red-truck-lager_1476827149.png'
      },
      {
        id: 11,
        name: 'Bearpaw Honey Lager',
        description: 'Light hopped and aged for 8 weeks for a smooth mellow and slightly sweet finish.',
        ibu: 17,
        abv: '5.0%',
        vote_count: 1,
        category_id: 11,
        img_url: 'https://www.liquormarts.ca/sites/mlcc_public_website/files/styles/product/public/product/15301_7e53d75100512c9cfe3561c388e738c3.png'
      },
      {
        id: 12,
        name: 'Angry Scotch Ale',
        description: 'A Wee Angry Scotch Ale is crafted in the style of a 19th century 90 Schilling Scotch Ale is a strong, dark ale with dominant malt accent that originated in Edinburgh.',
        ibu: 30,
        abv: '6.5%',
        vote_count: 41,
        category_id: 7,
        img_url: 'https://res.cloudinary.com/ratebeer/image/upload/w_152,h_309,c_pad,d_beer_img_default.png,f_auto/beer_119636',
      },
      {
        id: 13,
        name: 'Smore Stout',
        description: 'Seasonal release offers a lightly sweet creaminess and roasted flavour evoking marshmallows toasted over the winter campfire with notes of chocolate and a hint of spice.',
        ibu: 40,
        abv: '6.0%',
        vote_count: 20,
        category_id: 18,
        img_url: 'https://www.highpointbws.com/wp-content/uploads/2017/11/167682.jpg',
      },
      {
        id: 14,
        name: 'Mocha Porter',
        description: 'We brew Mocha Porter in partnership with JJ Bean, our long-time Granville Island neighbour. Fresh-ground JJ Bean decaf dark roast coffee, real cocoa and roasted malts greet you up front, with lightly bitter hop.',
        ibu: 25,
        abv: '6.0%',
        vote_count: 30,
        category_id: 19,
        img_url: 'http://www.gib.ca/app/uploads/2018/10/mocha_porter-1.png',
      },
      {
        id: 15,
        name: 'Lions Summer Ale',
        description: 'Lively tropical fruit notes are balanced with subtle biscuity flavours and a slightly tart, refreshing finish.',
        ibu: 19,
        abv: '4.7%',
        vote_count: 12,
        category_id: 6,
        img_url: 'http://www.gib.ca/app/uploads/2017/03/lions_summer_ale.png',
      },
      {
        id: 16,
        name: 'English Bay Pale Ale',
        description: 'Lively tropical fruit notes are balanced with subtle biscuity flavours and a slightly tart, refreshing finish.',
        ibu: 18,
        abv: '5.0%',
        vote_count: 12,
        category_id: 6,
        img_url: 'http://www.gib.ca/app/uploads/2016/07/coastal_english_bay_pale_ale.png',
      },
      {
        id: 17,
        name: 'Sunshine Coast Hefeweizen',
        description: 'Crisp with notes of banana and clove.',
        ibu: 15,
        abv: '5.0%',
        vote_count: 27,
        category_id: 9,
        img_url: 'http://www.gib.ca/app/uploads/2016/07/coastal_sunshine_coast_hefeweizen.png',
      },
      {
        id: 18,
        name: 'Lions Winter Ale',
        description: 'The après anything beer.',
        ibu: 22,
        abv: '5.5%',
        vote_count: 50,
        category_id: 19,
        img_url: 'http://www.gib.ca/app/uploads/2016/07/coastal_lions_winter_ale.png',
      },
      {
        id: 19,
        name: '33 Acres of Life',
        description: 'A fruit like quality is created by fermenting the lager at ale temperatures. Gaining a complex taste through subtle approach; hints at a full-bodied ale yet retains a crisp finish.',
        ibu: 25,
        abv: '4.8%',
        vote_count: 50,
        category_id: 1,
        img_url: 'http://33acresbrewing.com/app/uploads/2013/05/Life.png',
      },
      {
        id: 20,
        name: '33 Acres of Ocean',
        description: 'This is a full flavoured beer integrated with a distinct floral hop which gives it a quality unique to our Pacific Northwest surroundings. This style is evolutionary from a typical IPA.',
        ibu: 30,
        abv: '5.3%',
        vote_count: 20,
        category_id: 6,
        img_url: 'http://33acresbrewing.com/app/uploads/2013/05/Ocean.png',
      },
      {
        id: 21,
        name: '33 Acres of Echo',
        description: 'A low alcohol content lets the beer be enjoyed over entire afternoons, sipped all day with ease—but a careful selection of hops resulting in notes of citrus peel, tropical fruit, and pine.',
        ibu: 20,
        abv: '4.5%',
        vote_count: 12,
        category_id: 10,
        img_url: 'http://33acresbrewing.com/app/uploads/2013/05/Ocean.png',
      },
      {
        id: 22,
        name: '33 Acres of Euphoria',
        description: 'Eyes wide enclosing, the potency of this feverish blending remains a secret until feeling the creamy golden rushes readied inside 33 acres of Euphoria.',
        ibu: 25,
        abv: '9.2%',
        vote_count: 34,
        category_id: 20,
        img_url: 'http://33acresbrewing.com/app/uploads/2013/05/Euphoria1.png',
      },
      {
        id: 23,
        name: '33 Acres of Nirvana',
        description: 'With a higher % then average, these skillful co~creations invigorate bitter-fresh pine with infused offerings of pink+orange citrusness.',
        ibu: 50,
        abv: '7.0%',
        vote_count: 47,
        category_id: 4,
        img_url: 'http://33acresbrewing.com/app/uploads/2013/05/Nirvana_02.png',
      },
      {
        id: 24,
        name: 'Punchbowl Mango IPA',
        description: 'Our award-winning punch bowl NW IPA is dry hopped with a mix of mosaic, Citra, Amarillo, and Ella hops.',
        ibu: 45,
        abv: '6.3%',
        vote_count: 7,
        category_id: 4,
        img_url: 'https://www.russellbeer.com/wp-content/uploads/2018/06/mango_ipa.png',
      },
      {
        id: 25,
        name: 'Blood Alley Bitter',
        description: 'Blood Alley Bitter is an Extra Special Bitter named after a notorious cobblestone laneway in Vancouver’s Gastown district.',
        ibu: 50,
        abv: '5.5%',
        vote_count: 29,
        category_id: 4,
        img_url: 'https://www.russellbeer.com/wp-content/uploads/2018/06/Blood_Alley.png',
      },
      {
        id: 26,
        name: 'White Rabbit',
        description: 'Brewed with Citra hops that display stone fruit and grape flavours which combine with the banana and clove character of the hefe yeast.',
        ibu: 65,
        abv: '6.0%',
        vote_count: 18,
        category_id: 9,
        img_url: 'https://www.russellbeer.com/wp-content/uploads/2018/07/whiterabbitbtl-1.jpg',
      },
      {
        id: 27,
        name: 'Naughty & Spiced Porter',
        description: 'Spiked with seasonal spices like cinnamon, all-spice, ginger and nutmeg, then aged on oak and vanilla beans, the result is a balance of roasted malt and subtle pudding spices.',
        ibu: 30,
        abv: '6.0%',
        vote_count: 5,
        category_id: 19,
        img_url: 'https://www.russellbeer.com/wp-content/uploads/2018/07/whiterabbitbtl-1.jpg',
      },
      {
        id: 28,
        name: 'Western Promises',
        description: 'A strong pilsner malt base but with a seductive west coast twist of Citra hops unique to our neck of the woods.',
        ibu: 30,
        abv: '6.0%',
        vote_count: 64,
        category_id: 12,
        img_url: 'https://www.russellbeer.com/wp-content/uploads/2018/06/western_promises.png',
      },
      {
        id: 29,
        name: 'Wee Heavy',
        description: 'Wee Heavy Scotch Ale / Wee Heavy 7.5% ABV  20 IBU Rich and malty aroma with dark fruit and caramel notes. Caramel and toasted malt and raisin-like flavours with a slight sweetness and warming sensation from the alcohol.',
        ibu: 20,
        abv: '7.5%',
        vote_count: 32,
        category_id: 7,
        img_url: 'https://beermebc.com/wp-content/uploads/2014/03/2013_03_BMBC-2029-590x884.jpg',
      },
      {
        id: 30,
        name: 'Black Lager',
        description: 'A full bodied dark lager. Roasty, clean and chocolaty with a graham cracker finish.',
        ibu: 31,
        abv: '4.5%',
        vote_count: 32,
        category_id: 11,
        img_url: 'https://cdn.justwineapp.com/assets/beer/bottle/persephone-brewing-black-lager_1477523384.png',
      },
      {
        id: 31,
        name: 'India Pale Ale',
        description: 'A classic Northwest IPA with big citrus and grapefruit flavours with hints of mango and passionfruit on the nose. Medium bodied, with a light biscuity malt character.',
        ibu: 60,
        abv: '6.5%',
        vote_count: 23,
        category_id: 4,
        img_url: 'https://beermebc.com/wp-content/uploads/2014/01/2014_01_BMBC-0475-590x884.jpg',
      },
    ]);
  }

  function seedBeersBreweriesTable() {
    return knex('beers_breweries').insert([
      {
        id: 1,
        beer_id: 1,
        brewery_id: 5
      },
      {
        id: 2,
        beer_id: 2,
        brewery_id: 4
      },
      {
        id: 3,
        beer_id: 3,
        brewery_id: 2
      },
      {
        id: 4,
        beer_id: 4,
        brewery_id: 6
      },
      {
        id: 5,
        beer_id: 5,
        brewery_id: 3
      },
      {
        id: 6,
        beer_id: 6,
        brewery_id: 7
      },
      {
        id: 7,
        beer_id: 7,
        brewery_id: 7
      },
      {
        id: 8,
        beer_id: 8,
        brewery_id: 7
      },
      {
        id: 9,
        beer_id: 9,
        brewery_id: 8
      },
      {
        id: 10,
        beer_id: 10,
        brewery_id: 9
      },
      {
        id: 11,
        beer_id: 11,
        brewery_id: 10
      },
      {
        id: 12,
        beer_id: 12,
        brewery_id: 11
      },
      {
        id: 13,
        beer_id: 13,
        brewery_id: 12
      },
      {
        id: 14,
        beer_id: 14,
        brewery_id: 1
      },
      {
        id: 15,
        beer_id: 15,
        brewery_id: 1
      },
      {
        id: 16,
        beer_id: 16,
        brewery_id: 1
      },
      {
        id: 17,
        beer_id: 17,
        brewery_id: 1
      },
      {
        id: 18,
        beer_id: 18,
        brewery_id: 1
      },
      {
        id: 19,
        beer_id: 19,
        brewery_id: 3
      },
      {
        id: 20,
        beer_id: 20,
        brewery_id: 3
      },
      {
        id: 21,
        beer_id: 21,
        brewery_id: 3
      },
      {
        id: 22,
        beer_id: 22,
        brewery_id: 3
      },
      {
        id: 23,
        beer_id: 23,
        brewery_id: 3
      },
      {
        id: 24,
        beer_id: 24,
        brewery_id: 11
      },
      {
        id: 25,
        beer_id: 25,
        brewery_id: 11
      },
      {
        id: 26,
        beer_id: 26,
        brewery_id: 11
      },
      {
        id: 27,
        beer_id: 27,
        brewery_id: 11
      },
      {
        id: 28,
        beer_id: 28,
        brewery_id: 11
      },
      {
        id: 29,
        beer_id: 29,
        brewery_id: 8
      },
      {
        id: 30,
        beer_id: 30,
        brewery_id: 8
      },
      {
        id: 31,
        beer_id: 31,
        brewery_id: 8
      },
    ])
  }

  function seedBeersStoresTable() {
    return knex('beers_stores').insert([
      {
        id: 1,
        beer_id: 1,
        store_id: 1
      },
      {
        id: 2,
        beer_id: 1,
        store_id: 3
      },
      {
        id: 3,
        beer_id: 2,
        store_id: 2
      },
      {
        id: 4,
        beer_id: 2,
        store_id: 4
      },
      {
        id: 5,
        beer_id: 3,
        store_id: 3
      },
      {
        id: 6,
        beer_id: 3,
        store_id: 4
      },
      {
        id: 7,
        beer_id: 3,
        store_id: 5
      },
      {
        id: 8,
        beer_id: 4,
        store_id: 2
      },
      {
        id: 9,
        beer_id: 5,
        store_id: 1
      },
      {
        id: 10,
        beer_id: 6,
        store_id: 2
      },
      {
        id: 11,
        beer_id: 6,
        store_id: 4
      },
      {
        id: 12,
        beer_id: 7,
        store_id: 1
      },
      {
        id: 13,
        beer_id: 7,
        store_id: 3
      },
      {
        id: 14,
        beer_id: 8,
        store_id: 2
      },
      {
        id: 15,
        beer_id: 8,
        store_id: 5
      },
      {
        id: 16,
        beer_id: 8,
        store_id: 3
      },
      {
        id: 17,
        beer_id: 9,
        store_id: 1
      },
      {
        id: 18,
        beer_id: 9,
        store_id: 2
      },
      {
        id: 19,
        beer_id: 10,
        store_id: 3
      },
      {
        id: 20,
        beer_id: 10,
        store_id: 5
      },
      {
        id: 21,
        beer_id: 14,
        store_id: 1
      },
      {
        id: 22,
        beer_id: 15,
        store_id: 2
      },
      {
        id: 23,
        beer_id: 16,
        store_id: 1
      },
      {
        id: 24,
        beer_id: 17,
        store_id: 2
      },
      {
        id: 25,
        beer_id: 18,
        store_id: 1
      },
      {
        id: 26,
        beer_id: 19,
        store_id: 1
      },
      {
        id: 27,
        beer_id: 20,
        store_id: 1
      },
      {
        id: 28,
        beer_id: 21,
        store_id: 2
      },
      {
        id: 29,
        beer_id: 22,
        store_id: 2
      },
      {
        id: 30,
        beer_id: 23,
        store_id: 1
      },
      {
        id: 31,
        beer_id: 24,
        store_id: 1
      },
      {
        id: 32,
        beer_id: 25,
        store_id: 2
      },
      {
        id: 33,
        beer_id: 26,
        store_id: 2
      },
      {
        id: 34,
        beer_id: 27,
        store_id: 1
      },
      {
        id: 35,
        beer_id: 28,
        store_id: 1
      },
      {
        id: 36,
        beer_id: 29,
        store_id: 2
      },
      {
        id: 37,
        beer_id: 30,
        store_id: 2
      },
      {
        id: 38,
        beer_id: 31,
        store_id: 1
      },
      {
        id: 39,
        beer_id: 14,
        store_id: 3
      },
      {
        id: 40,
        beer_id: 15,
        store_id: 3
      },
      {
        id: 41,
        beer_id: 16,
        store_id: 4
      },
      {
        id: 42,
        beer_id: 17,
        store_id: 4
      },
      {
        id: 43,
        beer_id: 18,
        store_id: 5
      },
      {
        id: 44,
        beer_id: 19,
        store_id: 5
      },
      {
        id: 45,
        beer_id: 20,
        store_id: 5
      },
      {
        id: 46,
        beer_id: 21,
        store_id: 3
      },
      {
        id: 47,
        beer_id: 22,
        store_id: 3
      },
      {
        id: 48,
        beer_id: 23,
        store_id: 4
      },
      {
        id: 49,
        beer_id: 24,
        store_id: 4
      },
      {
        id: 50,
        beer_id: 25,
        store_id: 3
      },
      {
        id: 51,
        beer_id: 26,
        store_id: 4
      },
      {
        id: 52,
        beer_id: 27,
        store_id: 5
      },
      {
        id: 53,
        beer_id: 28,
        store_id: 5
      },
      {
        id: 54,
        beer_id: 29,
        store_id: 3
      },
      {
        id: 55,
        beer_id: 30,
        store_id: 4
      },
      {
        id: 56,
        beer_id: 31,
        store_id: 3
      },
    ]);
  }

  function seedStoreHoursTable() {
    return knex('store_hours').insert([
      {
        id: 1,
        store_id: 1,
        monday_start: '9:00 a.m.',
        monday_end: '9:00 p.m.',
        tuesday_start: '9:00 a.m.',
        tuesday_end: '9:00 p.m.',
        wednesday_start: '9:00 a.m.',
        wednesday_end: '9:00 p.m.',
        thursday_start: '9:00 a.m.',
        thursday_end: '9:00 p.m.',
        friday_start: '9:00 a.m.',
        friday_end: '9:00 p.m.',
        saturday_start: '9:00 a.m.',
        saturday_end: '9:00 p.m.',
        sunday_start: '9:00 a.m.',
        sunday_end: '9:00 p.m.'
      },
      {
        id: 2,
        store_id: 2,
        monday_start: '9:00 a.m.',
        monday_end: '9:00 p.m.',
        tuesday_start: '9:00 a.m.',
        tuesday_end: '9:00 p.m.',
        wednesday_start: '9:00 a.m.',
        wednesday_end: '9:00 p.m.',
        thursday_start: '9:00 a.m.',
        thursday_end: '9:00 p.m.',
        friday_start: '9:00 a.m.',
        friday_end: '9:00 p.m.',
        saturday_start: '9:00 a.m.',
        saturday_end: '9:00 p.m.',
        sunday_start: '9:00 a.m.',
        sunday_end: '9:00 p.m.'
      },
      {
        id: 3,
        store_id: 3,
        monday_start: '9:00 a.m.',
        monday_end: '9:00 p.m.',
        tuesday_start: '9:00 a.m.',
        tuesday_end: '9:00 p.m.',
        wednesday_start: '9:00 a.m.',
        wednesday_end: '9:00 p.m.',
        thursday_start: '9:00 a.m.',
        thursday_end: '9:00 p.m.',
        friday_start: '9:00 a.m.',
        friday_end: '9:00 p.m.',
        saturday_start: '9:00 a.m.',
        saturday_end: '9:00 p.m.',
        sunday_start: '9:00 a.m.',
        sunday_end: '9:00 p.m.'
      },
      {
        id: 4,
        store_id: 4,
        monday_start: '9:00 a.m.',
        monday_end: '9:00 p.m.',
        tuesday_start: '9:00 a.m.',
        tuesday_end: '9:00 p.m.',
        wednesday_start: '9:00 a.m.',
        wednesday_end: '9:00 p.m.',
        thursday_start: '9:00 a.m.',
        thursday_end: '9:00 p.m.',
        friday_start: '9:00 a.m.',
        friday_end: '9:00 p.m.',
        saturday_start: '9:00 a.m.',
        saturday_end: '9:00 p.m.',
        sunday_start: '9:00 a.m.',
        sunday_end: '9:00 p.m.'
      },
      {
        id: 5,
        store_id: 5,
        monday_start: '9:00 a.m.',
        monday_end: '9:00 p.m.',
        tuesday_start: '9:00 a.m.',
        tuesday_end: '9:00 p.m.',
        wednesday_start: '9:00 a.m.',
        wednesday_end: '9:00 p.m.',
        thursday_start: '9:00 a.m.',
        thursday_end: '9:00 p.m.',
        friday_start: '9:00 a.m.',
        friday_end: '9:00 p.m.',
        saturday_start: '9:00 a.m.',
        saturday_end: '9:00 p.m.',
        sunday_start: '9:00 a.m.',
        sunday_end: '9:00 p.m.'
      },
    ]);
  }

  function seedEventsTable() {
    return knex('events').insert([
      {
        id: 1,
        store_id: 1,
        name: 'Weekly Beer Tasting',
        details: 'Each week we tap a new and unique cask, infusing our beer with… well, whatever we want. No two casks are the same, check our feed for each week’s cask flavours.',
        time: 'January 12,2019'
      },
      {
        id: 2,
        store_id: 3,
        name: 'Taste Beer',
        details: 'Launching new product.',
        time: 'January 11, 2019'
      },
    ]);
  }

  function seedBeersUsersTriedTable() {
    return knex('beers_users_tried').insert([
      {
        id: 1,
        user_id: 1,
        beer_id: 1,
        vote: 1,
        favorite: true
      },
      {
        id: 2,
        user_id: 1,
        beer_id: 3,
        vote: 1,
        favorite: true
      },
      {
        id: 3,
        user_id: 2,
        beer_id: 5,
        vote: -1,
        favorite: false
      },
      {
        id: 4,
        user_id: 2,
        beer_id: 2,
        vote: -1,
        favorite: false
      },
      {
        id: 5,
        user_id: 2,
        beer_id: 5,
        vote: 1,
        favorite: true 
      },
    ]);
  }

  return clearAllTables()
    .then(seedCategoriesTable)
    .then(seedBreweriesTable)
    .then(seedStoresTable)
    .then(seedUsersTable)
    .then(seedBeersTable)
    .then(seedBeersBreweriesTable)
    .then(seedBeersStoresTable)
    .then(seedEventsTable)
    .then(seedBeersUsersTriedTable);
};
