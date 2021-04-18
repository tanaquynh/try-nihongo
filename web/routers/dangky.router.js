module.exports = function(router) {
    var dangky_controller = require('../controllers/dangky.controller');
    router.get("/dangky", dangky_controller.dangky);
}