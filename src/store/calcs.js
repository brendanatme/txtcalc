import { Store } from 'pullstate';
import * as cache from './cache.js';

const CALCS_KEY = 'calcs';

const ogCalcs = {
  itemMap: {
    2: {
      createdAt: 2,
      exp0: '(4 + 1) * 3^2 / 0.9',
      exp1: '1 mile * 2 km',
      exp2: '1 week + 2 days in minutes',
      exp3: '1 cup in mL',
      id: '2',
      name: 'Sample',
    },
    1: {
      createdAt: 1,
      exp0: '',
      exp1: '',
      exp2: '',
      exp3: '',
      id: '1',
      name: 'Empty',
    },
  },
  selectedId: 2,
  size: 2,
};

const savedCalcs = cache.get(CALCS_KEY);

const calcs = new Store(savedCalcs && savedCalcs.size ? savedCalcs : ogCalcs);

export const trigger = {
  addCalc: (calc) => calcs.update((s) => {
    s.size = s.size + 1;
    s.itemMap = {
      ...s.itemMap,
      [calc.id]: calc,
    };
    s.selectedId = calc.id;

    cache.set(CALCS_KEY, s);
  }),

  selectCalc: (id) => calcs.update((s) => {
    s.selectedId = id;

    cache.set(CALCS_KEY, s);
  }),

  deleteCalc: (id) => calcs.update((s) => {
    const newSize = s.size - 1;
    
    if (newSize === 0) {
      s.itemMap = ogCalcs.itemMap;
      s.selectedId = ogCalcs.selectedId;
      s.size = ogCalcs.size;

      cache.set(CALCS_KEY, s);

      return;
    }

    s.size = s.size - 1;
    
    delete s.itemMap[id];

    s.itemMap = { ...s.itemMap };

    if (s.selectedId === id) {
      Object.keys(s.itemMap).map((k, i) => {
        if (i === 0) {
          s.selectedId = s.itemMap[k].id;
        }
      });
    }

    cache.set(CALCS_KEY, s);
  }),
};

export const select = {
  items: () => calcs.useState((s) => Object.values(s.itemMap).sort((a, b) => b.createdAt - a.createdAt)),
  selectedId: () => calcs.useState((s) => s.selectedId),
  selected: () => calcs.useState((s) => s.itemMap[s.selectedId]),
};
