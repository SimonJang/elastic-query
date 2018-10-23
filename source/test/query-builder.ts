import test from 'ava';
import {QueryBuilder} from '../lib/query-builder';

test('should overwrite consecutive queries of the same type', t => {
	const query = new QueryBuilder()
		.exists('user.name')
		.exists('user.firstName')
		.build();

	t.deepEqual(query, {
		query: {
			exists: {
				field: 'user.firstName'
			}
		}
	});
});
