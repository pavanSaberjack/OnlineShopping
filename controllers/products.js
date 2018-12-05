const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        docTitle: "Add Product",
        path: "/admin/add-product",
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    console.log(products);
    res.render('shop', {
        prods: products,
        docTitle: "My Shop",
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};