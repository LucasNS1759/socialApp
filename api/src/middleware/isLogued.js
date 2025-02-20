const isLogued = (req, res) => {
    if (req.isAuthenticated()) {

        return res.status(200).json({
            success: true,
            text: "you are already logged in ",
            type: "info",
            title: "authorized session"
        });
    } else {

        return res.status(401).json({
            success: false,
            text: "Your session has expired, log in again ",
            type: "error",
            title: "Unauthorized"
        });
    }
};

module.exports = isLogued;