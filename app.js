// app.js
app.post('/api/categories', requireAuth, (req, res) => {
const { name } = req.body;
if (!name) return res.status(400).json({ error: 'faltan datos' });
db.run('INSERT INTO categories (name) VALUES (?)', [name], function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ id: this.lastID, name });
});
});


// Obtener productos (opcional filtro por category_id)
app.get('/api/products', (req, res) => {
const { category_id } = req.query;
let sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
const params = [];
if (category_id) {
sql += ' WHERE p.category_id = ?';
params.push(category_id);
}
db.all(sql, params, (err, rows) => {
if (err) return res.status(500).json({ error: 'error db' });
res.json(rows);
});
});


// Crear producto (admin)
app.post('/api/products', requireAuth, (req, res) => {
const { name, description, price, category_id } = req.body;
if (!name || price == null) return res.status(400).json({ error: 'faltan datos' });
db.run(
'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)',
[name, description || '', price, category_id || null],
function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ id: this.lastID, name });
}
);
});


// Editar producto (admin)
app.put('/api/products/:id', requireAuth, (req, res) => {
const id = req.params.id;
const { name, description, price, category_id } = req.body;
db.run(
'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
[name, description, price, category_id, id],
function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ changed: this.changes });
}
);
});


// Borrar producto (admin)
app.delete('/api/products/:id', requireAuth, (req, res) => {
const id = req.params.id;
db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ deleted: this.changes });
});
});


// Ruta para comprobar sesión
app.get('/api/me', (req, res) => {
if (req.session && req.session.userId) return res.json({ logged: true });
return res.json({ logged: false });
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Servidor escuchando en http://localhost:' + PORT);
});