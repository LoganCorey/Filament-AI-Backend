exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { tag: 'date', userid:1 },
        { tag: 'name', userid:1},
        { tag: 'location', userid:1 },
        { tag: 'positive',userid:1 },
        { tag: 'negative', userid: 2 },
        { tag: 'city', userid:2 },
        { tag: 'time', userid:2 },
        { tag: 'skill', userid:2 },
        { tag: 'characteristic', userid:2 },
      ]);
    });
};
