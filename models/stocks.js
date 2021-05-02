const mongoose =  require('mongoose');
const {Schema} = mongoose;

const reqString = {
    type: String, 
    require: true, 
}
const stockSchema = new Schema({
    companyName : reqString,
    symbol: reqString,

})

const stocks = mongoose.model('stocks',stockSchema);

module.exports =stocks;
