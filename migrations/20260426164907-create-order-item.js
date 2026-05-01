'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItem', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Order', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_at_order_time: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItem');
  }
};