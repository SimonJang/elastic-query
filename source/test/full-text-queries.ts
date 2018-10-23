import test from 'ava';
import {QueryBuilder} from '../lib/query-builder';

test('should create query object', t => {
	const query = new QueryBuilder()
		.build();

	t.deepEqual(query, {
		query: {}
	});
});

test('should create match all query', t => {
	const query = new QueryBuilder()
		.matchAll()
		.build();

	t.deepEqual(query, {
		query: {
			match_all: {}
		}
	});
});

test('should create a match none query', t => {
	const query = new QueryBuilder()
		.matchNone()
		.build();

	t.deepEqual(query, {
		query: {
			match_none: {}
		}
	});
});

test('should create a `match` query', t => {
	const query = new QueryBuilder()
		.match('user.name', 'foo', {operator: 'AND'})
		.build();

	t.deepEqual(query, {
		query: {
			match: {
				'user.name': {
					query: 'foo',
					operator: 'AND'
				}
			}
		}
	});
});

test('should create a `match_phrase` query', t => {
	const query = new QueryBuilder()
		.matchPhrase('user.name', 'foobar')
		.build();

	t.deepEqual(query, {
		query: {
			match_phrase: {
				'user.name': {
					query: 'foobar'
				}
			}
		}
	});
});

test('should create a `match_phrase_prefix` query', t => {
	const query = new QueryBuilder()
		.matchPhrasePrefix('user.name', 'foobar', {max_expansions: 10})
		.build();

	t.deepEqual(query, {
		query: {
			match_phrase_prefix: {
				'user.name': {
					query: 'foobar',
					max_expansions: 10
				}
			}
		}
	});
});

test('should create a `multi_match` query', t => {
	const query = new QueryBuilder()
		.multiMatch(['user.name', 'user.firstName'], 'foo', {type: 'best_fields'})
		.build();

	t.deepEqual(query, {
		query: {
			multi_match: {
				fields: ['user.name', 'user.firstName'],
				query: 'foo',
				type: 'best_fields'
			}
		}
	});
});

test('should create a `common` query', t => {
	const query = new QueryBuilder()
		.commonTerms('body', 'Searching using the common query', 0.001, {minimum_should_match: 2})
		.build();

	t.deepEqual(query, {
		query: {
			common: {
				body: {
					query: 'Searching using the common query',
					cutoff_frequency: 0.001,
					minimum_should_match: 2
				}
			}
		}
	});
});

test('should create a `query_string` query with a single fields', t => {
	const query = new QueryBuilder()
		.queryString('user.name', 'foo', {fuzzy_max_expansions: 20})
		.build();

	t.deepEqual(query, {
		query: {
			query_string: {
				default_field: 'user.name',
				query: 'foo',
				fuzzy_max_expansions: 20
			}
		}
	});
});

test('should create a `query_string` query with multiple fields', t => {
	const query = new QueryBuilder()
		.queryString(['user.name', 'user.firstName'], 'foo', {fuzzy_max_expansions: 60})
		.build();

	t.deepEqual(query, {
		query: {
			query_string: {
				fields: ['user.name', 'user.firstName'],
				query: 'foo',
				fuzzy_max_expansions: 60
			}
		}
	});
});

test('should create a `simple_query_string` query', t => {
	const query = new QueryBuilder()
		.simpleQueryString(['user.name'], 'bar', {default_operator: 'AND'})
		.build();

	t.deepEqual(query, {
		query: {
			simple_query_string: {
				query: 'bar',
				fields: ['user.name'],
				default_operator: 'AND'
			}
		}
	});
});
