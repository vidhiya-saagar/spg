/**
 * GENERAL INFO
 * | #   | Book Name         | Content                | Num. Chapters |   |
 * |-----|-------------------|------------------------|---------------|---|
 * | 1   | Nanak Prakaash V1 | Guru 1                 | 73            |   |
 * | 2   | Nanak Prakaash V2 | Guru 1                 | 57            |   |
 * | 3   | Raas 1            | Guru 2, Guru 3         | 68            |   |
 * | 4   | Raas 2            | Guru 4, Guru 5         | 57            |   |
 * | 5   | Raas 3            | Guru 5                 | 69            |   |
 * | 6   | Raas 4            | Guru 5                 | 66            |   |
 * | 7   | Raas 5            | Guru 6                 | 66            |   |
 * | 8   | Raas 6            | Guru 6                 | 59            |   |
 * | 9   | Raas 7            | Guru 6                 | 61            |   |
 * | 10  | Raas 8            | Guru 6                 | 60            |   |
 * | 11  | Raas 9            | Guru 7                 | 60            |   |
 * | 12  | Raas 10           | Guru 7, Guru 8         | 56            |   |
 * | 13  | Raas 11           | Guru 9                 | 61            |   |
 * | 14  | Raas 12           | Guru 9                 | 68            |   |
 * |  15 | Rut 1             | Guru 10                | 51            |   |
 * | 16  | Rut 2             | Guru 10                | 50            |   |
 * | 17  | Rut 3             | Guru 10                | 51            |   |
 * | 18  | Rut 4             | Guru 10                | 51            |   |
 * | 19  | Rut 5             | Guru 10                | 52            |   |
 * | 20  | Rut 6             | Guru 10                | 58            |   |
 * | 21  | Ayan 1            | Guru 10 + The devotees | 51            |   |
 * | 22  | Ayan 2            | The devotees           | 36            |   |
 */

exports.seed = async function seedNanakPrakash(knex) {
  await knex('books').del();
  return await knex('books').insert([
    {
      id: 1,
      book_order: 1,
      title_unicode: 'ਸ੍ਰੀ ਨਾਨਕ ਪ੍ਰਕਾਸ਼ ਪੂਰਬਾਰਧ',
      title_gs: 'sRI nwnk pRkwsæ pUrbwrD',
      title_transliteration_english: 'Sri Nanak Prakash Poorbaradh',
      description_english: '',
    },
  ]);
};
