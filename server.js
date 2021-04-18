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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('hoa'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

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

app.get("/cackhoahoc/N5", function(request, response) {

    response.render("N5");
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

app.post('/dangky', validator, (request, response) => {
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