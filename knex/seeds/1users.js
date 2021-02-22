//password is password
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'logan.corey@mail.utoronto.ca',
          phone: '321-312-41241',
          admin: 1,
          password:
            '$2b$12$TPNDlRsrLyQxY5vUkCyh7OnJuBxxzBpsV6xE1UrLzG7x.Znx90rzG',
        },
        {
          email: 'logan@coldiron.ca',
          phone: '321-312-41241',
          admin: 0,
          password:
            '$2b$12$TPNDlRsrLyQxY5vUkCyh7OnJuBxxzBpsV6xE1UrLzG7x.Znx90rzG',
        },
      ]);
    });
};
