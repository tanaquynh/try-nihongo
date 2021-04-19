exports.dangky = function(request, response) {
    const error = request.flash('error') || '';
    response.render("dangky", { error });
}