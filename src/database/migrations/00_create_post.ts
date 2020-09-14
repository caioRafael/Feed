import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('posts', table =>{
        table.increments('id').primary();
        table.string('url_image').notNullable();
        table.string('subtitle').notNullable();
    });
}

export async function down(knex: knex){
    return knex.schema.dropTable('client');
}