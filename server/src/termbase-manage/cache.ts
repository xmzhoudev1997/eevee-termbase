import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TERMBASE_INFO } from 'src/database-mysql/entity/termbase';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class TermbaseCacheService implements OnModuleInit {
  constructor(
    @InjectRepository(TERMBASE_INFO)
    private termbaseDb: Repository<TERMBASE_INFO>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async onModuleInit() {
    const list = await this.termbaseDb.find({
      where: {
        inuse: 1,
      },
      select: ['content', 'translationContent', 'locale']
    });
    for (const termase of list) {
      const obj = (await this.cacheManager.get(termase.content)) || {};
      obj[termase.locale] = termase.translationContent;
      await this.cacheManager.set(termase.content, obj);
    }
  }
}
