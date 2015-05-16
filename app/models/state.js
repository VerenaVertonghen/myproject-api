var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Category = require('./category.js');

var StateSchema   = new Schema({    
    text: {type: String, required:true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: false},
    created_at: {type: Date,required: false}
});

// on every save, add the date
StateSchema.pre('save', function(next) {
  // get the current date  
  currentDate = new Date();
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('State', StateSchema);