import chain from './chain';
import compose from './compose';
import identity from './identity';
import map from './map';
import prepend from './prepend';


/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode(Maybe.of({"user":{"address":{"state":"ny"}}})); //=> Maybe.Just("NY")
 *       getStateCode(Maybe.of({})); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a, b) = R.chain(f, R.chain(g, h(a, b)))
 */
export default function composeK() {
  return compose.apply(this, prepend(identity, map(chain, arguments)));
};
