import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { DBMysqlModule } from 'src/database-mysql/module';
import { TermbaseManageModule } from 'src/termbase-manage/module';
import * as path from 'path';
import { TermbaseViewModule } from 'src/termbase-view/module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'zh-CN',
      loaderOptions: {
        path: path.join('./' || __dirname, '/locales/'),
      },
      resolvers: [
        new QueryResolver(['locale']),
        new HeaderResolver(['locale']),
      ],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DBMysqlModule,
    TermbaseManageModule,
    TermbaseViewModule,
  ],
})
export class AppModule {}
