# elastic-query [![Build Status](https://travis-ci.org/SimonJang/elastic-query.svg?branch=master)](https://travis-ci.org/SimonJang/elastic-query) [![codecov](https://codecov.io/gh/SimonJang/elastic-query/badge.svg?branch=master)](https://codecov.io/gh/SimonJang/elastic-query?branch=master)

> Lightweight query builder for ElasticSearch

## Install


```
$ npm install elastic-query
```


## Usage

```js
const elasticQuery = require('elastic-query');

elasticQuery
	.term('user.name', 'Foobaruser')
	.build();
```


## API

Currently, this query builder is only compatible with ElasticSearch 6.x.

This query builder covers most of the basics of the [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) and one compound query:

- `match_all` [query] (https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
- `match_none` [query] (https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
- All the [Full text queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html)
- All the [Term level queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html)
- The `bool` [Compound query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)

Another important note is when you chain multiple queries, only the last query in the chain will be returned using `build()`. If you use `buildQueryArray()` then the query builder will return an array of `Query` objects.

Summary:

- `build()` creates a leaf query clause.
- `buildQueryArray()` creates a collection of queries that can be used in a compound query clause like `bool`.

## Build operations

### `elasticQuery.build()`

This will create a leaf query of the last query operation performed on the query builder.

### `elasticQuery.buildQueryArray()`

This will return an array of queries which can be used in compound queries.

## Full Text Queries

### `elasticQuery.matchAll()`

### `elasticQuery.matchNone()`

### `elasticQuery.match(field, value, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.matchPhrase(field, value, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html) of ElasticSearch for all the additional properties.

### `elasticQuery.matchPhrasePrefix(field, value, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html) of ElasticSearch for all the additional properties.

### `elasticQuery.multiMatch(fields, value, [options])`

#### field

Type: `string[]`

Fields you want to match.

#### value

Type: `string`

Value you want to match with the provided fields.

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.commonTerms(field, value, cutOff, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### cutoff

Type: `number`

> Terms are allocated to the high or low frequency groups based on the `cutoff_frequency`, which can be specified as an absolute frequency (>=1) or as a relative frequency (0.0 .. 1.0).
[source](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html)

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.queryString(field, value, [options])`

#### field

Type: `string` or `string[]`

Field(s) you want to match.

#### value

Type: `string`

Value you want to match with the provided field(s).

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.simpleQueryString(fields, value, [options])`

#### fields

Type: `string[]`

Fields you want to match.

#### value

Type: `string`

Value you want to match with the provided fields.

#### options

Type: `Object`

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html) of ElasticSearch for all the additional properties.

## Term level Queries

### `elasticQuery.term(fields, value)`

#### fields

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.terms(field, values)`

#### field

Type: `string`

Field you want to match.

#### values

Type: `string[] | Object`

Value you want to match with the provided field(s). Either an array of values you want to match the field with or options for terms lookup mechanism.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.termsSet(field, [options])`

#### field

Type: `string`

Field you want to match.

#### options

Type: `Object`

Additional query options.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.range(field, values)`

#### field

Type: `string`

Field you want to match.

#### values

Type: `string[] | Object`

Value you want to match with the provided field.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.exists(field)`

#### fields

Type: `string`

Field you want to check if it exists.

### `elasticQuery.prefix(field, value, [boost])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### boost

Type: `number`

Value you want to match boost your query with.

### `elasticQuery.wildcard(field, value, [boost])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### boost

Type: `number`

Value you want to match boost your query with.

### `elasticQuery.regexp(field, value, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### options

Type: `Object`

Additional query options.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.fuzzy(field, value, [options])`

#### field

Type: `string`

Field you want to match.

#### value

Type: `string`

Value you want to match with the provided field.

#### options

Type: `Object`

Additional query options.

See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html) of ElasticSearch for all the additional properties.

### `elasticQuery.type(type)`

#### type

Type: `string`

Filters documents matching the provided document / mapping type.

### `elasticQuery.ids(values, [type])`

#### values

Type: `string` or `string[]`

Filters documents that only have the provided values as ids.

#### type

Type: `string`

Filters documents matching the provided document / mapping type.

## Compound Queries

### `elasticQuery.bool(options)`

#### options

Type: `Object`

Boolean search options

##### options.must

Type: `Object[]`

`must` clause, must be an array of queries.

##### options.filter

Type: `Object[]`

`filter` clause, must be an array of queries.

##### options.should

Type: `Object[]`

`should` clause, must be an array of queries.

##### options.must_not

Type: `Object[]`

`must_not` clause, must be an array of queries.

##### options.boost

Type: `number`

Percentage of boost to boost the query with.

##### options.minimum_should_match

Type: `number`

> If the bool query is a filter context or has neither must or filter then at least one of the should queries must match a document for it to match the bool query. This behavior may be explicitly controlled by settings the minimum_should_match parameter.
[source](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)

## License

MIT © [Simon Jang](https://github.com/SimonJang)
