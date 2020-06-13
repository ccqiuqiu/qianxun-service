/**
 * Created by 熊超超 on 2020/6/11.
 */

export default () => ({
  db: {
    type: process.env.db_type || 'mysql',
    host: process.env.db_host || 'localhost',
    port: process.env.db_port || 3306,
    username: process.env.db_username || 'root',
    password: process.env.db_password || 'cc',
    database: process.env.db_name || 'qianxun',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development'
  },
  jwt: {
    secret: 'secretKey',
    expiresIn: '20m',
  },
})
