// app/lib/db.js
import { Database } from 'sqlite3';

const db = new Database(':memory:'); // インメモリデータベースの例です。ファイルベースに変更できます。

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const decreaseProductStock = (id, quantity) => {
  return new Promise((resolve, reject) => {
    // 現在の在庫数を取得
    db.get('SELECT stock FROM products WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      
      const currentStock = row.stock;
      if (currentStock === undefined) {
        return reject(new Error('Product not found'));
      }

      const newStock = Math.max(currentStock - quantity, 0); // 在庫数は0以上にする

      // 在庫数を更新
      db.run('UPDATE products SET stock = ? WHERE id = ?', [newStock, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

// 既存の関数である場合はそのまま使用する
export const updateProductStock = decreaseProductStock;

db.serialize(() => {
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, stock INTEGER)');
  const stmt = db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)');
  stmt.run('Recipe 1', 300, 10);
  stmt.run('Recipe 2', 500, 10);
  stmt.run('Recipe 3', 400, 10);
  stmt.run('Recipe 4', 400, 10);
  stmt.run('Recipe 5', 200, 10);
  stmt.run('Recipe 6', 400, 10);
  stmt.run('Recipe 7', 1000, 10);
  stmt.run('Recipe 8', 1500, 10);
  stmt.run('Recipe 9', 500, 10);
  stmt.finalize();
});
