import createLogger from 'logging'
import uuidv4 from 'uuid/v4'
import {
    getOrder
} from '../simplex'
import Validator from '../validator'
import response from '../response'
import {
    simplex
} from '../config'
import {
    Order,
    getOrderById,
    findAndUpdate
} from '../mangodb'

const logger = createLogger('order.js')

let schema = {
    account_details: {
        app_end_user_id: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9-_]+$/,
            length: {
                min: 12,
                max: 64
            },
            message: "app_end_user_id required min:12 max:64"
        }
    },
    transaction_details: {
        payment_details: {
            fiat_total_amount: {
                currency: {
                    type: String,
                    required: true,
                    enum: simplex.validFiat,
                    message: "fiat currency required"
                },
                amount: {
                    type: Number,
                    required: true,
                    message: "fiat amount required and must be a number"
                }
            },
            requested_digital_amount: {
                currency: {
                    type: String,
                    required: true,
                    enum: simplex.validDigital,
                    message: "requested currency required"
                },
                amount: {
                    type: Number,
                    required: true,
                    message: "requested amount required and must be a number"
                }
            },
            destination_wallet: {
                currency: {
                    type: String,
                    required: true,
                    enum: simplex.validDigital,
                    message: "destination wallet currency required"
                },
                address: {
                    type: String,
                    required: true,
                    message: "destination address required and must be a number"
                }
            }
        }
    }
}
let validator = Validator(schema)
let validUserId = async(_userId) => {
    return new Promise((resolve, reject) => {

    })
}
export default (app) => {
    app.post('/order', async(req, res) => {
        let errors = validator.validate(req.body)
        if (errors.length) {
            logger.error(errors)
            response.error(res, errors.map(_err => _err.message))
        } else {
            let user_id = req.body.account_details.app_end_user_id
            getOrderById(user_id).then((savedOrder) => {
                let quote_id = savedOrder[0].quote_id
                let payment_id = uuidv4()
                let order_id = uuidv4()
                let reqObj = {
                    account_details: {
                        ...req.body.account_details,
                        app_provider_id: simplex.walletID,
                        app_version_id: simplex.apiVersion,
                        signup_login: {
                            ip: '141.145.165.137',
                            timestamp: new Date().toISOString()
                        }
                    },
                    transaction_details: {
                        payment_details: {
                            ...req.body.transaction_details.payment_details,
                            quote_id: quote_id,
                            payment_id: payment_id,
                            order_id: order_id,
                            original_http_ref_url: req.header('Referer')
                        }
                    }
                }
                findAndUpdate(user_id, {
                    payment_id: payment_id,
                    order_id: order_id,
                    status: simplex.status.sentToSimplex
                }).catch((err) => {
                    logger.error(err)
                })
                getOrder(reqObj).then((result) => {
                    if ("is_kyc_update_required" in result) {
                        response.success(res, {
                            payment_post_url: simplex.paymentEP,
                            version: simplex.apiVersion,
                            partner: simplex.walletID,
                            return_url: "https://www.myetherwallet.com",
                            quote_id: quote_id,
                            payment_id: payment_id,
                            user_id: user_id,
                            destination_wallet_address: reqObj.transaction_details.payment_details.destination_wallet.address,
                            destination_wallet_currency: reqObj.transaction_details.payment_details.destination_wallet.currency,
                            fiat_total_amount_amount: reqObj.transaction_details.payment_details.fiat_total_amount.amount,
                            fiat_total_amount_currency: reqObj.transaction_details.payment_details.fiat_total_amount.currency,
                            digital_total_amount_amount: reqObj.transaction_details.payment_details.requested_digital_amount.amount,
                            digital_total_amount_currency: reqObj.transaction_details.payment_details.requested_digital_amount.currency
                        })
                    } else {
                        logger.error(result)
                        response.error(res, result)
                    }
                }).catch((error) => {
                    logger.error(error)
                    response.error(res, error)
                })
            }).catch((err) => {
                logger.error(err)
                response.error(res, "Invalid user_id")
            })
        }
    })
}