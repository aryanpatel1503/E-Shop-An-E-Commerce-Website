const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { sendEmail } = require("./EmailService");
// const path = require("path");

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use(express.json({ limit: "200mb" }));
// app.use(express.urlencoded({ limit: "200mb", extended: true }));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", // a secret key to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "e_shop_2024",
});

// for session
app.get("/", (req, res) => {
  if (req.session.user_name) {
    return res.json({
      valid: true,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
    });
  } else {
    return res.json({ valid: false });
  }
});

// User Registration
app.post("/register", (req, res) => {
  const username = req.body.user_name;
  const user_fullname = req.body.user_fullname;
  const email = req.body.user_email;
  const password = req.body.user_password;
  const mobile = req.body.user_mobile;
  const user_gender = req.body.user_gender;
  const permanent_address = req.body.permanent_address;
  const permanent_city = req.body.permanent_city;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;
  const current_address = req.body.current_address;
  const current_city = req.body.current_city;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  con.query(
    "INSERT INTO user_reg (user_name, user_fullname, user_email, user_password, user_mobile, user_gender, permanent_address, permanent_city, permanent_state, permanent_pincode, current_address, current_city, current_state, current_pincode ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [
      username,
      user_fullname,
      email,
      password,
      mobile,
      user_gender,
      permanent_address,
      permanent_city,
      permanent_state,
      permanent_pincode,
      current_address,
      current_city,
      current_state,
      current_pincode,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Registration Successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// User Login
app.post("/login", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;

  con.query(
    "SELECT * FROM user_reg WHERE user_name = ? AND user_password = ?",
    [username, password],
    (err, result) => {
      // console.log(result);
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200);
          res.send({ message: "Login Successfully", result });
          // req.session.user_name = result[0].user_name;
          // req.session.user_id = result[0].user_id;
          // res.json({Login: true});
          // localStorage.setItem('user_id', result[0].user_id)
          // console.log(req.session.user_id);
        } else {
          res.status(400);
          res.send({ message: "Wrong Username or Password!", Login: false });
        }
      }
    }
  );
});

// forget password
app.post("/user/emailcheck", (req, res) => {
  const email = req.body.user_email;

  con.query(
    "SELECT user_email FROM user_reg WHERE user_email = ?",
    [email],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Email is not registered!" });
        }
      }
    }
  );
});

app.put("/resetpassword", (req, res) => {
  // const id = req.params.id;
  const password = req.body.user_password;
  const email = req.body.user_email;

  con.query(
    "UPDATE USER_REG SET user_password = ? WHERE user_email = ? ",
    [password, email],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
});

// Admin Login
app.post("/admin", (req, res) => {
  const adminname = req.body.admin_name;
  const password = req.body.admin_password;

  con.query(
    "SELECT * FROM admin WHERE admin_name = ? AND admin_password = ?",
    [adminname, password],
    (err, result) => {
      if (err) {
        console.log(err);
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200);
          res.send({ result });
        } else {
          console.log(err);
          res.status(400);
          res.send({ message: "Wrong Username or Password!" });
        }
      }
    }
  );
});

// Get all Users
app.get("/users", (req, res) => {
  con.query("SELECT * FROM USER_REG ORDER BY user_id", (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "User get successfully", result });
    }
  });
});

// Get user count
app.get("/users/count", (req, res) => {
  con.query(
    "SELECT COUNT(user_id) as user_count FROM USER_REG ORDER BY user_id",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});
// Get single User
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT * FROM USER_REG WHERE user_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM USER_REG WHERE user_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Customer Deleted Successfully", result });
    }
  });
});

// Edit User
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body.user_name;
  const user_fullname = req.body.user_fullname;
  const email = req.body.user_email;
  const password = req.body.user_password;
  const mobile = req.body.user_mobile;
  const user_gender = req.body.user_gender;
  const permanent_address = req.body.permanent_address;
  const permanent_city = req.body.permanent_city;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;
  const current_address = req.body.current_address;
  const current_city = req.body.current_city;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  con.query(
    "UPDATE USER_REG SET user_name = ?, user_fullname = ?, user_email = ?, user_password = ?, user_mobile = ?,  user_gender = ?, permanent_address = ?, permanent_city = ?, permanent_state = ?, permanent_pincode = ?, current_address = ?, current_city = ? , current_state = ?, current_pincode = ? WHERE user_id = ? ",
    [
      username,
      user_fullname,
      email,
      password,
      mobile,
      user_gender,
      permanent_address,
      permanent_city,
      permanent_state,
      permanent_pincode,
      current_address,
      current_city,
      current_state,
      current_pincode,
      id,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Customer Updated successfully", result });
      } else {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Get all Product
app.get("/products", (req, res) => {
  con.query(
    "SELECT p.*, c.category FROM product p INNER JOIN category c ON p.category_id = c.category_id ORDER BY product_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product get successfully", result });
      }
    }
  );
});

// Get all Product by category
app.get("/category/:name", (req, res) => {
  const category = req.params.name;

  con.query(
    "SELECT product.*, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ?",
    [category],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Get all Product by category and ascending by product name
app.get("/productcategory/:category/asc", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ?",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and descending by product name
app.get("/productcategory/:category/desc", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_name desc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and ascending by product price
app.get("/productcategory/:category/ltoh", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_price asc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and descending by product price
app.get("/productcategory/:category/htol", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_price desc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get Product count
app.get("/products/count", (req, res) => {
  con.query(
    "SELECT COUNT(product_id) as product_count FROM product ORDER BY product_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Get Product category count
app.get("/productcategory/count", (req, res) => {
  con.query(
    "SELECT COUNT(category_id) as catcount FROM `category` ORDER BY category_id",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Product

app.post("/products/add", (req, res) => {
  // app.post('/products/add', upload.single('product_img'), (req, res) => {

  const product_name = req.body.product_name;
  const product_desc = req.body.product_desc;
  // const product_category = req.body.product_category;
  const product_img = req.body.product_img;
  const product_price = req.body.product_price;
  const product_color = req.body.product_color;
  const product_size = req.body.product_size;
  const product_storage = req.body.product_storage;
  const product_brand = req.body.product_brand;
  const product_special_features = req.body.product_special_features;
  const product_weight = req.body.product_weight;
  const product_height = req.body.product_height;
  const product_warranty = req.body.product_warranty;
  const product_guarantee = req.body.product_guarantee;
  const product_info = req.body.product_info;
  const category_id = req.body.category_id;

  con.query(
    "INSERT INTO product (product_name, product_desc, product_img, product_price, product_color, product_size, product_storage, product_brand, product_special_features, product_weight, product_height, product_warranty, product_guarantee, product_info, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [
      product_name,
      product_desc,
      product_img,
      product_price,
      product_color,
      product_size,
      product_storage,
      product_brand,
      product_special_features,
      product_weight,
      product_height,
      product_warranty,
      product_guarantee,
      product_info,
      category_id,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
        console.log(err);
      } else {
        res.status(200);
        res.send({ message: "Product added successfully", result });
      }
    }
  );
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "DELETE FROM product WHERE product_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product deleted successfully", result });
      }
    }
  );
});

// Edit Product
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product_name = req.body.product_name;
  const product_desc = req.body.product_desc;
  // const product_category = req.body.product_category;
  const product_img = req.body.product_img;
  const product_price = req.body.product_price;
  const product_color = req.body.product_color;
  const product_size = req.body.product_size;
  const product_storage = req.body.product_storage;
  const product_brand = req.body.product_brand;
  const product_special_features = req.body.product_special_features;
  const product_weight = req.body.product_weight;
  const product_height = req.body.product_height;
  const product_warranty = req.body.product_warranty;
  const product_guarantee = req.body.product_guarantee;
  const product_info = req.body.product_info;
  const category_id = req.body.category_id;

  con.query(
    "UPDATE product SET product_name = ?, product_desc = ?, product_img = ?, product_price = ?, product_color = ?, product_size = ?, product_storage = ?, product_brand = ?, product_special_features = ?, product_weight = ?, product_height = ?, product_warranty = ?, product_guarantee = ?, product_info = ? , category_id = ? WHERE product_id = ? ",
    [
      product_name,
      product_desc,
      product_img,
      product_price,
      product_color,
      product_size,
      product_storage,
      product_brand,
      product_special_features,
      product_weight,
      product_height,
      product_warranty,
      product_guarantee,
      product_info,
      category_id,
      id,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      } else {
        res.status(200);
        res.send({ message: "Product updated successfully", result });
      }
    }
  );
});

// Get single product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT p.*, c.category FROM product p INNER JOIN category c ON p.category_id = c.category_id WHERE product_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product get successfully", result });
      }
    }
  );
});

// Get all Orders
app.get("/orders", (req, res) => {
  con.query(
    "SELECT o.*, u.user_name, p.product_name, p.product_desc, p.product_price, p.product_img FROM orders o INNER JOIN user_reg u ON o.user_id = u.user_id INNER JOIN product p ON o.product_id = p.product_id ORDER BY order_id ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get Orders count
app.get("/orders/count", (req, res) => {
  con.query(
    "SELECT COUNT(order_id) as order_count FROM orders ORDER BY order_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Order
app.post("/orders/add", (req, res) => {
  const {
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    product_id,
    user_id,
  } = req.body;

  con.query(
    "INSERT INTO orders (order_name, order_address, order_city, order_state, order_mobile, order_email, order_pincode, order_status, shipping_method, product_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      order_name,
      order_address,
      order_city,
      order_state,
      order_mobile,
      order_email,
      order_pincode,
      order_status,
      shipping_method,
      product_id,
      user_id,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Order added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Delete Order
app.delete("/orders/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM orders WHERE order_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Order deleted successfully", result });
    }
  });
});

// Edit Order

app.put("/orders/:id", (req, res) => {
  const id = req.params.id;
  const {
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    product_id,
    user_id,
  } = req.body;

  con.query(
    "UPDATE orders SET order_name = ?, order_address = ?, order_city = ?, order_state = ?, order_mobile = ?, order_email = ?, order_pincode = ?, order_status = ?, shipping_method = ?, product_id = ?, user_id = ? WHERE order_id = ? ",
    [
      order_name,
      order_address,
      order_city,
      order_state,
      order_mobile,
      order_email,
      order_pincode,
      order_status,
      shipping_method,
      product_id,
      user_id,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      } else {
        res.status(200);
        res.send({ message: "Order updated successfully", result });
      }
    }
  );
});

// Get single order
app.get("/orders/:id", (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM orders WHERE order_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Order get successfully", result });
    }
  });
});

// Get all feedback
app.get("/feedback", (req, res) => {
  con.query(
    "SELECT f.*, u.user_name, p.product_name FROM feedback f INNER JOIN user_reg u ON f.user_id = u.user_id INNER JOIN product p ON f.product_id = p.product_id ORDER BY f.feedback_id",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.send(result);
      }
    }
  );
});

// Get all feedback by product
app.get("/feedback/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    "SELECT feedback.feedback_id, feedback.feedback_id, feedback.feedback, user_reg.user_name FROM feedback INNER JOIN user_reg ON feedback.user_id = user_reg.user_id WHERE product_id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Feedback
app.post("/feedback/add", (req, res) => {
  const username = req.body.username;
  const feedback = req.body.feedback;
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  con.query(
    "INSERT INTO feedback (username, feedback, user_id, product_id) VALUES (?, ?, ?, ?) ",
    [username, feedback, user_id, product_id],
    (err, result) => {
      if (result) {
        res.send({ message: "Feedback added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Add contact
app.post("/contact/add", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const message = req.body.message;

  con.query(
    "INSERT INTO contact (username, email, message) VALUES (?, ?, ?) ",
    [username, email, message],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Contact added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// View order for user
app.get("/userorders/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    "SELECT orders.order_id, product.product_name, product.product_img, product.product_price, product.product_desc FROM orders INNER JOIN product ON orders.product_id = product.product_id WHERE user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Category
app.get("/category", (req, res) => {
  con.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Category get successfully", result });
    }
  });
});

// get a single category
app.get("/getCategory/:id", (req, res) => {
  const category_id = req.params.id;

  con.query(
    "SELECT * FROM category WHERE category_id = ?",
    [category_id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category get successfully", result });
      }
    }
  );
});

// Add Category
app.post("/category/add", (req, res) => {
  const category = req.body.category;
  const category_img = req.body.category_img;
  con.query(
    "INSERT INTO category (category, category_img) values (?, ?)",
    [category, category_img],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category added successfully", result });
      }
    }
  );
});

// Edit Category
app.put("/category/:id", (req, res) => {
  const id = req.params.id;
  const category = req.body.category;
  const category_img = req.body.category_img;
  con.query(
    "UPDATE category SET category = ?, category_img = ? WHERE category_id = ?",
    [category, category_img, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category updated successfully", result });
      }
    }
  );
});

// delete category
app.delete("/category/:id", (req, res) => {
  const id = req.params.id;
  // con.query("DELETE FROM category WHERE category_id = ?", [id], (err, result) => {
  con.query(
    "DELETE FROM CATEGORY WHERE category_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category deleted successfully", result });
      }
    }
  );
});

// Get Orders count
app.get("/counts", (req, res) => {
  con.query(
    "SELECT (SELECT COUNT(*) FROM user_reg) AS total_users,(SELECT COUNT(*) FROM product) AS total_products,(SELECT COUNT(*) FROM `orders`) AS total_orders,(SELECT COUNT(*) FROM category) AS total_categories",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Endpoint to trigger email notifications
app.post("/send-email", async (req, res) => {
  const { email, product, image } = req.body;

  try {
    await sendEmail({
      recipients: email,
      subject: "New Product Added",
      text: `The product "${product}" has been added.`,
      image,
    });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

app.listen(3001, () => {
  console.log("running backend server");
});
