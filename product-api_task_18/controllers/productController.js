const db = require("../config/db");

const getProducts = (req, res) => {

    db.query(
        "SELECT * FROM products",
        (err, result) => {
            res.json(result);
        }
    );
};

const createProduct = (req, res) => {

    const {
        name,
        description,
        price,
        category
    } = req.body;

    const sql =
        "INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        [name, description, price, category],
        (err, result) => {

            res.status(201).json({
                message: "Product created",
                id: result.insertId
            });
        }
    );
};

const updateProduct = (req, res) => {

    const {
        name,
        description,
        price,
        category
    } = req.body;

    const sql =
        "UPDATE products SET name=?, description=?, price=?, category=? WHERE id=?";

    db.query(
        sql,
        [
            name,
            description,
            price,
            category,
            req.params.id
        ],
        () => {

            res.json({
                message: "Product updated"
            });
        }
    );
};

const deleteProduct = (req, res) => {

    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        () => {

            res.json({
                message: "Product deleted"
            });
        }
    );
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};