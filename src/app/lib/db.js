import { Database } from 'sqlite3';

const db = new Database(':memory:'); // インメモリデータベースの例。必要に応じてファイルベースに変更

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, stock INTEGER)');
  
  // サンプルデータの挿入
  const stmt = db.prepare('INSERT INTO products (id, name, price, stock) VALUES (?, ?, ?, ?)');
  
  stmt.run(1, '豚骨ラーメン', 300, 10);
  stmt.run(2, 'オードブル', 500, 10);
  stmt.run(3, 'イタリアンオードブル', 400, 10);
  stmt.run(4, 'ペンネ盛り合わせ', 400, 10);
  stmt.run(5, '照り焼きチキンピザ', 200, 10);
  stmt.run(6, '鶏モモステーキ', 400, 10);
  stmt.run(7, '金目鯛の煮つけ', 1000, 10);
  stmt.run(8, 'ジェノベーゼパスタ', 1500, 10);
  stmt.run(9, '天ぷら盛り合わせ', 500, 10);
  
  stmt.finalize();
});

// 商品情報を取得する関数
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error fetching product:', err);
        return reject(err);
      }
      resolve(row);
    });
  });
};

// 商品の在庫を更新する関数
export const updateProductStock = (id, quantity) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, id], function(err) {
      if (err) {
        console.error('Error updating stock:', err);
        return reject(err);
      }
      resolve(this.changes);
    });
  });
};
