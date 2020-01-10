user.save().then(function() {
    UserModal.findOne({_id: user._id}).then(function(res) {
        res._id.toString() === user._id.toString() //true
        // console.log(res._id.toString())
    })
});
