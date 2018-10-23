import {Options, CompoundBuilder, BoolOptions, TermsRangeOptions, TermsQueryOptions} from './entities';

export class QueryBuilder implements CompoundBuilder {
	private readonly query: any[] = [];

	/**
	 * Retrieve all documents.
	 */
	matchAll() {
		this.query.push({match_all: {}});

		return this;
	}

	/**
	 * Retrieve not a single document.
	 */
	matchNone() {
		this.query.push({match_none: {}});

		return this;
	}

	// Full text queries

	match(field: string, value: string, options: Options = {}) {
		this.query.push({match: {
			[field]: {
				query: value,
				...options
			}}}
		);

		return this;
	}

	matchPhrase(field: string, value: string, options: Options = {}) {
		this.query.push({match_phrase: {
			[field]: {
				query: value,
				...options
			},
		}});

		return this;
	}

	matchPhrasePrefix(field: string, value: string, options: Options) {
		this.query.push({match_phrase_prefix: {
			[field]: {
				query: value,
				...options
			},
		}});

		return this;
	}

	multiMatch(fields: string[], value: string, options: Options = {}) {
		this.query.push({multi_match: {
			query: value,
			fields,
			...options
		}});

		return this;
	}

	commonTerms(field: string, query: string, cutOff: number, options: Options = {}) {
		this.query.push({common: {
			[field]: {
				query,
				cutoff_frequency: cutOff,
				...options
			}
		}});

		return this;
	}

	queryString(field: string | string[], value: string, options: Options = {}) {
		const queryString: any = {
			query: value,
			...options
		};

		if (Array.isArray(field)) {
			queryString.fields = field;

		} else {
			queryString.default_field = field;
		}

		this.query.push({query_string: queryString});

		return this;
	}

	simpleQueryString(fields: string[], value: string, options: Options = {}) {
		this.query.push({
			simple_query_string: {
				query: value,
				fields,
				...options
			}
		});

		return this;
	}

	/**
	 * Term level queries
	 */

	term(field: string, value: string) {
		this.query.push({
			term: {
				[field]: value
			}
		});

		return this;
	}

	terms(field: string, values: string[] | TermsQueryOptions) {
		this.query.push({
			terms: {
				[field]: values
			}
		});

		return this;
	}

	termsSet(field: string, values: string[], options: Options = {}) {
		this.query.push({
			terms_set: {
				[field]: {
					terms: values,
					...options
				}
			}
		});

		return this;
	}

	range(field: string, options: TermsRangeOptions = {}) {
		this.query.push({
			range: {
				[field]: options
			}
		});

		return this;
	}

	exists(field: string) {
		this.query.push({
			exists: {
				field
			}
		});

		return this;
	}

	prefix(field: string, value: string, boost?: number) {
		const prefix: any = {
			[field]: {
				value,
			}
		};

		if (boost !== undefined && typeof boost === 'number') {
			prefix[field].boost = boost;
		}

		this.query.push({
			prefix
		});

		return this;
	}

	wildcard(field: string, value: string, boost?: number) {
		const wildcard: any = {
			[field]: {
				value,
			}
		};

		if (boost !== undefined && typeof boost === 'number') {
			wildcard[field].boost = boost;
		}

		this.query.push({
			wildcard
		});

		return this;
	}

	regexp(field: string, value: string, options: Options = {}) {
		this.query.push({
			regexp: {
				[field]: {
					value,
					...options
				}
			}
		});

		return this;
	}

	fuzzy(field: string, value: string, options: Options = {}) {
		this.query.push({
			fuzzy: {
				[field]: {
					value,
					...options
				}
			}
		});

		return this;
	}

	type(type: string) {
		this.query.push({
			type: {
				value: type
			}
		});

		return this;
	}

	ids(values: string | string[], type?: string) {
		const ids: any = {
			values: Array.isArray(values) ? values : [values]
		};

		if (type) {
			ids.type = type;
		}

		this.query.push({
			ids
		});

		return this;
	}

	bool(opts: BoolOptions) {
		this.query.push({
			...opts
		});

		return this;
	}

	build() {
		return {
			query: this.query.pop() || {}
		};
	}

	buildQueryArray() {
		return this.query;
	}
}
