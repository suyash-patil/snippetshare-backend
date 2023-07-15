const {Schema, default: mongoose} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    snippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],
    viewSnippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],
    editSnippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],

}, {
    timestamps: true,
});

userSchema.methods.matchPass = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password)
}

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;