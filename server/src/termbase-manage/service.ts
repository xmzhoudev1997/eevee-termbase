import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LOG_INFO, LOG_TYPE } from '../database-mysql/entity/log';
import { TERMBASE_INFO } from 'src/database-mysql/entity/termbase';
import { ADD_DTO, LOG_FULL, TERMBASE_FULL, UPDATE_DTO } from './class';
import { I18nService } from 'nestjs-i18n';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as dayjs from 'dayjs';
import { TermbaseCacheService } from './cache';
import { MicroUserService } from 'src/micro-base/user';

@Injectable()
export class TermbaseManageService {
  constructor(
    @InjectRepository(LOG_INFO)
    private logDb: Repository<LOG_INFO>,
    @InjectRepository(TERMBASE_INFO)
    private termbaseDb: Repository<TERMBASE_INFO>,
    private i18nService: I18nService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly termbaseCacheService: TermbaseCacheService,
    private readonly microUserService: MicroUserService,
  ) { }
  list = async (): Promise<TERMBASE_FULL[]> => {
    const list = await this.termbaseDb.find({
      where: {
        inuse: 1
      },
      order: {
        updateTime: 'desc'
      }
    });
    return list as any;
  }
  add = async (obj: ADD_DTO, userId: string): Promise<void> => {
    obj.content = obj.content?.trim() || '';
    obj.translationContent = obj.translationContent?.trim() || '';
    obj.locale = obj.locale?.trim() || '';
    if (!obj.content) {
      throw this.i18nService.translate('内容不能为空');
    }
    if (!obj.locale) {
      throw this.i18nService.translate('语种不能为空');
    }
    const repeat = await this.termbaseDb.exists({
      where: {
        inuse: 1,
        content: obj.content,
        locale: obj.locale,
      },
    });
    if (repeat) {
      throw this.i18nService.translate('数据已存在');
    }
    const [id, logId] = await this.microUserService.getIds(2);
    const addObj = {
      id,
      ...obj,
      createUser: userId,
      crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
      updateUser: userId,
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
      inuse: 1,
    };

    await this.entityManager.transaction(async manager => {
      await Promise.all([
        manager.insert(TERMBASE_INFO, addObj),
        manager.insert(LOG_INFO, {
          id: logId,
          termbaseId: id,
          oldContent: '',
          newContent: JSON.stringify(addObj),
          type: LOG_TYPE.新增,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
        async () => {
          const d = (await this.cacheManager.get(obj.content) || {});
          d[obj.locale] = obj.translationContent;
          await this.cacheManager.set(obj.content, d, 0);
        }
      ])
    });
  }
  update = async (id: string, obj: UPDATE_DTO, userId: string): Promise<void> => {
    obj.translationContent = obj.translationContent?.trim() || '';
    const termbase = await this.termbaseDb.findOne({
      where: {
        inuse: 1,
        id,
      },
    });
    if (!termbase) {
      throw this.i18nService.translate('数据不存在');
    }
    const [logId] = await this.microUserService.getIds(2);

    await this.entityManager.transaction(async manager => {
      await Promise.all([
        manager.update(TERMBASE_INFO, id, {
          translationContent: obj.translationContent,
          updateUser: userId,
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
        manager.insert(LOG_INFO, {
          id: logId,
          termbaseId: id,
          oldContent: termbase.translationContent,
          newContent: obj.translationContent,
          type: LOG_TYPE.修改内容,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
        async () => {
          const d = (await this.cacheManager.get(termbase.content) || {});
          d[termbase.locale] = obj.translationContent;
          await this.cacheManager.set(termbase.content, d, 0);
        }
      ])
    });
  }
  delete = async (id: string, userId: string): Promise<void> => {
    const termbase = await this.termbaseDb.findOne({
      where: {
        inuse: 1,
        id,
      },
    });
    if (!termbase) {
      throw this.i18nService.translate('数据不存在');
    }
    const [logId] = await this.microUserService.getIds(2);

    await this.entityManager.transaction(async manager => {
      await Promise.all([
        manager.update(TERMBASE_INFO, id, {
          updateUser: userId,
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
          inuse: 0,
        }),
        manager.create(LOG_INFO, {
          id: logId,
          termbaseId: id,
          oldContent: '',
          newContent: '',
          type: LOG_TYPE.删除,
          createUser: userId,
          crateTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }),
        this.cacheManager.del(termbase.content),
      ])
    });
  }
  log = async (id: string): Promise<LOG_FULL[]> => {
    const list = await this.logDb.find({
      where: {
        termbaseId: id,
      },
      order: {
        crateTime: 'desc',
      }
    });
    return list as any;
  }

  reload = async (): Promise<void> => {
    await this.termbaseCacheService.onModuleInit();
  }
}
