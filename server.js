const { request, response } = require('express');
const express = require('express');

const { check, validationResult } = require('express-validator');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require("./db");
const bcrypt = require('bcrypt');
const e = require('express');

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");
/*
app.use(bodyParser.urlencoded({ extended:  }));
app.use(cookieParser('hoa'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
*/
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);
/*

require('./web/routers/home.router')(app);

require('./web/routers/dangky.router')(app);

require('./web/routers/dangnhap.router')(app);
*/

app.get("/", function(request, response) {

    response.render("homePage");
});

app.get("/trangchu", function(request, response) {

    response.render("intro");
});

app.get("/bangchucai/hiragana", function(request, response) {
    var sql = "SELECT hiragana, example, romaji FROM alphabet";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
})
app.get("/bangchucai/katakana", function(request, response) {
    var sql = "SELECT katakana, romaji FROM alphabet";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
})

app.get("/cackhoahoc/N5", function(request, response) {

    response.render("N5");
});
app.get("/cackhoahoc/N5/tu_vung", function(request, response) {

    response.render("baihocN5");
});

app.get("/cackhoahoc/N5/tu_vung/Bai1", function(request, response) {
    var sql = "SELECT name, mean, romaji FROM word WHERE unit_id = '1'";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
});
app.get("/cackhoahoc/N5/tu_vung/Bai2", function(request, response) {
    var sql = "SELECT name, mean, romaji FROM word WHERE unit_id = '2'";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
});

app.get("/cackhoahoc/N5/tu_vung/Bai3", function(request, response) {
    var sql = "SELECT name, mean, romaji FROM word WHERE unit_id = '3'";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
});

app.get("/cackhoahoc/N5/tu_vung/Bai4", function(request, response) {
    var sql = "SELECT name, mean, romaji FROM word WHERE unit_id = '4'";
    db.query(sql, function(err, results) {
        if (err) throw err;
        response.send(results)
    });
});


app.get("/cackhoahoc/N4", function(request, response) {

    response.render("N4");
});
app.get("/cackhoahoc/N3", function(request, response) {

    response.render("N3");
});
app.get("/cackhoahoc/N2", function(request, response) {

    response.render("N2");
});
app.get("/cackhoahoc/N1", function(request, response) {

    response.render("N1");
});
app.get("/dangnhap", function(request, response) {

    response.render("dangnhap");
});

app.get("/dangky", function(request, response) {

    response.render("dangky");
});


/*
const validator = [
    check('ten_dang_nhap').exists().withMessage('Vui lòng nhập tên đăng nhập')
    .notEmpty().withMessage('Không được để trống tên đăng nhập')
    .isLength({ min: 3 }).withMessage('Tên đăng nhập phải từ 3 kí tự'),

    check('email').exists().withMessage('Vui lòng nhập email')
    .notEmpty().withMessage('Không được để trống email')
    .isEmail().withMessage('Đây không phải email hợp lệ'),

    check('psw').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Không được để trống mật khẩu')
    .isLength({ min: 3 }).withMessage('Mật khẩu phải từ 6 kí tự'),

    check('psw-repeat').exists().withMessage('Vui lòng nhập lại mật khẩu')
    .notEmpty().withMessage('Vui lòng nhập lại mật khẩu')
    .custom((value, { response }) => {
        if (value !== response.body.psw) {
            throw new Error('Mật khẩu không khớp')
        }
        return true;
    })
]

app.post("/dangky", validator, (request, response) => {
    let result = validationResult(request);
    if (result.errors.length === 0) {
        const { ten_dang_nhap, email, psw } = request.body;

        const hashed = bcrypt.hashSync(psw, 10);

        const sql = 'insert into account(ten_dang_nhap, email, psw) values(?,?,?) '
        const params = [ten_dang_nhap, email, hashed]
        db.query(sql, params, (err, result, fields) => {
            if (err) {
                throw e;
            }
            return response.send('Input OK. Processing')
        })
        return

    }
    result = result.mapped();

    let message;
    for (fields in result) {
        message = result[fields].msg;
        break;
    }
    request.flash('error', message);
    response.redirect('/dangky');
    //response.render("dangky");
});
*/
app.post("/dangky", function(request, response) {
    var post = request.body;
    var username = post.username;
    var password = post.password;
    var email = post.email;
    if (username != '' && password != '') {
        var sql = "INSERT INTO 'user'('ten_dang_nhap', 'email', 'psw') VALUES ('" + username + "','" + email + "'" + password + "')";
        var query = db.query(sql, function(err, result) {
            message = "Your account has been created succesfully.";
            response.render("dangky", { message: message });
        })
    } else {
        message = "Username and password is mandatory field.";
        response.render("dangky", { message: message });
    }
})

app.post("/dangnhap", function(request, response) {
    var post = request.body;
    var username = post.username;
    var password = post.password;

    var sql = "SELECT user_id, ten_dang_nhap, psw FROM 'user' WHERE 'ten_dang_nhap'='" + username + "' and psw = '" + password + "'";
    db.query(sql, function(err, results) {
        if (results.length) {
            request.session.userId = results[0].id;
            request.session.user = results[0];
            console.log(results[0].id);
            res.redirect("/trangchu");
        } else {
            message = 'You have entered invalid username or password.';
            res.render("/dangnhap", { message: message });
        }

    });
})