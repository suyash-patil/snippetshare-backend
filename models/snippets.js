const {Schema, default: mongoose} = require('mongoose');


const snippetSchema = new Schema({
    title: String,
    snippet: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    shared: {
        type: Boolean,
        default: false,
    },
    canView: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    canEdit: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});

const SnippetModel = mongoose.model('Snippet', snippetSchema);
module.exports = SnippetModel;