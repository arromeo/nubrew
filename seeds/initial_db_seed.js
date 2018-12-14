
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
        postal_code: 'V6H 3R7'
      },
      {
        id: 2,
        name: 'Erdinger Brewery',
        description: 'Cheery microbrewery serving its house beers with diverse pub grub including steaks, pizza & chili.',
        street_address: 'Franz-Brombach-Straße 1',
        city: 'Erding',
        province: 'Germany',
        postal_code: '85435'
      },
      {
        id: 3,
        name: '33 Acres Brewing Company',
        description: 'House-brewed craft beer & cafe fare offered in a cool, minimalist space with rustic accents.',
        street_address: '15 W 8th Ave',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V5Y 1M8'
      },
      {
        id: 4,
        name: 'Elysian',
        description: '',
        street_address: '1221 E Pike St',
        city: 'Seattle',
        province: 'WA',
        postal_code: '98122'
      },
      {
        id: 5,
        name: 'Left Hand Brewing Company',
        description: '',
        street_address: '1265 Boston Ave',
        city: 'Longmont',
        province: 'CO',
        postal_code: '80501'
      },
      {
        id: 6,
        name: 'Steamworks',
        description: '',
        street_address: '375 Water St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1B8'
      },
      {
        id: 7,
        name: 'Driftwood',
        description: '',
        street_address: '476-336 Hillside Ave',
        city: 'Victoria',
        province: 'BC',
        postal_code: 'V8T 1Y7'
      },
      {
        id: 8,
        name: 'Persephone Brewing Company',
        description: '',
        street_address: '1053 Stewart Rd',
        city: 'Gibsons',
        province: 'BC',
        postal_code: 'V0N 1V7'
      },
      {
        id: 9,
        name: 'Red Truck Beer Company',
        description: '',
        street_address: '295 E 1st Ave',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V5T 1A7'
      },
      {
        id: 10,
        name: 'Whistler Brewing Company',
        description: '',
        street_address: '1045 Millar Creek Rd',
        city: 'Whistler',
        province: 'BC',
        postal_code: 'V0N 1B1'
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
        postal_code: 'V6B 1B8'
      },
      {
        id: 2,
        name: 'Library Square Public House',
        description: 'Lively hangout with local craft brews & gourmet bar food turns clubby after dark when music plays.',
        street_address: '300 W Georgia',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 6B4'
      },
      {
        id: 3,
        name: 'The Railway Club',
        description: 'Long-time stop for pub grub offering many craft & import beers, plus live music & a bohemian vibe.',
        street_address: '579 Dunsmuir St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1Y4'
      },
      {
        id: 4,
        name: 'St Regis Fine Wine & Spirts',
        description: '',
        street_address: '30-678 Dunsmuir St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 1N3'
      },
      {
        id: 5,
        name: 'BC Liquor Stores',
        description: '',
        street_address: '555 W Hastings St',
        city: 'Vancouver',
        province: 'BC',
        postal_code: 'V6B 4N6'
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
        vote_count: 0,
        category_id: 19,
        img_url: 'https://products3.imgix.drizly.com/ci-left-hand-milk-stout-nitro-1cc9bd255865b63b.png?auto=format%2Ccompress&fm=jpeg&q=20',
      },
      {
        id: 2,
        name: 'Space Dust',
        description: 'The hopping is pure starglow energy, with Chinook to bitter and late and dry additions of Citra and Amarillo.',
        ibu: 73,
        abv: '8.2%',
        vote_count: 0,
        category_id: 4,
        img_url: 'http://brewpublic.com/wp-content/uploads/2014/07/Elysian-Space-Dust-IPA-Bottle-325x1024.png',
      },
      {
        id: 3,
        name: 'Weissbier',
        description: 'The Premium Weissbier at the top of its class.',
        ibu: 0,
        abv: '5.3%',
        vote_count: 0,
        category_id: 9,
        img_url: 'https://www.totalwine.com/media/sys_master/twmmedia/h7c/he3/8820602306590.png',
      },
      {
        id: 4,
        name: 'Signature Pale Ale',
        description: 'Plenty of British Crystal malt in the grist lends this ale its rich color, its caramel maltiness, and adds the occasional whiff of toffee to the nose.',
        ibu: 35,
        abv: '5.2%',
        vote_count: 0,
        category_id: 6,
        img_url: 'http://www.beerwulf.com/globalassets/catalog/beerwulf/beers/pale-ale/steamworks---pale-ale.png',
      },
      {
        id: 5,
        name: '33 Acres of Darkness',
        description: 'No description available.',
        ibu: 30,
        abv: '5.0$',
        vote_count: 0,
        category_id: 18,
        img_url: 'https://cdn.justwineapp.com/assets/beer/bottle/33-acres-brewing-company-33-acres-darkness_1475535649.png',
      },
      {
        id: 6,
        name: 'White Bark',
        description: '',
        ibu: 0,
        abv: '5.0%',
        vote_count: 0,
        category_id: 10,
        img_url: 'https://bigpetesliquorstore.com/wp-content/uploads/2018/04/186718.jpg'
      },
      {
        id: 7,
        name: 'Arcus Pilsner',
        description: '',
        ibu: 0,
        abv: '5.0%',
        vote_count: 0,
        category_id: 12,
        img_url: 'http://hiredgunscreative.com/wp-content/uploads/2017/06/arcus-01.jpg'
      },
      {
        id: 8,
        name: 'Old Cellar Dweller',
        description: '',
        ibu: 100,
        abv: '14.00%',
        vote_count: 0,
        category_id: 23,
        img_url: 'https://driftwoodbeer.com/app/uploads/2016/02/OldCellarDweller.png'
      },
      {
        id: 9,
        name: 'Keller Pilsner',
        description: '',
        ibu: 33,
        abv: '5.0%',
        vote_count: 0,
        category_id: 12,
        img_url: 'http://www.persephonebrewing.com/wp-content/uploads/2015/10/KELLER-PILSNER-BOTTLE-MOCK-copy-1.jpg'
      },
      {
        id: 10,
        name: 'Lager',
        description: '',
        ibu: 0,
        abv: '5.0%',
        vote_count: 0,
        category_id: 11,
        img_url: 'https://cdn.justwineapp.com/assets/beer/bottle/red-truck-beer-company-red-truck-lager_1476827149.png'
      },
      {
        id: 11,
        name: 'Bearpaw Honey Lager',
        description: 'Light hopped and aged for 8 weeks for a smooth mellow and slightly sweet finish.',
        ibu: 0,
        abv: '5.0%',
        vote_count: 0,
        category_id: 11,
        img_url: 'https://www.liquormarts.ca/sites/mlcc_public_website/files/styles/product/public/product/15301_7e53d75100512c9cfe3561c388e738c3.png'
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
        store_id: 2
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
      }
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
