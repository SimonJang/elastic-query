import test from 'ava';
import {QueryBuilder} from '../lib/query-builder';

test('should create a `bool` query', t => {
	const leafQueries = new QueryBuilder()
		.term('user.name', 'Foo')
		.range('date', {gte: '2018'})
		.buildQueryArray();

	const boolQuery = new QueryBuilder()
		.bool({must: leafQueries})
		.build();

	t.deepEqual(boolQuery, {
		query: {
			bool: {
				must: [
					{
						term: {
							'user.name': 'Foo'
						}
					},
					{
						range: {
							date: {
								gte: '2018'
							}
						}
					}
				]
			}
		}
	});
});
