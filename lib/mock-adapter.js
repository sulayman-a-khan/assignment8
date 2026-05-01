import fs from 'fs';
import path from 'path';

const log = (msg) => {
  try {
    const logPath = path.join(process.cwd(), 'scratch', 'adapter.log');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${msg}\n`);
  } catch (e) {}
};

export const createMemoryAdapter = () => {
  const store = {
    user: [],
    session: [],
    account: [],
    verification: [],
  };

  const matches = (item, where) => {
    if (!where) return true;
    if (Array.isArray(where)) {
      return where.every(w => {
        const val = item[w.field];
        if (w.operator === "eq" || !w.operator) return val === w.value;
        if (w.operator === "in") return Array.isArray(w.value) && w.value.includes(val);
        return false;
      });
    }
    // Handle object format
    return Object.entries(where).every(([key, value]) => item[key] === value);
  };

  return {
    id: "memory-adapter",
    create: async ({ model, data }) => {
      log(`CREATE ${model}: ${JSON.stringify(data)}`);
      const newItem = { ...data, id: data.id || Math.random().toString(36).substring(2) };
      if (!store[model]) store[model] = [];
      store[model].push(newItem);
      return newItem;
    },
    findOne: async ({ model, where }) => {
      log(`FINDONE ${model}: ${JSON.stringify(where)}`);
      if (!store[model]) return null;
      return store[model].find(item => matches(item, where)) || null;
    },
    findMany: async ({ model, where }) => {
      log(`FINDMANY ${model}: ${JSON.stringify(where)}`);
      if (!store[model]) return [];
      return store[model].filter(item => matches(item, where));
    },
    update: async ({ model, where, update }) => {
      log(`UPDATE ${model}: ${JSON.stringify(where)} -> ${JSON.stringify(update)}`);
      if (!store[model]) return null;
      const index = store[model].findIndex(item => matches(item, where));
      if (index === -1) return null;
      store[model][index] = { ...store[model][index], ...update };
      return store[model][index];
    },
    updateMany: async ({ model, where, update }) => {
      log(`UPDATEMANY ${model}: ${JSON.stringify(where)}`);
      if (!store[model]) return 0;
      let count = 0;
      store[model] = store[model].map(item => {
        if (matches(item, where)) {
          count++;
          return { ...item, ...update };
        }
        return item;
      });
      return count;
    },
    delete: async ({ model, where }) => {
      log(`DELETE ${model}: ${JSON.stringify(where)}`);
      if (!store[model]) return;
      const index = store[model].findIndex(item => matches(item, where));
      if (index !== -1) store[model].splice(index, 1);
    },
    deleteMany: async ({ model, where }) => {
      log(`DELETEMANY ${model}: ${JSON.stringify(where)}`);
      if (!store[model]) return 0;
      const initialCount = store[model].length;
      store[model] = store[model].filter(item => !matches(item, where));
      return initialCount - store[model].length;
    }
  };
};
