import {Builder} from './base-query-builder';
import {Query} from '.';

export interface BoolOptions {
	must?: Query[];
	filter?: Query[];
	should?: Query[];
	must_not?: Query[];
	boost?: number;
	minimum_should_match?: number;
}

export interface CompoundBuilder extends Builder {
	bool(options: BoolOptions): CompoundBuilder;
}
