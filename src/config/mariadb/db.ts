const { z } = require('zod');
const mysql = require('mysql2/promise');

const dbConfig = z.object({
  host: z.string(),
  user: z.string(),
  password: z.string(),
  database: z.string(),
}).parse({
  host: 'localhost',
  user: 'root',
  password: 'favoriteWMAD',
  database: 'inviteazy',
});

async function connect() {
  const connection = await mysql.createConnection(dbConfig);
  console.log('Connected to MariaDB!');
  const [rows] = await connection.execute('SELECT VERSION()');
  console.log('MariaDB Version:', rows[0]['VERSION()']);
  await connection.end();
}

connect().catch(console.error);