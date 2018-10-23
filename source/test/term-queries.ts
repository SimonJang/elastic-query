import test from 'ava';
import {QueryBuilder} from '../lib/query-builder';

test('should create a `term` query', t => {
	const query = new QueryBuilder()
		.term('user.name', 'Foo')
		.build();

	t.deepEqual(query, {
		query: {
			term: {
				'user.name': 'Foo'
			}
		}
	});
});

test('should create a `terms` query with multiple terms', t => {
	const query = new QueryBuilder()
		.terms('user.name', ['Foo', 'Bar'])
		.build();

	t.deepEqual(query, {
		query: {
			terms: {
				'user.name': ['Foo', 'Bar']
			}
		}
	});
});

test('should create a `terms` query using a term lookup', t => {
	const query = new QueryBuilder()
		.terms('user.name', {index: 'test', type: '_doc', path: 'user.names', id: '4'})
		.build();

	t.deepEqual(query, {
		query: {
			terms: {
				'user.name': {
					index: 'test',
					type: '_doc',
					path: 'user.names',
					id: '4'
				}
			}
		}
	});
});

test('should create a `term_set` query', t => {
	const query = new QueryBuilder()
		.termsSet('user.name', ['Foo', 'Bar', 'Baz'])
		.build();

	t.deepEqual(query, {
		query: {
			terms_set: {
				'user.name': {
					terms: ['Foo', 'Bar', 'Baz']
				}
			}
		}
	});
});

test('should create a `range` query', t => {
	const query = new QueryBuilder()
		.range('age', {gt: 20, lt: 30, boost: 2})
		.build();

	t.deepEqual(query, {
		query: {
			range: {
				age: {
					gt: 20,
					lt: 30,
					boost: 2
				}
			}
		}
	});
});

test('should create `exists` query', t => {
	const query = new QueryBuilder()
		.exists('user.name')
		.build();

	t.deepEqual(query, {
		query: {
			exists: {
				field: 'user.name'
			}
		}
	});
});

test('should create `prefix` query without boost', t => {
	const query = new QueryBuilder()
		.prefix('user.name', 'Fo')
		.build();

	t.deepEqual(query, {
		query: {
			prefix: {
				'user.name': {
					value: 'Fo'
				}
			}
		}
	});
});

test('should create `prefix` query with boost', t => {
	const query = new QueryBuilder()
		.prefix('user.name', 'Fo', 2)
		.build();

	t.deepEqual(query, {
		query: {
			prefix: {
				'user.name': {
					value: 'Fo',
					boost: 2
				}
			}
		}
	});
});

test('should create `wildcard` query without boost', t => {
	const query = new QueryBuilder()
		.wildcard('user.name', 'Fo*')
		.build();

	t.deepEqual(query, {
		query: {
			wildcard: {
				'user.name': {
					value: 'Fo*'
				}
			}
		}
	});
});

test('should create `wildcard` query with boost', t => {
	const query = new QueryBuilder()
		.wildcard('user.name', 'Fo*', 1.45)
		.build();

	t.deepEqual(query, {
		query: {
			wildcard: {
				'user.name': {
					value: 'Fo*',
					boost: 1.45
				}
			}
		}
	});
});

test('should create a `regexp` query', t => {
	const query = new QueryBuilder()
		.regexp('user.name', 's*.?', {boost: 2, flags: 'INTERSECTION'})
		.build();

	t.deepEqual(query, {
		query: {
			regexp: {
				'user.name': {
					value: 's*.?',
					boost: 2,
					flags: 'INTERSECTION'
				}
			}
		}
	});
});

test('should create a `fuzzy` query', t => {
	const query = new QueryBuilder()
		.fuzzy('user.name', 'Ofo', {fuzziness: 3})
		.build();

	t.deepEqual(query, {
		query: {
			fuzzy: {
				'user.name': {
					value: 'Ofo',
					fuzziness: 3
				}
			}
		}
	});
});

test('should create a `type` query', t => {
	const query = new QueryBuilder()
		.type('_doc')
		.build();

	t.deepEqual(query, {
		query: {
			type: {
				value: '_doc'
			}
		}
	});
});

test('should create an `ids` query with a single value and type', t => {
	const query = new QueryBuilder()
		.ids('2', '_doc')
		.build();

	t.deepEqual(query, {
		query: {
			ids: {
				values: ['2'],
				type: '_doc'
			}
		}
	});
});

test('should create an `ids` query with multiple values and no type', t => {
	const query = new QueryBuilder()
		.ids(['1', '2'])
		.build();

	t.deepEqual(query, {
		query: {
			ids: {
				values: ['1', '2']
			}
		}
	});
});
