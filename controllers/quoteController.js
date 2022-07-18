const {Quote} = require('../models')
require('dotenv').config()
const axios = require('axios').default;

class quoteController{
    static async fetch(req, res){
        const thirdPartyApi = process.env.LINKAPI
        axios.get(`${thirdPartyApi}`)
            .then(data => {
                const quote = data.data
                console.log(quote)
                Quote.findOne({where: quote})
                .then(d1 => {
                    if(d1) return res.status(400).json({msg: 'quote telah tersedia'})
                    Quote.upsert(quote)
                    res.status(201).json({msg: 'created', quote: quote.quote})
                })
                .catch(e1 => {
                    // console.log(e1)
                    res.status(400).json(e1)
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static async findAll(req, res){
        Quote.findAll()
        .then(data => {
            const allQuotes = data
            const separate = {'quotes': [], 'favorites': []}
            for(let i=0; i<allQuotes.length; i++) {
                allQuotes[i].favorites === false ? separate.quotes.push(allQuotes[i]) : separate.favorites.push(allQuotes[i])
            }
            res.status(200).json(separate)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static async create(req, res){
        const myQuote = {quote: req.body.quote, favorites: req.body.favorites || false}
        Quote.findOne({where: myQuote})
        .then(data => {
            if(data) return res.status(400).json({msg: 'quote telah tersedia'})
            Quote.upsert(myQuote)
            .then(d1 => {
                res.status(201).json({msg: 'created', quote: myQuote.quote})
            })
            .catch(e1 => {
                res.status(400).json(e1)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })

    }

    static async editQuote(req, res){
        const edit = {favorites: req.body.favorites}
        Quote.update(edit, {where: {id: req.params.id}})
        .then(data => {
            // console.log(data.data)
            res.status(200).json({msg: 'edited'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static async deleteQuote(req, res){
        Quote.destroy({where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({msg: 'deleted'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = quoteController