import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOG_INFO } from './entity/log';
import { DBRedisModule } from 'src/database-redis/module';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { TERMBASE_INFO } from './entity/termbase';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DBRedisModule],
      useFactory: async (redisService: RedisService) => {
        const client = redisService.getClient();
        const config = JSON.parse(await client.get('EEVEE_TERMBASE_CONFIG_MYSQL'));

        return {
          type: 'mysql',
          ...config,
          entities: [LOG_INFO, TERMBASE_INFO],
        };
      },
      inject: [RedisService]
    })
  ],
})
export class DBMysqlModule {}