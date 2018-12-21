import {Query} from '.';

export interface Options {
	[key: string]: any;
}

export interface TermsRangeOptions {
	gte?: any;
	gt?: any;
	lte?: any;
	lt?: any;
	boost?: number;
}

export interface TermsQueryOptions {
	index?: string;
	type?: string;
	id?: string;
	path?: string;
	routing?: string;
}

export interface Builder {
	build(): Query;
	buildQueryArray(): Query[];

	matchAll(): Builder;
	matchNone(): Builder;

	// Full text queries
	match(field: string, value: string, options: Options): Builder;
	matchPhrase(field: string, value: string, options: Options): Builder;
	matchPhrasePrefix(field: string, value: string, options: Options): Builder;
	multiMatch(fields: string[], value: string, options: Options): Builder;
	commonTerms(field: string, query: string, cutoff: number, options: Options): Builder;
	queryString(field: string | string[], value: string, options: Options): Builder;
	simpleQueryString(fields: string[], value: string, options: Options): Builder;

	// Term level queries
	term(field: string, value: any): Builder;
	terms(field: string, values: any[] | TermsQueryOptions): Builder;
	termsSet(field: string, values: string[], options: Options): Builder;
	range(field: string, options: TermsRangeOptions): Builder;
	exists(field: string): Builder;
	prefix(field: string, value: string, boost?: number): Builder;
	wildcard(field: string, value: string, boost?: number): Builder;
	regexp(field: string, value: string, options: Options): Builder;
	fuzzy(field: string, value: string, options: Options): Builder;
	type(type: string): Builder;
	ids(values: string | string[], type: string): Builder;
}
