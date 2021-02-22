exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('annotations')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('annotations').insert([
        { userid: 1, tagid: 1, snippetid: 1, annotation: 'May 5th' },
        { userid: 1, tagid: 2, snippetid: 1, annotation: 'Logan' },
        { userid: 1, tagid: 2, snippetid: 2, annotation: 'William Shakespeare' },
      ]);
    });
};
