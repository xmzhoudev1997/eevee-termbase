import { Inject, Injectable } from '@nestjs/common';
import { TERMBASE_SIMPLE } from './class';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class TermbaseViewService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) { }
  query = async (content: string, locale: string): Promise<TERMBASE_SIMPLE[]> => {
    const keyList = await this.cacheManager.store.keys();
    const list: TERMBASE_SIMPLE[] = [];
    for (const key of keyList) {
      if (content.toLowerCase().includes(key.toLowerCase())) {
        const obj = (await this.cacheManager.get(key)) || {};
        if (obj[locale]) {
          list.push({
            content: key,
            translateContent: obj[locale],
          })
        }
      }
    }
    return list;
  }
}
