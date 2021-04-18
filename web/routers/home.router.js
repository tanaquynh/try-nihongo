module.exports = function(router) {
    var homeController = require('../controllers/home.controller');
    router.get("/", homeController.home);
}