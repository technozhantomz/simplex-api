import {
  mewSimplex,
  TIME_SWAP_VALID_DEFAULT,
  swapNotificationStatuses as notificationStatuses
} from '../partnersConfig';

const SimplexCurrencies = {
  fiat: {
    EUR: {
      symbol: 'EUR',
      name: 'Euro'
    },
    CAD: {
      symbol: 'CAD',
      name: 'Canadian Dollar'
    }
  },
  digital: {
    KES: {
      symbol: 'KES',
      name: 'Bitcoin'
    }
  }
};

const statuses = {
  new: 'new',
  initiated: 'INITIATED',
  declined: 'simplexcc_declined',
  pending: 'pending_simplexcc_approval',
  payment: 'pending_simplexcc_payment_to_partner',
  sent: 'SENT_TO_SIMPLEX',
  cancelled: 'cancelled'
};

const TIME_SWAP_VALID = TIME_SWAP_VALID_DEFAULT;
const MIN_FIAT = 50;
const MAX_FIAT = 20000;
const PROVIDER_NAME = 'simplex';
const BASE_CURRENCY = 'EUR'; // todo get upgraded plan to get EUR

const host = {
  url: process.env.SIMPLEX_API_HOST || mewSimplex
};

export {
  SimplexCurrencies,
  host,
  statuses,
  notificationStatuses,
  TIME_SWAP_VALID,
  MIN_FIAT,
  MAX_FIAT,
  BASE_CURRENCY,
  PROVIDER_NAME
};
