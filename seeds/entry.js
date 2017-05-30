exports.seed = function (knex, Promise) {
  return knex('entry').del()
    .then(function () {
      return Promise.all([
        knex('entry').insert({
          id: 73,
          title: 'Happy day!',
          text: 'Great day today! Felt positive, restful. Charmed the world with my engaging personality. Did a lot of walking! I\'m so funny.',
          mood_id: 55,
          created_at: '2017-05-20 06:18:41' }),
        knex('entry').insert({
          id: 74,
          title: '',
          text: 'Had a good day! Very calming, not too much excitement but I was productive and I worked hard.',
          mood_id: 35,
          created_at: '2017-05-21 06:18:41' }),
        knex('entry').insert({
          id: 75,
          title: 'I\'m a very title',
          text: 'A flat day today, didn\'t get much sleep I felt good but I was very zoned out the whole day and was excited to get home and straight into bed.',
          mood_id: 24,
          created_at: '2017-05-22 06:18:41' }),
        knex('entry').insert({
          id: 76,
          title: 'It\'s title time',
          text: 'Bad day ):',
          mood_id: 22,
          created_at: '2017-05-23 06:18:41' }),
        knex('entry').insert({
          id: 77,
          title: 'Sad day ):',
          text: 'Another bad day ):',
          mood_id: 11,
          created_at: '2017-05-24 06:18:41' }),
        knex('entry').insert({
          id: 78,
          title: '',
          text: 'Feeling a bit better now it\'s the weekend!',
          mood_id: 33,
          created_at: '2017-05-25 06:18:41' }),
        knex('entry').insert({
          id: 79,
          title: 'Isn\'t it strange',
          text: 'How my entries every single day are all at the same time? So weird!',
          mood_id: 42,
          created_at: '2017-05-26 06:18:41' }),
        knex('entry').insert({
          id: 80,
          title: '',
          text: 'Writing test data is booooooorrrriiiinggg',
          mood_id: 33,
          created_at: '2017-05-27 06:18:41' }),
        knex('entry').insert({
          id: 81,
          title: 'Hack me',
          text: 'I have an id of 81 hack me',
          mood_id: 45,
          created_at: '2017-05-28 06:18:41' })
      ])
    })
}
