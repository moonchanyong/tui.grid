import * as clipboard from './clipboard';
import * as data from './data';
import * as focus from './focus';
import * as keyboard from './keyboard';
import * as selection from './selection';
import * as tree from './tree';
import * as validation from './validation';
import { Store } from '../store/types';

const queryMap = {
  ...clipboard,
  ...data,
  ...focus,
  ...keyboard,
  ...selection,
  ...tree,
  ...validation
};

type QueryMap = typeof queryMap;
type QueryFnKeys = keyof QueryMap;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RestParameters<T> = T extends (first: any, ...args: infer P) => any ? P : never;

export interface Query {
  <T extends QueryFnKeys>(fname: T, ...args: RestParameters<QueryMap[T]>): void;
}

export interface QueryProps {
  query: Query;
}

export function createQuery(store: Store): Query {
  return function query(fname, ...args) {
    // @ts-ignore
    queryMap[fname](store, query, ...args);
  };
}
