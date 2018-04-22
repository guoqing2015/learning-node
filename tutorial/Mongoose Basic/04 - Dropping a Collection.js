mongoose.connection.collections['users'].drop( function(err) {
    console.log('collection dropped');
});

// Warning :Make a backup before trying this in case anything goes wrong!
