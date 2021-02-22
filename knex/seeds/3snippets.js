
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('snippets').del()
    .then(function () {
      // Inserts seed entries
      return knex('snippets').insert([
        {userid: 1,  snippet: 'May 5th was a time that many will remember as the birth of Logan'},
        {userid: 1,  snippet: "William Shakespeare (bapt. 26 April 1564 – 23 April 1616)[a] was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.[2][3][4] He is often called England's national poet and the 'Bard of Avon' (or simply 'the Bard').[5][b] His extant works, including collaborations, consist of some 39 plays,[c] 154 sonnets, three long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.[7] They also continue to be studied and reinterpreted."}
      ]);
    });
};
