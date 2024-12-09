'use strict';

/**
 * furniture service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::furniture.furniture');
