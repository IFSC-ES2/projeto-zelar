import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  ...dbConfig,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});
