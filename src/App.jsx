import { useState } from 'react';
import 'bulma/css/bulma.css';

import cn from 'classnames';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField, reversed }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SORT_ALPHABETICALLY) {
        return good1.localeCompare(good2);
      }

      if (sortField === SORT_BY_LENGTH) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const resetSorting = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
