import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TermbaseManageService } from './service';
import { ID_DTO, ADD_DTO, TERMBASE_FULL, UPDATE_DTO } from './class';

@ApiTags('termbase管理')
@Controller('/manage')
@Controller()
export class TermbaseManageController {
  constructor(
    private readonly service: TermbaseManageService,
    ) {}

  @Get('/termbases')
  @ApiOperation({
    summary: '获取列表'
  })
  @ApiResponse({ type: [TERMBASE_FULL] })
  list() {
    return this.service.list();
  }
  @Post('/termbase')
  @ApiOperation({
    summary: '新增词条'
  })
  @ApiBody({ type: ADD_DTO })
  add(@Body() body: ADD_DTO) {
    return this.service.add(body, '-1');
  }
  @Put('/termbase/:id')
  @ApiOperation({
    summary: '修改词条'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  @ApiBody({ type: UPDATE_DTO })
  update(@Param() param: ID_DTO, @Body() body: UPDATE_DTO) {
    return this.service.update(param.id, body, '-1');
  }

  @Delete('/termbase/:id')
  @ApiOperation({
    summary: '删除词条'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  delete(@Param() param: ID_DTO) {
    return this.service.delete(param.id, '-1');
  }
  @Get('/termbase/:id/logs')
  @ApiOperation({
    summary: '查询变更日志'
  })
  @ApiParam({ name: 'id', type: Number, description: '记录id' })
  log(@Param() param: ID_DTO) {
    return this.service.log(param.id);
  }
  @Post('/refresh')
  @ApiOperation({
    summary: '刷新缓存'
  })
  refresh() {
    return this.service.reload();
  }
}
