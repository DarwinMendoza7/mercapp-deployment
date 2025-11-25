//Mostrar página del chat
exports.chatPage = (req, res) => {
    res.render('chat/index', {
        title: 'Chat en Tiempo Real',
        username: req.session.user.username
    });
};