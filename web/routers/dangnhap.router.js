module.exports = function(router) {
    var dangnhap_controller = require('../controllers/dangnhap.controller');
    router.get("/dangnhap", dangnhap_controller.dangnhap);
}