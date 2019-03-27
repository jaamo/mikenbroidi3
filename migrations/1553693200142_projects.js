exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('projects', {
    id: 'id',
    data: {type: 'json', notNull: true},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {};
